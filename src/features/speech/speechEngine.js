/**
 * Motor de voz do app: gravação local (MediaRecorder) + transcrição no
 * backend (Gemini) — POST /api/transcribe.
 *
 * Por que NÃO a Web Speech API do navegador: no Android o getUserMedia
 * disputa o microfone com o reconhecimento (bug Chromium #41083534), o
 * Chrome desktop tem bug de erro `network` e o Firefox não suporta —
 * a transcrição nunca era confiável entre navegadores.
 *
 * Fluxo: gravar → cortar na pausa natural → converter em WAV16k → o
 * backend transcreve em prosa pt-BR → a frase entra na fila do avatar.
 *
 * Honestidade (§16):
 *  - nada é simulado: o texto vem do Gemini transcrevendo o áudio gravado;
 *  - sem microfone/permissão/rede → estado de erro honesto e a UI oferece
 *    o caminho de texto como alternativa.
 */

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const TEM_MIC =
  typeof navigator !== "undefined" &&
  Boolean(navigator.mediaDevices?.getUserMedia) &&
  typeof window !== "undefined" &&
  typeof window.MediaRecorder !== "undefined";

/** Mensagens honestas de erro de captura. */
const ERROS_MIC = {
  NotAllowedError: "Permissão de microfone negada. Libere o microfone no navegador.",
  NotFoundError: "Nenhum microfone encontrado. Use o teclado para continuar.",
  NotReadableError: "O microfone está em uso por outro aplicativo.",
};

// Cortes da gravação (ms) e limiar de amplitude.
const SILENCIO_MS = 1500; // para após 1,5s sem som (pausa natural)
const MINIMO_MS = 700; // ignora toques muito curtos
const MAXIMO_MS = 30_000; // corte duro de uma janela
const SEM_MEDIDOR_MS = 5000; // janela fixa quando não há leitura de nível
const LIMIAR = 0.06; // amplitude mínima para contar como fala

const MIMES = [
  "audio/webm;codecs=opus",
  "audio/webm",
  "audio/mp4",
  "audio/ogg;codecs=opus",
];

let stream = null;
let audioCtx = null;
let analyser = null;
let niveis = null;
let rec = null;
let chunks = [];
let raf = 0;
let maxTimer = 0;
let armando = false;
let emGravacao = false;
let transcrevendo = false;
let semMedidor = false;
let shouldListen = false;
let paused = false;
let comSom = false;
let inicioGravacao = 0;
let ultimoSom = 0;
let ultimoNivelEmit = 0;

const listeners = new Set();

let snapshot = {
  supported: TEM_MIC,
  listening: false,
  transcribing: false,
  paused: false,
  stopped: false,
  finalText: "",
  error: null,
  /** Amplitude REAL do microfone (0..1) — medidor e corte por pausa. */
  level: 0,
  /** Fase do ciclo: "gravando" → "transcrevendo" → null. */
  phase: null,
};

const emit = (patch) => {
  snapshot = { ...snapshot, ...patch };
  listeners.forEach((fn) => fn());
};

// ---------------------------------------------------------------------------
// Conversão de áudio — WAV 16 kHz mono (formato aceito pelo Gemini em todo OS)
// ---------------------------------------------------------------------------

function wavBlob(samples, sampleRate) {
  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);
  const writeStr = (off, s) => {
    for (let i = 0; i < s.length; i += 1) view.setUint8(off + i, s.charCodeAt(i));
  };
  writeStr(0, "RIFF");
  view.setUint32(4, 36 + samples.length * 2, true);
  writeStr(8, "WAVE");
  writeStr(12, "fmt ");
  view.setUint32(16, 16, true); // PCM
  view.setUint16(20, 1, true); // PCM
  view.setUint16(22, 1, true); // canais (1 = mono — sem isso o WAV é inválido)
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true); // byte rate
  view.setUint16(32, 2, true); // block align
  view.setUint16(34, 16, true); // bits per sample
  writeStr(36, "data");
  view.setUint32(40, samples.length * 2, true);
  let off = 44;
  for (let i = 0; i < samples.length; i += 1, off += 2) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(off, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }
  return new Blob([buffer], { type: "audio/wav" });
}

async function paraWav16k(blob) {
  const Ctx = window.AudioContext || window.webkitAudioContext;
  const ctx = new Ctx();
  let decoded;
  try {
    decoded = await ctx.decodeAudioData(await blob.arrayBuffer());
  } finally {
    try {
      await ctx.close();
    } catch {
      /* já fechado */
    }
  }
  const SR = 16000;
  const length = Math.max(1, Math.ceil(decoded.duration * SR));
  const OCtx = window.OfflineAudioContext || window.webkitOfflineAudioContext;
  const offline = new OCtx(1, length, SR);
  const src = offline.createBufferSource();
  src.buffer = decoded;
  src.connect(offline.destination);
  src.start(0);
  const render = await offline.startRendering();
  return wavBlob(render.getChannelData(0), SR);
}

async function paraBase64(blob) {
  const bytes = new Uint8Array(await blob.arrayBuffer());
  let bin = "";
  const PASSO = 0x8000;
  for (let i = 0; i < bytes.length; i += PASSO) {
    bin += String.fromCharCode(...bytes.subarray(i, i + PASSO));
  }
  return btoa(bin);
}

// ---------------------------------------------------------------------------
// Gravação com corte por pausa natural
// ---------------------------------------------------------------------------

const tick = (t) => {
  if (!emGravacao || !analyser || !niveis) return;
  analyser.getByteTimeDomainData(niveis);
  let sum = 0;
  for (let i = 0; i < niveis.length; i += 1) {
    const v = (niveis[i] - 128) / 128;
    sum += v * v;
  }
  const rms = Math.sqrt(sum / niveis.length);
  const level = Math.min(1, rms * 4);
  if (t - ultimoNivelEmit > 66) {
    ultimoNivelEmit = t;
    emit({ level });
  }
  if (level >= LIMIAR) {
    comSom = true;
    ultimoSom = t;
  } else if (
    comSom &&
    t - ultimoSom > SILENCIO_MS &&
    t - inicioGravacao > MINIMO_MS
  ) {
    pararGravacao();
    return;
  }
  raf = requestAnimationFrame(() => tick(performance.now()));
};

async function armar() {
  if (!TEM_MIC || armando || emGravacao || transcrevendo) return;
  armando = true;
  try {
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
      });
    } catch (err) {
      shouldListen = false;
      emit({
        listening: false,
        stopped: true,
        phase: null,
        error: ERROS_MIC[err?.name] || "Não foi possível acessar o microfone.",
      });
      return;
    }

    // stop/pause acionado enquanto o navegador pedia permissão.
    if (!shouldListen || paused) {
      stream?.getTracks().forEach((t) => t.stop());
      stream = null;
      emit({
        listening: false,
        phase: null,
        level: 0,
        ...(paused ? { paused: true } : { stopped: true }),
      });
      return;
    }

    semMedidor = false;
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === "suspended") {
        // iOS/Chrome: resume() fora de um gesto pode ficar pendurado.
        await Promise.race([
          audioCtx.resume().catch(() => {}),
          new Promise((r) => setTimeout(r, 300)),
        ]);
      }
      if (audioCtx.state !== "running") semMedidor = true;
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 512;
      niveis = new Uint8Array(analyser.fftSize);
      audioCtx.createMediaStreamSource(stream).connect(analyser);
    } catch {
      semMedidor = true;
    }

    const mime = MIMES.find((m) => window.MediaRecorder.isTypeSupported?.(m));
    try {
      rec = mime ? new MediaRecorder(stream, { mimeType: mime }) : new MediaRecorder(stream);
    } catch {
      rec = new MediaRecorder(stream);
    }
    chunks = [];
    rec.ondataavailable = (e) => {
      if (e.data && e.data.size) chunks.push(e.data);
    };
    rec.onstop = () => {
      aoParar().catch(() => {
        shouldListen = false;
        emit({
          listening: false,
          transcribing: false,
          stopped: true,
          phase: null,
          error: "Falha ao finalizar a gravação. Toque para tentar de novo.",
        });
      });
    };

    comSom = false;
    inicioGravacao = performance.now();
    ultimoSom = inicioGravacao;
    ultimoNivelEmit = 0;
    emGravacao = true;
    rec.start(500);
    maxTimer = setTimeout(pararGravacao, semMedidor ? SEM_MEDIDOR_MS : MAXIMO_MS);
    raf = requestAnimationFrame(() => tick(performance.now()));
    emit({ listening: true, phase: "gravando", error: null, stopped: false });
  } catch {
    shouldListen = false;
    emit({
      listening: false,
      stopped: true,
      phase: null,
      error: "Falha ao iniciar a gravação do microfone.",
    });
  } finally {
    armando = false;
  }
}

function pararGravacao() {
  if (!emGravacao || !rec) return;
  try {
    rec.stop();
  } catch {
    /* já parado */
  }
}

async function aoParar() {
  if (emGravacao) emGravacao = false;
  else return;
  clearTimeout(maxTimer);
  maxTimer = 0;
  cancelAnimationFrame(raf);
  raf = 0;

  const dur = performance.now() - inicioGravacao;
  let blob = null;
  try {
    blob = new Blob(chunks, { type: rec?.mimeType || chunks[0]?.type || "audio/webm" });
  } catch {
    blob = null;
  }
  chunks = [];

  // Libera o microfone — um por vez, antes do próximo ciclo.
  stream?.getTracks().forEach((t) => t.stop());
  stream = null;
  try {
    await audioCtx?.close();
  } catch {
    /* já fechado */
  }
  audioCtx = null;
  analyser = null;
  niveis = null;
  emit({ listening: false, level: 0 });

  if (paused) {
    emit({ paused: true, phase: null });
    return;
  }
  if (!shouldListen) {
    emit({ stopped: true, phase: null });
    return;
  }

  const capturou = blob && blob.size > 0 && dur >= MINIMO_MS && (comSom || semMedidor);
  if (!capturou) {
    // Janela sem fala → regrava sem gastar cota da API.
    armar();
    return;
  }
  await transcrever(blob, dur);
}

async function transcrever(blob, dur) {
  transcrevendo = true;
  emit({ transcribing: true, phase: "transcrevendo" });
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 45_000);
  try {
    let audioBase64;
    let mimeType = blob.type || "audio/webm";
    try {
      const wav = await paraWav16k(blob);
      audioBase64 = await paraBase64(wav);
      mimeType = "audio/wav";
    } catch {
      audioBase64 = await paraBase64(blob); // fallback: formato original
    }

    const res = await fetch(`${API_URL}/api/transcribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        audioBase64,
        mimeType,
        durationMs: Math.max(1, Math.round(dur)),
      }),
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const texto = String(data?.text ?? "").trim();
    if (texto) {
      emit({ finalText: snapshot.finalText ? `${snapshot.finalText} ${texto}` : texto });
    }
    transcrevendo = false;
    emit({ transcribing: false, phase: null });
    if (shouldListen && !paused) armar();
  } catch {
    transcrevendo = false;
    shouldListen = false;
    emit({
      transcribing: false,
      listening: false,
      stopped: true,
      phase: null,
      error: "Falha ao transcrever a fala. Verifique a conexão e toque para tentar de novo.",
    });
  } finally {
    clearTimeout(timer);
  }
}

export const speechEngine = {
  subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
  getSnapshot() {
    return snapshot;
  },
  /** Inicia/reinicia a captura. `keepText` preserva o que já foi transcrito. */
  start({ keepText = false } = {}) {
    if (!TEM_MIC) {
      emit({
        supported: false,
        error: "Este navegador não permite gravação de áudio. Digite a frase em vez disso.",
      });
      return;
    }
    shouldListen = true;
    paused = false;
    emit({
      paused: false,
      stopped: false,
      error: null,
      ...(keepText ? {} : { finalText: "" }),
    });
    // Ciclo já ativo (ex.: gesto na home + efeito ao montar a tela).
    if (armando || emGravacao || transcrevendo) return;
    armar();
  },
  /** Encerra a sessão (botão/sair da tela). */
  stop() {
    shouldListen = false;
    paused = false;
    if (emGravacao) {
      pararGravacao(); // aoParar emite `stopped`
      return;
    }
    emit({ listening: false, stopped: true, phase: null, level: 0 });
  },
  /** Pausa mantendo o que já foi transcrito. */
  pause() {
    shouldListen = false;
    paused = true;
    if (emGravacao) {
      pararGravacao(); // aoParar emite `paused`
      return;
    }
    emit({ paused: true, listening: false, phase: null, level: 0 });
  },
  resume() {
    speechEngine.start({ keepText: true });
  },
  clear() {
    emit({ finalText: "", error: null });
  },
  /**
   * Somente DEV: insere uma frase finalizada sem áudio — usado por mim
   * para testar a fila quando não há microfone físico.
   * Não existe em produção (import.meta.env.DEV).
   */
  __testFinal(text) {
    if (!import.meta.env.DEV) return;
    emit({
      finalText: snapshot.finalText ? `${snapshot.finalText} ${text}` : text,
    });
  },
};

if (import.meta.env.DEV) {
  // Depuração nos testes (leitura de estado no console do navegador).
  window.__speech = speechEngine;
}
