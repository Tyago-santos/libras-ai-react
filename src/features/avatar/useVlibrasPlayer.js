import { useCallback, useEffect, useRef, useState } from "react";
import { hasWebGL, playerApi, translateToGloss } from "./vlibrasPlayer";

/**
 * Hook React que controla o player VLibras (iframe Unity WebGL).
 *
 * status: "sem-webgl" | "carregando" | "pronto" | "traduzindo" |
 *         "sinalizando" | "erro"
 *
 * Uso:
 *   const player = useVlibrasPlayer();
 *   <iframe ref={player.iframeRef} src="/vlibras-unity/index.html" … />
 *   player.sign("Bom dia, tudo bem?")  // traduz + sinaliza
 */
export function useVlibrasPlayer() {
  const iframeRef = useRef(null);
  const glossRef = useRef("");

  const [status, setStatus] = useState(() =>
    hasWebGL() ? "carregando" : "sem-webgl"
  );
  const [loaded, setLoaded] = useState(false); // Unity terminou de carregar
  const [loadProgress, setLoadProgress] = useState(0); // 0..100 (carga Unity)
  const [glossCount, setGlossCount] = useState({ current: 0, total: 0 });
  const [glossSource, setGlossSource] = useState(null); // "vlibras" | "llm"
  const [error, setError] = useState(null);
  const errorRef = useRef(null);

  // Escuta os eventos vindos do iframe (postMessage {type:"unity_event"}).
  useEffect(() => {
    if (!hasWebGL()) return undefined;

    const handleMessage = (event) => {
      if (event.source !== iframeRef.current?.contentWindow) return;
      const msg = event.data;
      if (msg?.type !== "unity_event") return;

      switch (msg.event) {
        case "on_load_player":
          // Player pronto → define a base oficial dos bundles e traduz a frase demo.
          playerApi.setBaseUrl(iframeRef.current);
          setLoaded(true);
          setStatus("pronto");
          break;

        case "update_progress": {
          const p = Number(msg.data);
          if (!Number.isNaN(p)) setLoadProgress(Math.round(p * 100));
          break;
        }

        case "counter_gloss": {
          const [count, max] = msg.data || [];
          setGlossCount({ current: count ?? 0, total: max ?? 0 });
          break;
        }

        case "on_playing_state_change": {
          // Formato oficial: [isPlaying, isPaused, isPlayingIntervalAnimation, isLoading, isRepeatable]
          const [isPlaying, isPaused, , isLoading] = (msg.data || []).map((s) => s === "True");
          setStatus((prev) => {
            if (prev === "traduzindo") return prev;
            if (isPlaying && !isPaused) return "sinalizando";
            if (prev === "sinalizando") {
              // Ainda carregando/rodando (bundles) → mantém "sinalizando".
              if (isLoading || isPlaying) return prev;
              // Parou de verdade → volta ao erro pendente ou a "pronto".
              return errorRef.current ? "erro" : "pronto";
            }
            return prev;
          });
          break;
        }

        case "on_error":
          errorRef.current = "Player 3D indisponível neste navegador";
          setError(errorRef.current);
          setStatus("erro");
          break;

        default:
          break;
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  /** Traduz o texto para glosa e manda o player sinalizar. */
  const sign = useCallback(async (text) => {
    if (!hasWebGL() || !iframeRef.current) return;
    setStatus("traduzindo");
    errorRef.current = null;
    setError(null);
    try {
      const { gloss, source } = await translateToGloss(text);
      if (!gloss) {
        errorRef.current = "Sem glosa disponível para este texto";
        setError(errorRef.current);
        setStatus("erro");
        return;
      }
      glossRef.current = gloss;
      setGlossSource(source);
      playerApi.play(iframeRef.current, gloss);
      setStatus("sinalizando");
    } catch (err) {
      errorRef.current = err.message || "Falha ao traduzir";
      setError(errorRef.current);
      setStatus("erro");
    }
  }, []);

  /** Reproduz novamente a última glosa (sem traduzir de novo). */
  const replay = useCallback(() => {
    if (!glossRef.current || !iframeRef.current) return;
    errorRef.current = null;
    setError(null);
    playerApi.play(iframeRef.current, glossRef.current);
    setStatus("sinalizando");
  }, []);

  /** Para a sinalização atual. */
  const stop = useCallback(() => {
    if (!iframeRef.current) return;
    playerApi.stop(iframeRef.current);
    setStatus("pronto");
  }, []);

  /** Ajusta a velocidade da sinalização (1, 0.75, 1.25…). */
  const setSpeed = useCallback((speed) => {
    if (!iframeRef.current) return;
    playerApi.setSpeed(iframeRef.current, speed);
  }, []);

  return {
    iframeRef,
    status,
    loaded,
    loadProgress,
    gloss: glossRef.current,
    glossSource,
    glossCount,
    error,
    sign,
    replay,
    stop,
    setSpeed,
  };
}
