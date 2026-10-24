import { useEffect, useState } from "react";

/**
 * Nível REAL de captação do microfone (0..1) via Web Audio API.
 *
 * Alimenta o medidor da tela de escuta — sem simulação: quando não há
 * sinal (silêncio) ou sem permissão, o nível fica em zero e as barras
 * ficam paradas.
 *
 * `active` deve ser verdadeiro apenas enquanto a escuta estiver ativa;
 * o stream de áudio é liberado ao desativar ou desmontar.
 */
export function useMicLevel(active) {
  const [level, setLevel] = useState(0);

  useEffect(() => {
    if (!active) {
      setLevel(0);
      return undefined;
    }
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!navigator.mediaDevices?.getUserMedia || !Ctx) {
      return undefined; // sem suporte → zero honesto
    }

    let disposed = false;
    let raf = 0;
    let stream = null;
    let ctx = null;
    let lastEmit = 0;

    const tick = (analyser, data, t) => {
      if (disposed) return;
      analyser.getByteTimeDomainData(data);
      let sum = 0;
      for (let i = 0; i < data.length; i += 1) {
        const v = (data[i] - 128) / 128;
        sum += v * v;
      }
      const rms = Math.sqrt(sum / data.length);
      // No máximo ~15 atualizações/s para não repintar a 60fps.
      if (t - lastEmit > 66) {
        lastEmit = t;
        setLevel(Math.min(1, rms * 4));
      }
      raf = requestAnimationFrame(() => tick(analyser, data, performance.now()));
    };

    (async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        if (disposed) {
          stream.getTracks().forEach((tr) => tr.stop());
          return;
        }
        ctx = new Ctx();
        const source = ctx.createMediaStreamSource(stream);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 512;
        source.connect(analyser);
        tick(analyser, new Uint8Array(analyser.fftSize), performance.now());
      } catch {
        // Sem áudio/permissão → medidor permanece em zero (nada simulado).
      }
    })();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      if (stream) stream.getTracks().forEach((tr) => tr.stop());
      if (ctx) ctx.close().catch(() => {});
      setLevel(0);
    };
  }, [active]);

  return level;
}
