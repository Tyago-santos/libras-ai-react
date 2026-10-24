import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { speechEngine } from "../speech";

export default function TraduzirProntoParaOuvir() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showInput, setShowInput] = useState(false);
  const [text, setText] = useState("");

  // "Digitar em vez disso" (vindo da tela de voz) abre o campo de texto.
  useEffect(() => {
    if (location.state?.focusText) setShowInput(true);
  }, [location.state]);

  const submitText = () => {
    const value = text.trim();
    if (!value) return;
    navigate("/avatar-sinalizando", { state: { text: value } });
  };

  return (
    <>
<header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="h-16 px-margin flex items-center justify-between"><div className="flex items-center gap-space-sm"><div className="w-9 h-9 rounded-xl bg-primary-container flex items-center justify-center"><span className="material-symbols-outlined text-on-primary-container text-[22px]">sign_language</span></div><div className="flex flex-col"><span className="font-headline-sm text-headline-sm text-on-surface leading-tight tracking-tight">Libras AI</span><span className="font-label-sm text-label-sm text-on-surface-variant leading-tight">Português para Libras</span></div></div><div className="flex items-center gap-space-sm"><a aria-label="Configurações" className="w-11 h-11 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container transition-colors" href="#" onClick={(e) => { e.preventDefault(); navigate("/configuracoes"); }}><span className="material-symbols-outlined text-[22px]">settings</span></a><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></div></header><main className="flex-1 flex flex-col relative w-full pt-16 pb-20 bg-surface"><div className="flex flex-col w-full px-margin pb-3 gap-space-sm sm:gap-space-md lg:grid lg:grid-cols-2 lg:items-start lg:gap-6">
<div className="flex items-center justify-between pt-2 lg:col-span-2">
<div className="flex items-center gap-space-xs bg-surface-container-low px-3 py-1.5 rounded-full shadow-sm">
<span className="w-2.5 h-2.5 rounded-full bg-tertiary-container animate-pulse"></span>
<span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">Pronto para ouvir</span>
</div>
</div>
<section aria-label="Palco virtual do intérprete de Libras 3D" className="relative w-full aspect-[4/3.4] sm:aspect-[4/3] rounded-3xl bg-gradient-to-b from-surface-container-lowest via-surface-container-lowest to-surface-container-low p-3 shadow-md flex flex-col justify-between overflow-hidden">
<div className="relative z-10 flex items-center justify-between w-full px-1">
<div className="flex items-center gap-1.5 bg-surface-container/80 backdrop-blur-md px-2.5 py-1 rounded-lg">
<span className="material-symbols-outlined text-[16px] text-primary">verified</span>
<span className="font-label-sm text-label-sm text-on-surface">Libras Oficial</span>
</div>
<div className="flex items-center gap-1 bg-surface-container/80 backdrop-blur-md px-2 py-1 rounded-lg">
<span className="material-symbols-outlined text-[16px] text-tertiary">wifi_tethering</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Online</span>
</div>
</div>
<div className="relative flex-1 flex items-center justify-center my-1">
<div className="absolute bottom-2 w-3/4 h-8 bg-surface-variant/40 rounded-full blur-md"></div>
<div aria-hidden="true" className="absolute top-1/3 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-primary-container/20 blur-3xl animate-pulse pointer-events-none"></div>
<img alt="A modern, warm, friendly 3D digital human character designed as a Brazilian Sign Language (Libras) interpreter. Upper torso view, centered framing, neutral receptive resting posture with both hands clearly visible and relaxed in front of the chest in the signing area. Wearing a clean minimalist deep navy t-shirt. Expressive, welcoming facial expression, bright natural studio lighting, soft neutral background with crisp accessibility clarity and subtle primary blue accents." className="relative z-10 w-full h-full object-contain max-h-[300px] lg:max-h-[440px] select-none animate-avatar-breathe" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmBw3MbUkfTw__TsbtKcPtLsyPvDSz62hU6I9LDY8CLwnmG_A0PJrTfa2-VR2BMg5-kWGaOCxnWn4nyFFZ1EKdgHb4Euu5GnEyAtMQcoWWVZbBfR3dzDefG4lkDeq4iygYVgHvoHw3vKMmlc_deSdi3pIWXBNi4YJD236bT-CMtv_YZ-5xYEPL2C5pxb-FkENmUSstMebREBR0gAv-ZQ83Ujf737zud44ANcZesghcKZycQMO6i_Y"/>
</div>
</section>
<div className="flex flex-col gap-space-md lg:row-start-2 lg:col-start-2">
<section className="w-full bg-surface-container-lowest rounded-2xl p-3 sm:p-4 shadow-sm flex flex-col gap-2">
<div className="flex items-center justify-between">
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-[18px] text-primary">record_voice_over</span>
<span className="font-label-md text-label-md text-on-surface-variant font-semibold">Você disse:</span>
</div>
<span className="font-label-sm text-label-sm text-outline">Aguardando voz</span>
</div>
<div className="min-h-[64px] flex items-center justify-center bg-surface-container-low/60 rounded-xl px-3 py-3 text-center">
<p className="font-body-md text-body-md text-on-surface-variant leading-snug">
        Toque no botão abaixo e comece a falar normalmente...
      </p>
</div>
<div className="flex items-center gap-1.5 text-on-surface-variant pt-1 px-1">
<span className="material-symbols-outlined text-[16px] text-tertiary">lightbulb</span>
<p className="font-label-sm text-label-sm text-on-surface-variant">Fale frases naturais e em ritmo cadenciado para melhor tradução.</p>
</div>
</section>
<div className="w-full flex flex-col items-center gap-3 pt-2">
<button aria-label="Começar a ouvir voz para traduzir para Libras" className="group relative w-full max-w-sm h-16 bg-primary-container text-on-primary-container rounded-2xl shadow-lg flex items-center justify-center gap-3 active:scale-[0.98] transition-all duration-200 cursor-pointer overflow-hidden" id="mic-action-btn" type="button" onClick={() => { speechEngine.start(); navigate("/ouvindo-fala"); }}>
<span className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity"></span>
<div className="w-10 h-10 rounded-full bg-on-primary-container/20 flex items-center justify-center">
<span className="material-symbols-outlined text-[24px] text-on-primary-container">mic</span>
</div>
<div className="flex flex-col items-start text-left">
<span className="font-headline-sm text-headline-sm font-semibold tracking-wide text-on-primary-container">Começar a ouvir</span>
<span className="font-label-sm text-label-sm text-on-primary-container/80 -mt-0.5">Toque para iniciar a captura contínua</span>
</div>
</button>
{showInput ? (
<div className="w-full max-w-sm flex items-center gap-2">
<input
  autoFocus
  value={text}
  onChange={(e) => setText(e.target.value)}
  onKeyDown={(e) => { if (e.key === "Enter") submitText(); }}
  placeholder="Digite uma frase em português…"
  aria-label="Frase para traduzir em Libras"
  className="flex-1 h-12 px-4 rounded-2xl bg-surface-container-low border border-surface-container-high focus:border-primary outline-none text-body-md text-on-surface placeholder:text-on-surface-variant"
/>
<button aria-label="Traduzir frase digitada" className="h-12 px-5 rounded-2xl bg-primary text-on-primary font-label-md font-semibold hover:opacity-90 active:scale-[0.98] transition-all" type="button" onClick={submitText}>
  Traduzir
</button>
</div>
) : (
<button aria-label="Prefere digitar o texto?" className="flex items-center gap-1.5 text-on-surface-variant hover:text-primary transition-colors py-1 px-3 rounded-full min-h-[48px]" type="button" onClick={() => setShowInput(true)}>
<span className="material-symbols-outlined text-[18px]">keyboard</span>
<span className="font-label-md text-label-md">Ou digite uma frase</span>
</button>
)}
</div>
</div>
</div>
</main><nav className="fixed bottom-0 w-full z-50 pb-safe bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_-2px_12px_rgba(23,43,58,0.06)]" data-active-classes="text-primary-container font-semibold"><div className="flex items-center justify-around h-16 px-space-sm max-w-md mx-auto"><a aria-current="page" className="flex flex-col items-center justify-center flex-1 h-full py-1 transition-colors min-h-[48px] text-primary-container font-semibold" href="#" onClick={(e) => { e.preventDefault(); navigate("/"); }}><span className="material-symbols-outlined text-[24px]">translate</span><span className="font-label-sm text-label-sm mt-0.5">Traduzir</span></a><a className="flex flex-col items-center justify-center flex-1 h-full py-1 text-on-surface-variant hover:text-on-surface transition-colors min-h-[48px]" href="#" onClick={(e) => { e.preventDefault(); navigate("/historico"); }}><span className="material-symbols-outlined text-[24px]">history</span><span className="font-label-sm text-label-sm mt-0.5">Histórico</span></a><a className="flex flex-col items-center justify-center flex-1 h-full py-1 text-on-surface-variant hover:text-on-surface transition-colors min-h-[48px]" href="#" onClick={(e) => { e.preventDefault(); navigate("/configuracoes"); }}><span className="material-symbols-outlined text-[24px]">settings</span><span className="font-label-sm text-label-sm mt-0.5">Configurações</span></a></div></nav>
    </>
  );
}
