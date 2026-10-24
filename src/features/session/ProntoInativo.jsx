import { useNavigate } from "react-router-dom";

export default function ProntoInativo() {
  const navigate = useNavigate();

  return (
    <>
<header className="fixed top-0 inset-x-0 z-50 bg-surface/90 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="h-16 px-margin flex items-center justify-between"><div className="flex items-center gap-space-sm"><div className="w-9 h-9 rounded-xl bg-primary-container flex items-center justify-center"><span className="material-symbols-outlined text-on-primary-container text-[22px]">sign_language</span></div><span className="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight">Libras AI</span><span className="font-label-sm text-label-sm text-on-surface-variant hidden sm:inline-block ml-space-xs">• Traduzir</span></div><div className="flex items-center gap-space-sm"><div aria-label="Perfil de Usuário" className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></div></header><main className="flex flex-col relative w-full pt-16 pb-24 bg-surface min-h-screen"><div className="flex flex-col w-full px-margin pb-6 gap-y-4 lg:max-w-3xl lg:mx-auto">
<div className="flex items-center justify-between pt-1">
<div className="flex flex-col">
<div className="flex items-center gap-space-xs">
<h1 className="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight">Libras AI</h1>
<span className="inline-flex items-center px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-[11px] font-semibold">v2.4</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">Português para Libras em tempo real</p>
</div>
<div className="flex items-center gap-space-xs">
<button aria-label="Alternar modo de alto contraste" className="flex items-center justify-center w-10 h-10 rounded-full bg-surface-container-high text-on-surface-variant hover:text-primary hover:bg-secondary-container transition-all active:scale-95" id="contrast-toggle-btn" title="Acessibilidade Visual" type="button">
<span className="material-symbols-outlined text-[20px]">contrast</span>
</button>
<button aria-label="Ajuda e Guia de Sinais" className="flex items-center justify-center w-10 h-10 rounded-full bg-surface-container-high text-on-surface-variant hover:text-primary hover:bg-secondary-container transition-all active:scale-95" title="Ajuda" type="button">
<span className="material-symbols-outlined text-[20px]">help_outline</span>
</button>
</div>
</div>
<section className="relative w-full rounded-2xl bg-surface-container-lowest overflow-hidden shadow-sm flex flex-col items-center">
<div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest/85 backdrop-blur-md shadow-sm">
<span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
<span className="font-label-sm text-label-sm text-on-surface font-semibold tracking-wide uppercase text-[10px]">VLibras 3D Player</span>
</div>
<div className="absolute top-3 right-3 z-10 flex items-center gap-1">
<button aria-label="Velocidade dos sinais" className="px-2 py-1 rounded-full bg-surface-container-lowest/85 backdrop-blur-md font-label-sm text-label-sm text-on-surface-variant hover:text-primary shadow-sm text-[11px] font-semibold flex items-center gap-0.5" type="button">
<span>1.0x</span>
<span className="material-symbols-outlined text-[14px]">speed</span>
</button>
<button aria-label="Centralizar avatar" className="w-7 h-7 rounded-full bg-surface-container-lowest/85 backdrop-blur-md flex items-center justify-center text-on-surface-variant hover:text-primary shadow-sm" title="Redefinir Ângulo" type="button">
<span className="material-symbols-outlined text-[16px]">center_focus_strong</span>
</button>
</div>
<div className="w-full relative aspect-[3/4] max-h-[360px] flex items-center justify-center bg-gradient-to-b from-surface-container-low via-surface-container to-surface-container-high overflow-hidden">
<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none"></div>
<img alt="Avatar 3D do assistente VLibras posicionado de frente para interpretação de sinais" className="w-full h-full object-contain object-bottom select-none pointer-events-none transition-transform duration-500 ease-out" id="avatar-image" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwJ_5UjHVf7dM2QmlHOCdOhQmka3naJCBfA4v_VPbDY8KSDNG0UtLv7PzBZHK5nc5UMgKuiNiCvuLa6ZYU2FQctBcWxFUyLqp-IG6smbhMf0BDU25do-4KKtnH4I7csQ0Eh0F2N0qt2yoR3xYC54pTzsA5Gx3AljsZTvTYf2BBzl-6JTxLn_PO9-knvqboN0CHoXH-1YYmCyHCKL5mIeYlstRKlmUR3X2vlQ5jzyO0pULewVrVZec"/>
<div className="absolute bottom-2 inset-x-4 flex justify-between items-center text-on-surface-variant/70 text-[11px] font-label-sm select-none pointer-events-none">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[13px]">visibility</span> Espaço de Sinalização Ativo</span>
<span className="bg-surface-container-lowest/60 px-2 py-0.5 rounded-full backdrop-blur-xs">Prontidão Facial & Manual</span>
</div>
</div>
</section>
<div className="flex flex-col items-center justify-center text-center gap-1 py-1">
<div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 text-primary">
<span className="material-symbols-outlined text-[18px] text-primary">radio_button_checked</span>
<span className="font-label-md text-label-md font-bold tracking-tight">Pronto para ouvir</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant max-w-[280px]">
      Toque no botão abaixo e fale claramente em português
    </p>
</div>
<section className="w-full rounded-2xl bg-surface-container-lowest p-4 shadow-sm flex flex-col gap-2">
<div className="flex items-center justify-between">
<div className="flex items-center gap-1.5 text-on-surface font-label-sm text-label-sm">
<span className="material-symbols-outlined text-[18px] text-primary">record_voice_over</span>
<span className="font-bold">Você disse:</span>
</div>
<div className="flex items-center gap-1 text-on-surface-variant text-[11px] font-label-sm">
<span className="material-symbols-outlined text-[14px]">mic_off</span>
<span>Aguardando voz</span>
</div>
</div>
<div className="min-h-[72px] flex items-center justify-center p-3 rounded-xl bg-surface-container-low text-center">
<p className="font-body-md text-body-md text-on-surface-variant/80 italic select-none">
        “Sua fala aparecerá transcrita aqui conforme você fala durante a conversa...”
      </p>
</div>
<div className="flex items-center justify-between text-[11px] font-label-sm text-on-surface-variant pt-1 px-1">
<span className="flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
<span>Dicionário Libras 2024 carregado</span>
</span>
<span className="font-medium">PT-BR</span>
</div>
</section>
<div className="flex flex-col items-center gap-2 pt-1 pb-2">
<div className="relative flex items-center justify-center w-full max-w-sm">
<button className="group relative w-full h-15 rounded-full bg-primary-container text-on-primary-container shadow-md hover:bg-primary active:scale-[0.98] transition-all flex items-center justify-center gap-3 px-6 cursor-pointer overflow-hidden" id="mic-trigger-btn" type="button" onClick={() => navigate("/tempo-real")}>
<span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
<div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:scale-110">
<span className="material-symbols-outlined text-[24px] text-on-primary-container">mic</span>
</div>
<span className="font-label-lg text-label-lg font-bold tracking-wide">Começar a ouvir</span>
</button>
</div>
<div className="flex items-center gap-1.5 text-center text-on-surface-variant font-label-sm text-[11px]">
<span className="material-symbols-outlined text-[14px] text-on-surface-variant/80">info</span>
<span>O app continuará ouvindo pausas e frases contínuas</span>
</div>
</div>
</div>
</main><nav className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_-2px_12px_rgba(23,43,58,0.06)]" data-active-classes="text-primary bg-primary/10"><div className="flex justify-around items-center h-16 px-space-sm"><a aria-current="page" className="flex flex-col items-center justify-center gap-0.5 px-space-md py-1 rounded-full transition-colors min-w-[64px] min-h-[48px] text-primary bg-primary/10" href="#" onClick={(e) => { e.preventDefault(); navigate("/"); }}><span className="material-symbols-outlined text-[24px]">sign_language</span><span className="font-label-sm text-label-sm">Traduzir</span></a><a className="flex flex-col items-center justify-center gap-0.5 px-space-md py-1 rounded-full text-on-surface-variant hover:text-on-surface transition-colors min-w-[64px] min-h-[48px]" href="#" onClick={(e) => { e.preventDefault(); navigate("/historico"); }}><span className="material-symbols-outlined text-[24px]">history</span><span className="font-label-sm text-label-sm">Histórico</span></a><a className="flex flex-col items-center justify-center gap-0.5 px-space-md py-1 rounded-full text-on-surface-variant hover:text-on-surface transition-colors min-w-[64px] min-h-[48px]" href="#" onClick={(e) => { e.preventDefault(); navigate("/configuracoes"); }}><span className="material-symbols-outlined text-[24px]">settings</span><span className="font-label-sm text-label-sm">Ajustes</span></a></div></nav>
    </>
  );
}
