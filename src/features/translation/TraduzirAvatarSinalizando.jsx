import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useVlibrasPlayer } from "../avatar";

const STATUS_LABELS = {
  "sem-webgl": "Avatar 3D indisponível — imagem estática",
  carregando: "Carregando avatar 3D…",
  pronto: "Pronto para sinalizar",
  traduzindo: "Traduzindo para glosa…",
  sinalizando: "Sinalizando em Libras",
  erro: "Falha no player — imagem estática",
};

export default function TraduzirAvatarSinalizando() {
  const navigate = useNavigate();
  const location = useLocation();
  const player = useVlibrasPlayer();
  const [speed, setSpeedState] = useState(1);
  const signedRef = useRef(false);

  /** Frase real recebida da home (digitada) — sem frase mockada. */
  const incomingText =
    typeof location.state?.text === "string" ? location.state.text.trim() : "";

  // Quando o player Unity carrega e há frase real, traduz (oficial → IA) e sinaliza.
  useEffect(() => {
    if (player.status === "pronto" && !signedRef.current && incomingText) {
      signedRef.current = true;
      player.sign(incomingText);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player.status]);

  const cycleSpeed = () => {
    const next = speed === 1 ? 0.75 : speed === 0.75 ? 1.25 : 1;
    setSpeedState(next);
    player.setSpeed(next);
  };

  const progressPct =
    player.glossCount.total > 0
      ? Math.round((player.glossCount.current / player.glossCount.total) * 100)
      : 0;

  const playerVisible = player.loaded;

  return (
    <>
<header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="h-16 px-margin flex items-center justify-between"><div className="flex items-center gap-space-sm"><div className="w-9 h-9 rounded-xl bg-primary-container flex items-center justify-center"><span className="material-symbols-outlined text-on-primary-container text-[22px]">sign_language</span></div><div className="flex flex-col"><span className="font-headline-sm text-headline-sm text-on-surface leading-tight tracking-tight">Libras AI</span><span className="font-label-sm text-label-sm text-on-surface-variant leading-tight">Português para Libras</span></div></div><div className="flex items-center gap-space-sm"><a aria-label="Configurações" className="w-11 h-11 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container transition-colors" href="#" onClick={(e) => { e.preventDefault(); navigate("/configuracoes"); }}><span className="material-symbols-outlined text-[22px]">settings</span></a><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></div></header><main className="flex-1 flex flex-col relative w-full pt-16 pb-20 bg-surface"><div className="flex flex-col w-full px-margin space-y-space-sm sm:space-y-space-md lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
<div className="flex items-center justify-between gap-space-sm pt-0 lg:pt-space-xs lg:col-span-2">
<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-fixed text-tertiary font-label-sm text-label-sm shadow-sm">
<span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
<span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>sign_language</span>
<span>Avatar sinalizando em Libras</span>
</div>
<div className="inline-flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm">
<span className="material-symbols-outlined text-[15px] text-primary">bolt</span>
<span>Tempo real</span>
</div>
</div>
<div className="relative w-full rounded-2xl bg-surface-container-lowest shadow-md overflow-hidden flex flex-col items-center lg:row-span-3">
<div className="absolute inset-0 bg-gradient-to-b from-surface-container-low/40 via-surface-container-lowest to-surface-container-high/30 pointer-events-none"></div>
<div className="relative z-10 w-full p-space-sm flex items-center justify-between">
<div className="flex items-center gap-1 bg-surface-container/80 backdrop-blur-md px-2.5 py-1 rounded-full">
<span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
<span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">{player.status === "carregando" ? `${STATUS_LABELS.carregando} ${player.loadProgress}%` : player.status === "erro" ? player.error : STATUS_LABELS[player.status]}</span>
</div>
<div className="flex items-center gap-space-xs bg-surface-container/80 backdrop-blur-md p-1 rounded-full">
<button className="px-2.5 py-1 rounded-full font-label-sm text-label-sm font-semibold text-primary bg-surface-container-lowest hover:bg-surface-container transition-colors min-h-[32px]" id="speed-btn" title="Velocidade de reprodução" onClick={cycleSpeed}>
          {speed === 1 ? "1.0x" : `${speed}x`}
        </button>
<button className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" id="replay-btn" title="Repetir sinal" onClick={player.replay}>
<span className="material-symbols-outlined text-[18px]">replay</span>
</button>
<button className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" title="Centralizar ângulo">
<span className="material-symbols-outlined text-[18px]">3d_rotation</span>
</button>
</div>
</div>
<div className="relative z-0 w-full h-56 sm:h-64 lg:h-72 flex items-center justify-center overflow-hidden">
{/* Luz ambiente 3D atrás do avatar (profundidade) */}
<div aria-hidden="true" className="absolute top-8 left-1/2 -translate-x-1/2 w-52 h-52 rounded-full bg-primary-container/30 blur-3xl animate-pulse pointer-events-none"></div>
<img alt="Digital 3D render of an expressive friendly young Brazilian Sign Language virtual avatar, visible from upper torso to head against a clean studio white and soft light-blue ambient lighting. The avatar&#x27;s hands are actively positioned at upper chest height executing fluid Libras sign language gestures with articulate finger configurations and a warm, grammatically accurate welcoming facial expression. Highly detailed 3D Pixar-style realism, crisp outlines, blue shirt matching primary theme." className="relative w-full h-full object-cover object-top select-none pointer-events-none animate-avatar-breathe transition-opacity duration-500" style={{ opacity: playerVisible ? 0 : 1 }} src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOaOvhT8Iz5eeHi4LpWcFbjmhFv8V5E7W26IpVfmDLdMiEz8NGhwxveMX7B4GqKvLnX8smXyUdxl-vvxkF67OV-nmfRDDMmL1b80k5INrz1y5IV87Nx8UxlCrYb10EtbpXxl1M0jmCqYa_U-MtnH9XereHH5mJAj4plV_eqsTllpWmIOFusA1fkmoA5vaStsl9BUAMQp1CgccxAmq7xX8pKcfL-NMVuVqjlcNwpxHnmViP1l2OeG4"/>
{/* Player VLibras oficial (Unity WebGL) — aparece quando carrega; sem WebGL mantém a imagem estática */}
{player.status !== "sem-webgl" && (
<iframe
  ref={player.iframeRef}
  src="/vlibras-unity/index.html"
  title="Avatar VLibras 3D"
  sandbox="allow-scripts allow-same-origin allow-pointer-lock"
  className="absolute inset-0 z-0 w-full h-full border-0 pointer-events-none transition-opacity duration-500"
  style={{ opacity: playerVisible ? 1 : 0 }}
/>
)}
{/* Sombra volumétrica inferior (peito/solo) */}
<div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-surface-container-lowest/70 to-transparent pointer-events-none"></div>
<div className="absolute bottom-6 right-6 pointer-events-none flex items-center gap-1 px-2 py-1 rounded-lg bg-surface-container-lowest/80 backdrop-blur-md shadow-sm ring-1 ring-surface-container-high/50">
<span className="material-symbols-outlined text-[14px] text-primary">motion_photos_on</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Espaço Neutro</span>
</div>
</div>
<div className="relative z-10 w-full bg-surface-container px-space-md py-2.5 flex flex-col gap-1.5">
<div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
<span className="flex items-center gap-1 font-semibold text-on-surface">
<span className="material-symbols-outlined text-[15px] text-primary">translate</span>
          Sinalizando agora
          {player.glossSource === "llm" && (
            <span className="ml-1 px-1.5 py-0.5 rounded bg-tertiary-fixed text-tertiary font-label-sm text-[10px] font-bold uppercase tracking-wide" title="Glosa gerada por IA (Gemini) porque a API oficial do VLibras estava indisponível">
              glosa por IA
            </span>
          )}
        </span>
<span className="font-bold text-primary">{player.status === "sinalizando" ? `${progressPct}%` : player.status === "erro" ? player.error : STATUS_LABELS[player.status]}</span>
</div>
<div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
<div className="h-full bg-primary-container rounded-full transition-all duration-300 ease-out" style={{width: `${progressPct}%`}}></div>
</div>
</div>
</div>
<div className="w-full p-space-sm sm:p-space-md rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col space-y-space-sm">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Transcrição em áudio</span>
</div>
</div>
<div className="font-headline-sm text-headline-sm text-on-surface leading-snug line-clamp-2">
          {incomingText ? `“${incomingText}”` : "Aguardando frase do fluxo de voz ou texto…"}
        </div>
</div>
</div>
</main><nav className="fixed bottom-0 w-full z-50 pb-safe bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_-2px_12px_rgba(23,43,58,0.06)]" data-active-classes="text-primary-container font-semibold"><div className="flex items-center justify-around h-16 px-space-sm max-w-md mx-auto"><a aria-current="page" className="flex flex-col items-center justify-center flex-1 h-full py-1 transition-colors min-h-[48px] text-primary-container font-semibold" href="#" onClick={(e) => { e.preventDefault(); navigate("/"); }}><span className="material-symbols-outlined text-[24px]">translate</span><span className="font-label-sm text-label-sm mt-0.5">Traduzir</span></a><a className="flex flex-col items-center justify-center flex-1 h-full py-1 text-on-surface-variant hover:text-on-surface transition-colors min-h-[48px]" href="#" onClick={(e) => { e.preventDefault(); navigate("/historico"); }}><span className="material-symbols-outlined text-[24px]">history</span><span className="font-label-sm text-label-sm mt-0.5">Histórico</span></a><a className="flex flex-col items-center justify-center flex-1 h-full py-1 text-on-surface-variant hover:text-on-surface transition-colors min-h-[48px]" href="#" onClick={(e) => { e.preventDefault(); navigate("/configuracoes"); }}><span className="material-symbols-outlined text-[24px]">settings</span><span className="font-label-sm text-label-sm mt-0.5">Configurações</span></a></div></nav>
    </>
  );
}
