/**
 * Motor de ditado em português (Web Speech API) — fluxo REAL de voz.
 *
 * Singleton de módulo: o reconhecimento sobrevive à navegação entre
 * telas (home → ouvindo → avatar), mantendo a sessão de voz contínua.
 *
 * Honestidade (§16):
 *  - nada aqui simula transcrição: o texto vem do reconhecimento do navegador;
 *  - sem suporte ou sem permissão → estado de erro honesto e a UI oferece
 *    o caminho de texto como alternativa.
 */

const SR =
  typeof window !== "undefined"
    ? window.SpeechRecognition || window.webkitSpeechRecognition
    : undefined;

/** null = erro silencioso (natural do fluxo: silêncio, cancelamento). */
const ERROR_MESSAGES = {
  "not-allowed": "Permissão de microfone negada. Libere o microfone no navegador.",
  "service-not-allowed": "O navegador bloqueou o ditado. Use o teclado para continuar.",
  "audio-capture": "Nenhum microfone encontrado. Use o teclado para continuar.",
  network: "Falha de rede no ditado (o Chrome usa servidores do Google).",
  "language-not-supported": "Idioma de ditado não suportado neste navegador.",
  "no-speech": null,
  aborted: null,
};

/** Erros que encerram a intenção de ouvir (evita laço de reinício). */
const FATAL_ERRORS = new Set([
  "not-allowed",
  "service-not-allowed",
  "audio-capture",
  "language-not-supported",
]);

let recognition = null;
let shouldListen = false;
let paused = false;

const listeners = new Set();

let snapshot = {
  supported: Boolean(SR),
  listening: false,
  paused: false,
  /** true quando o app encerre a escuta (botão) — distingue de "iniciando". */
  stopped: false,
  interim: "",
  finalText: "",
  error: null,
  /** Fase do ciclo de captura: null → "audio" → "som" → "fala". */
  phase: null,
};

const emit = (patch) => {
  snapshot = { ...snapshot, ...patch };
  listeners.forEach((fn) => fn());
};

const createRecognition = () => {
  const rec = new SR();
  rec.lang = "pt-BR";
  rec.continuous = true;
  rec.interimResults = true;
  rec.maxAlternatives = 1;

  rec.onstart = () => emit({ listening: true, error: null, phase: null });

  // Diagnóstico honesto do ciclo de captura: mostra em que pé está a voz
  // (microfone ativo → som detectado → fala detectada → transcrição).
  rec.onaudiostart = () => emit({ phase: "audio" });
  rec.onsoundstart = () => emit({ phase: "som" });
  rec.onspeechstart = () => emit({ phase: "fala" });

  rec.onresult = (event) => {
    let interim = "";
    for (let i = event.resultIndex; i < event.results.length; i += 1) {
      const result = event.results[i];
      const piece = (result[0]?.transcript ?? "").trim();
      if (!piece) continue;
      if (result.isFinal) {
        emit({
          finalText: snapshot.finalText ? `${snapshot.finalText} ${piece}` : piece,
        });
      } else {
        interim += `${interim ? " " : ""}${piece}`;
      }
    }
    emit({ interim });
  };

  rec.onerror = (event) => {
    const code = event.error || "unknown";
    const message = Object.prototype.hasOwnProperty.call(ERROR_MESSAGES, code)
      ? ERROR_MESSAGES[code]
      : `Erro no ditado (${code}).`;
    if (FATAL_ERRORS.has(code)) shouldListen = false;
    emit({
      listening: false,
      phase: null,
      error: message ?? snapshot.error,
      supported: code === "language-not-supported" ? false : snapshot.supported,
    });
  };

  rec.onend = () => {
    // O Chrome encerra sessões sozinhas (silêncio/limite de tempo):
    // se o app ainda quer ouvir e não está pausado, reativa.
    if (shouldListen && !paused) {
      try {
        rec.start();
      } catch {
        emit({ listening: false, phase: null });
      }
      return;
    }
    emit({ listening: false, phase: null });
  };

  return rec;
};

export const speechEngine = {
  subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
  getSnapshot() {
    return snapshot;
  },
  /** Inicia/reinicia o ditado. `keepText` preserva a transcrição (pause/resume). */
  start({ keepText = false } = {}) {
    if (!SR) {
      emit({
        supported: false,
        error: "Este navegador não suporta ditado por voz.",
      });
      return;
    }
    shouldListen = true;
    paused = false;
    emit({
      paused: false,
      stopped: false,
      error: null,
      ...(keepText ? {} : { finalText: "", interim: "" }),
    });
    if (!recognition) recognition = createRecognition();
    try {
      recognition.start();
    } catch {
      // Já em andamento — onstart/onend cuidam do estado.
    }
  },
  /** Encerra a sessão (concluir/sair da tela). */
  stop() {
    shouldListen = false;
    paused = false;
    try {
      recognition?.abort();
    } catch {
      /* não iniciado */
    }
    emit({ listening: false, paused: false, stopped: true, interim: "" });
  },
  /** Pausa mantendo o que já foi transcrito. */
  pause() {
    if (!recognition) return;
    shouldListen = false;
    paused = true;
    try {
      recognition.stop();
    } catch {
      /* já parado */
    }
    emit({ paused: true, listening: false, interim: "" });
  },
  resume() {
    speechEngine.start({ keepText: true });
  },
  clear() {
    emit({ finalText: "", interim: "", error: null });
  },
  /**
   * Somente DEV: insere uma frase finalizada sem áudio — usado por mim
   * para testar a fila/tempo-real quando não há microfone físico.
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
