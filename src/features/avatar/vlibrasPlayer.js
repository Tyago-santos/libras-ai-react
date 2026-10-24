/**
 * Cliente do player oficial VLibras (Unity WebGL) — LGPL-3.0.
 * Fonte: github.com/spbgovbr-vlibras/vlibras-web-browsers (branch dev)
 *
 * O player roda isolado em um iframe (/vlibras-unity/index.html) e conversa
 * com a página via postMessage, exatamente como o widget oficial do gov.br.
 *
 * Fluxo (tudo público, sem token):
 *   1. translateToGloss(texto PT) → POST traducao2.vlibras.gov.br/translate → glosa
 *   2. playerApi.play(gloss)      → Unity baixa cada bundle em dicionario2…/WEBGL/{SIGNO}
 *   3. eventos (unity_event)      → on_load_player / counter_gloss / on_playing_state_change
 */

export const VLIBRAS_URLS = {
  /** Base dos AssetBundles de animação (definida no player via setBaseUrl) */
  DICTIONARY_URL: "https://dicionario2.vlibras.gov.br/2018.3.1/WEBGL/",
  /** Tradução PT → glosa oficial (produção) */
  TRANSLATE_URL: "https://traducao2.vlibras.gov.br/translate",
  /** Tradução PT → glosa oficial (ambiente de testes/dth — mesmo do widget oficial) */
  TRANSLATE_URL_DEV: "https://traducao2-dth.vlibras.gov.br/translate",
};

/** Endereços de tradução na ordem de preferência (prod → dev), como no widget oficial. */
const TRANSLATE_ENDPOINTS = [
  "https://traducao2.vlibras.gov.br/translate",
  "https://traducao2-dth.vlibras.gov.br/translate",
];

/** Última linha: nosso backend (oficial → fallback IA Gemini) — fonte vem marcada. */
const BACKEND_TRANSLATE_URL = `${
  import.meta.env.VITE_API_URL || "http://localhost:3000"
}/api/translations/live`;

const UNITY_OBJECTS = {
  PLAYER: "PlayerManager",
};

const UNITY_METHODS = {
  PLAY: "playNow",
  STOP: "stopAll",
  REPEAT: "repeat",
  SET_BASE_URL: "setBaseUrl",
  SET_SPEED: "setSlider",
};

/** Envia um comando ao Unity dentro do iframe do player. */
export function sendToPlayer(iframe, object, method, params) {
  iframe?.contentWindow?.postMessage({ type: "unity", object, method, params }, "*");
}

/** API de alto nível para controlar o avatar. */
export const playerApi = {
  play: (iframe, gloss) =>
    sendToPlayer(iframe, UNITY_OBJECTS.PLAYER, UNITY_METHODS.PLAY, gloss),
  repeat: (iframe) =>
    sendToPlayer(iframe, UNITY_OBJECTS.PLAYER, UNITY_METHODS.REPEAT),
  stop: (iframe) =>
    sendToPlayer(iframe, UNITY_OBJECTS.PLAYER, UNITY_METHODS.STOP),
  setBaseUrl: (iframe, url = VLIBRAS_URLS.DICTIONARY_URL) =>
    sendToPlayer(iframe, UNITY_OBJECTS.PLAYER, UNITY_METHODS.SET_BASE_URL, url),
  setSpeed: (iframe, speed) =>
    sendToPlayer(iframe, UNITY_OBJECTS.PLAYER, UNITY_METHODS.SET_SPEED, String(speed)),
};

/** True se o navegador suporta WebGL (pré-requisito do player). */
export function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

/** Erro de tradução retriable (instabilidade do serviço VLibras). */
class RetriableTranslateError extends Error {}

async function fetchTranslate(text, endpoint) {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  // 5xx/503: o "Translation Core" do VLibras oscila — tentar o próximo endereço/retry.
  if (res.status >= 500) {
    throw new RetriableTranslateError(`Tradução indisponível (HTTP ${res.status})`);
  }
  if (!res.ok) {
    throw new Error(`Tradução recusada (HTTP ${res.status})`);
  }

  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    const data = await res.json();
    return (data.traducao || data.translation || "").trim();
  }

  return (await res.text()).trim();
}

/**
 * Traduz texto em português para glosa VLibras (API oficial pública).
 * A glosa NÃO é tradução perfeita — é o resultado do VLibras (spec §16).
 * Cadeia: oficial prod → oficial dev → backend (oficial → IA Gemini).
 * Retorna { gloss, source } — source="llm" sinaliza glosa gerada por IA.
 */
export async function translateToGloss(text, { attempts = 3 } = {}) {
  try {
    const gloss = await officialTranslate(text, attempts);
    return { gloss, source: "vlibras" };
  } catch (officialError) {
    try {
      return await backendTranslate(text);
    } catch {
      // Backend fora → o erro real da oficial é o mais informativo.
      throw officialError;
    }
  }
}

/** Tradução oficial direta (prod → dev) com retry/backoff. */
async function officialTranslate(text, attempts) {
  let lastError = null;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    let hardError = null;
    for (const endpoint of TRANSLATE_ENDPOINTS) {
      try {
        return await fetchTranslate(text, endpoint);
      } catch (err) {
        lastError = err;
        if (!(err instanceof RetriableTranslateError)) {
          hardError = err; // recusa 4xx — tenta o próximo endereço antes de desistir
        }
      }
    }
    if (hardError) throw hardError;
    if (attempt < attempts) {
      // Backoff progressivo: 1s, 2s…
      await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
    }
  }
  throw lastError || new Error("Tradução indisponível");
}

/** Nosso backend: oficial com fallback para IA + validação no dicionário. */
async function backendTranslate(text) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12_000);
  try {
    const res = await fetch(BACKEND_TRANSLATE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`Tradutor do app respondeu ${res.status}`);
    const data = await res.json();
    if (!data?.gloss) throw new Error("Tradutor do app sem glosa");
    return { gloss: String(data.gloss).trim(), source: data.source === "vlibras" ? "vlibras" : "llm" };
  } finally {
    clearTimeout(timer);
  }
}
