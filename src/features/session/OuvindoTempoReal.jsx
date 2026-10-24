import { useNavigate } from "react-router-dom";

export default function OuvindoTempoReal() {
  const navigate = useNavigate();

  return (
    <>
<header className="fixed top-0 inset-x-0 z-50 bg-surface/90 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="h-16 px-margin flex items-center justify-between"><div className="flex items-center gap-space-sm"><div className="w-9 h-9 rounded-xl bg-primary-container flex items-center justify-center"><span className="material-symbols-outlined text-on-primary-container text-[22px]">sign_language</span></div><span className="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight">Libras AI</span><span className="font-label-sm text-label-sm text-on-surface-variant hidden sm:inline-block ml-space-xs">• Traduzir</span></div><div className="flex items-center gap-space-sm"><div aria-label="Perfil de Usuário" className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></div></header><main className="flex flex-col relative w-full pt-16 pb-24 bg-surface min-h-screen"><div className="flex flex-col w-full px-margin pb-6 gap-space-md lg:max-w-3xl lg:mx-auto">
<div className="flex items-center justify-between pt-1">
<div className="flex items-center gap-space-xs bg-primary/10 px-3 py-1 rounded-full">
<span className="relative flex h-2.5 w-2.5 items-center justify-center">
<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
<span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
</span>
<span className="font-label-sm text-label-sm text-primary uppercase tracking-wider">AO VIVO</span>
</div>
<div className="flex items-center gap-1.5 bg-surface-container px-3 py-1 rounded-full">
<span className="material-symbols-outlined text-[15px] text-tertiary" style={{fontVariationSettings: "'FILL' 1"}}>sensors</span>
<span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Libras v2.4 • Conectado</span>
</div>
</div>
<div className="relative w-full rounded-2xl bg-surface-container-lowest shadow-sm overflow-hidden flex flex-col items-center justify-center">
<div className="absolute inset-0 bg-gradient-to-b from-surface-container-low/50 via-transparent to-surface-container-high/40 pointer-events-none"></div>
<div className="absolute top-3 right-3 z-10 flex items-center gap-space-xs">
<button aria-label="Ajustar velocidade" className="flex items-center justify-center h-9 px-2.5 rounded-full bg-surface-container-lowest/85 backdrop-blur-md text-on-surface-variant hover:text-primary transition-colors shadow-sm" type="button">
<span className="font-label-sm text-label-sm font-bold">1.0x</span>
</button>
<button aria-label="Recentralizar visualização" className="flex items-center justify-center h-9 w-9 rounded-full bg-surface-container-lowest/85 backdrop-blur-md text-on-surface-variant hover:text-primary transition-colors shadow-sm" type="button">
<span className="material-symbols-outlined text-[18px]">center_focus_strong</span>
</button>
</div>
<div className="absolute top-3 left-3 z-10 flex items-center gap-2 bg-primary text-on-primary px-3 py-1.5 rounded-full shadow-md animate-pulse">
<span className="material-symbols-outlined text-[16px]">graphic_eq</span>
<span className="font-label-sm text-label-sm font-semibold">Ouvindo você...</span>
</div>
<div className="w-full aspect-[4/3] flex items-center justify-center overflow-hidden relative">
<img alt="Avatar 3D do VLibras posicionado de frente para o usuário, pronto para converter a fala captada em gestos de Libras com clareza facial e manual" className="w-full h-full object-cover object-top select-none" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwJ_5UjHVf7dM2QmlHOCdOhQmka3naJCBfA4v_VPbDY8KSDNG0UtLv7PzBZHK5nc5UMgKuiNiCvuLa6ZYU2FQctBcWxFUyLqp-IG6smbhMf0BDU25do-4KKtnH4I7csQ0Eh0F2N0qt2yoR3xYC54pTzsA5Gx3AljsZTvTYf2BBzl-6JTxLn_PO9-knvqboN0CHoXH-1YYmCyHCKL5mIeYlstRKlmUR3X2vlQ5jzyO0pULewVrVZec"/>
<div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-surface-container-lowest to-transparent pointer-events-none"></div>
</div>
<div className="w-full px-4 py-2 bg-surface-container-low flex items-center justify-between text-on-surface-variant">
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-[16px] text-primary">sign_language</span>
<span className="font-label-sm text-label-sm">Área de sinalização ativa</span>
</div>
<span className="font-label-sm text-label-sm text-on-surface-variant/80">Sincronização 3D pronta</span>
</div>
</div>
<div className="flex flex-col w-full bg-surface-container-lowest rounded-2xl p-4 shadow-sm gap-space-sm">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[18px]" style={{fontVariationSettings: "'FILL' 1"}}>mic</span>
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Você disse:</span>
</div>
<span className="font-label-sm text-label-sm text-tertiary font-semibold flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span>
        Tempo real
      </span>
</div>
<div className="min-h-[56px] text-on-surface font-body-lg text-body-lg leading-relaxed">
<span>Bom dia, tudo bem? Eu gostaria de marcar uma consulta para a próxima semana</span><span className="inline-block w-0.5 h-5 bg-primary ml-1 align-middle animate-pulse"></span>
</div>
<div className="flex items-center justify-between pt-2 border-t-0 bg-surface-container-low/70 -mx-4 -mb-4 px-4 py-2.5 rounded-b-2xl">
<div aria-label="Indicador de nível de áudio" className="flex items-center gap-1 h-5">
<span className="w-1 bg-primary rounded-full animate-bounce h-2" style={{animationDuration: "400ms"}}></span>
<span className="w-1 bg-primary rounded-full animate-bounce h-4" style={{animationDuration: "550ms", animationDelay: "100ms"}}></span>
<span className="w-1 bg-primary rounded-full animate-bounce h-3" style={{animationDuration: "450ms", animationDelay: "200ms"}}></span>
<span className="w-1 bg-primary rounded-full animate-bounce h-5" style={{animationDuration: "600ms", animationDelay: "50ms"}}></span>
<span className="w-1 bg-primary rounded-full animate-bounce h-2.5" style={{animationDuration: "480ms", animationDelay: "150ms"}}></span>
<span className="w-1 bg-primary rounded-full animate-bounce h-4" style={{animationDuration: "520ms", animationDelay: "250ms"}}></span>
</div>
<span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Detectando voz em português...</span>
</div>
</div>
<div className="flex flex-col items-center justify-center pt-2 gap-space-sm">
<div className="relative flex items-center justify-center">
<div className="absolute -inset-3 rounded-full bg-error/15 animate-ping opacity-60 pointer-events-none"></div>
<div className="absolute -inset-1.5 rounded-full bg-error/25 pointer-events-none"></div>
<button aria-label="Parar de ouvir áudio" className="relative flex items-center justify-center w-18 h-18 rounded-full bg-error text-on-error shadow-lg active:scale-95 transition-transform" id="btn-toggle-mic" type="button" onClick={() => navigate("/pronto-inativo")}>
<span className="material-symbols-outlined text-[32px]">stop</span>
</button>
</div>
<div className="flex flex-col items-center text-center mt-1">
<span className="font-headline-sm text-headline-sm text-on-surface font-semibold">Parar de ouvir</span>
<div className="flex items-center gap-1.5 text-on-surface-variant font-body-sm text-body-sm mt-0.5">
<span className="material-symbols-outlined text-[15px] text-error">timer</span>
<span className="tabular-nums font-medium" id="call-timer">00:14 de áudio captado</span>
</div>
</div>
</div>
<div className="flex items-center justify-center gap-space-xs mt-1">
<button className="px-3 py-1.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-colors" type="button">
      Limpar texto
    </button>
<button className="px-3 py-1.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-colors" type="button">
      Trocar para digitação
    </button>
<button className="px-3 py-1.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-colors" type="button">
      Repetir Libras
    </button>
</div>
</div>
</main><nav className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_-2px_12px_rgba(23,43,58,0.06)]" data-active-classes="text-primary bg-primary/10"><div className="flex justify-around items-center h-16 px-space-sm"><a aria-current="page" className="flex flex-col items-center justify-center gap-0.5 px-space-md py-1 rounded-full transition-colors min-w-[64px] min-h-[48px] text-primary bg-primary/10" href="#" onClick={(e) => { e.preventDefault(); navigate("/"); }}><span className="material-symbols-outlined text-[24px]">sign_language</span><span className="font-label-sm text-label-sm">Traduzir</span></a><a className="flex flex-col items-center justify-center gap-0.5 px-space-md py-1 rounded-full text-on-surface-variant hover:text-on-surface transition-colors min-w-[64px] min-h-[48px]" href="#" onClick={(e) => { e.preventDefault(); navigate("/historico"); }}><span className="material-symbols-outlined text-[24px]">history</span><span className="font-label-sm text-label-sm">Histórico</span></a><a className="flex flex-col items-center justify-center gap-0.5 px-space-md py-1 rounded-full text-on-surface-variant hover:text-on-surface transition-colors min-w-[64px] min-h-[48px]" href="#" onClick={(e) => { e.preventDefault(); navigate("/configuracoes"); }}><span className="material-symbols-outlined text-[24px]">settings</span><span className="font-label-sm text-label-sm">Ajustes</span></a></div></nav>
    </>
  );
}
