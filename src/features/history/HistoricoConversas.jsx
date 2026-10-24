import { useNavigate } from "react-router-dom";

export default function HistoricoConversas() {
  const navigate = useNavigate();

  return (
    <>
<header className="fixed top-0 inset-x-0 z-50 bg-surface/90 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="h-16 px-margin flex items-center justify-between"><div className="flex items-center gap-space-sm"><div className="w-9 h-9 rounded-xl bg-primary-container flex items-center justify-center"><span className="material-symbols-outlined text-on-primary-container text-[22px]">sign_language</span></div><span className="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight">Libras AI</span><span className="font-label-sm text-label-sm text-on-surface-variant hidden sm:inline-block ml-space-xs">• Histórico</span></div><div className="flex items-center gap-space-sm"><div aria-label="Perfil de Usuário" className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></div></header><main className="flex flex-col relative w-full pt-16 pb-24 bg-surface min-h-screen"><div className="flex flex-col w-full px-margin pb-space-lg lg:max-w-3xl lg:mx-auto">
<div className="flex flex-col gap-space-sm pt-space-sm pb-space-md">
<h2 className="font-headline-lg text-headline-lg text-on-surface">Histórico de Conversas</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Registro de conversas traduzidas para Libras</p>
</div>
<div className="flex flex-col items-center justify-center gap-3 py-space-xl text-center" id="sessions-container">
<div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center">
<span className="material-symbols-outlined text-[32px] text-on-surface-variant">history</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface">Nenhuma conversa registrada</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant max-w-[300px] leading-relaxed">
          Esta versão não grava histórico: nada é salvo no dispositivo nem na nuvem.
        </p>
<button className="mt-1 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-primary text-on-primary font-label-md text-label-md min-h-[48px] shadow-sm hover:bg-primary-container transition-colors" onClick={() => navigate("/")} type="button">
<span className="material-symbols-outlined text-[20px]">translate</span>
<span>Começar a traduzir</span>
</button>
</div>
</div>
</main><nav className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_-2px_12px_rgba(23,43,58,0.06)]" data-active-classes="text-primary bg-primary/10"><div className="flex justify-around items-center h-16 px-space-sm"><a className="flex flex-col items-center justify-center gap-0.5 px-space-md py-1 rounded-full text-on-surface-variant hover:text-on-surface transition-colors min-w-[64px] min-h-[48px]" href="#" onClick={(e) => { e.preventDefault(); navigate("/"); }}><span className="material-symbols-outlined text-[24px]">sign_language</span><span className="font-label-sm text-label-sm">Traduzir</span></a><a className="flex flex-col items-center justify-center gap-0.5 px-space-md py-1 rounded-full text-on-surface-variant hover:text-on-surface transition-colors min-w-[64px] min-h-[48px]" href="#" onClick={(e) => { e.preventDefault(); navigate("/historico"); }}><span className="material-symbols-outlined text-[24px]">history</span><span className="font-label-sm text-label-sm">Histórico</span></a><a className="flex flex-col items-center justify-center gap-0.5 px-space-md py-1 rounded-full text-on-surface-variant hover:text-on-surface transition-colors min-w-[64px] min-h-[48px]" href="#" onClick={(e) => { e.preventDefault(); navigate("/configuracoes"); }}><span className="material-symbols-outlined text-[24px]">settings</span><span className="font-label-sm text-label-sm">Ajustes</span></a></div></nav>
    </>
  );
}
