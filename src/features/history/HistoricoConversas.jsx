import { useNavigate } from "react-router-dom";

export default function HistoricoConversas() {
  const navigate = useNavigate();

  return (
    <>
<header className="fixed top-0 inset-x-0 z-50 bg-surface/90 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="h-16 px-margin flex items-center justify-between"><div className="flex items-center gap-space-sm"><div className="w-9 h-9 rounded-xl bg-primary-container flex items-center justify-center"><span className="material-symbols-outlined text-on-primary-container text-[22px]">sign_language</span></div><span className="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight">Libras AI</span><span className="font-label-sm text-label-sm text-on-surface-variant hidden sm:inline-block ml-space-xs">• Histórico</span></div><div className="flex items-center gap-space-sm"><div aria-label="Perfil de Usuário" className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></div></header><main className="flex flex-col relative w-full pt-16 pb-24 bg-surface min-h-screen"><div className="flex flex-col w-full px-margin pb-space-lg lg:max-w-3xl lg:mx-auto">
<div className="flex flex-col gap-space-sm pt-space-sm pb-space-md">
<div className="flex items-center justify-between">
<div className="flex flex-col">
<h2 className="font-headline-lg text-headline-lg text-on-surface">Histórico de Conversas</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Sessões recentes traduzidas para Libras</p>
</div>
<button aria-label="Filtrar por data" className="flex items-center justify-center w-12 h-12 rounded-full bg-surface-container-high text-on-surface-variant hover:text-primary hover:bg-secondary-fixed transition-all" id="filter-btn" title="Filtrar sessões">
<span className="material-symbols-outlined text-[22px]">tune</span>
</button>
</div>
<div className="flex items-center gap-space-xs overflow-x-auto no-scrollbar pt-space-xs">
<button className="filter-chip active flex items-center gap-1.5 px-3 py-2 rounded-full bg-primary text-on-primary font-label-sm text-label-sm min-h-[40px] shadow-sm transition-all" data-filter="all">
<span className="material-symbols-outlined text-[16px]">all_inclusive</span>
<span>Todas (14)</span>
</button>
<button className="filter-chip flex items-center gap-1.5 px-3 py-2 rounded-full bg-surface-container text-on-surface-variant hover:bg-surface-container-high font-label-sm text-label-sm min-h-[40px] transition-all" data-filter="today">
<span className="material-symbols-outlined text-[16px]">today</span>
<span>Hoje</span>
</button>
<button className="filter-chip flex items-center gap-1.5 px-3 py-2 rounded-full bg-surface-container text-on-surface-variant hover:bg-surface-container-high font-label-sm text-label-sm min-h-[40px] transition-all" data-filter="favorites">
<span className="material-symbols-outlined text-[16px]">star</span>
<span>Favoritas</span>
</button>
<button className="ml-auto flex items-center gap-1 text-on-surface-variant hover:text-error px-2 py-2 rounded-lg font-label-sm text-label-sm min-h-[40px] transition-colors" id="clear-all-btn">
<span className="material-symbols-outlined text-[18px]">delete_sweep</span>
<span className="hidden xs:inline">Limpar tudo</span>
</button>
</div>
</div>
<div className="flex flex-col gap-space-md" id="sessions-container">
<article className="session-card flex flex-col bg-surface-container-lowest rounded-xl p-space-md shadow-sm transition-all hover:shadow-md" data-category="today">
<div className="flex items-start justify-between gap-space-sm mb-space-xs">
<div className="flex items-center gap-space-xs flex-wrap">
<div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[18px]">graphic_eq</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface font-bold">Hoje às 10:45</span>
<span className="font-body-sm text-[11px] text-on-surface-variant leading-tight">2m 10s • 4 frases detectadas</span>
</div>
</div>
<div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-[11px]">
<span className="material-symbols-outlined text-[14px]">check_circle</span>
<span>100% Sinalizada</span>
</div>
</div>
<div className="bg-surface-container-low rounded-lg p-space-sm my-space-xs">
<p className="font-body-md text-body-md text-on-surface leading-snug">
          “Bom dia, tudo bem? Eu gostaria de marcar uma consulta para terça-feira.”
        </p>
</div>
<div className="flex items-center justify-between pt-space-xs mt-space-xs">
<button aria-label="Rever sessão com Avatar em Libras" className="replay-btn flex items-center gap-space-xs px-4 py-2 rounded-full bg-primary text-on-primary font-label-md text-label-md min-h-[48px] shadow-sm hover:bg-primary-container transition-all">
<span className="material-symbols-outlined text-[20px]">3d_rotation</span>
<span>Rever com Avatar</span>
</button>
<div className="flex items-center gap-space-xs">
<button aria-label="Ouvir áudio original" className="flex items-center justify-center w-12 h-12 rounded-full text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors" title="Ouvir áudio">
<span className="material-symbols-outlined text-[22px]">volume_up</span>
</button>
<button aria-label="Copiar transcrição" className="flex items-center justify-center w-12 h-12 rounded-full text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors" title="Copiar texto">
<span className="material-symbols-outlined text-[22px]">content_copy</span>
</button>
<button aria-label="Excluir sessão" className="flex items-center justify-center w-12 h-12 rounded-full text-on-surface-variant hover:bg-surface-container hover:text-error transition-colors" title="Excluir">
<span className="material-symbols-outlined text-[22px]">delete_outline</span>
</button>
</div>
</div>
</article>
<article className="session-card flex flex-col bg-surface-container-lowest rounded-xl p-space-md shadow-sm transition-all hover:shadow-md" data-category="yesterday">
<div className="flex items-start justify-between gap-space-sm mb-space-xs">
<div className="flex items-center gap-space-xs flex-wrap">
<div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[18px]">record_voice_over</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface font-bold">Ontem às 16:20</span>
<span className="font-body-sm text-[11px] text-on-surface-variant leading-tight">1m 05s • 2 frases detectadas</span>
</div>
</div>
<div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-[11px]">
<span className="material-symbols-outlined text-[14px]">check_circle</span>
<span>Concluída</span>
</div>
</div>
<div className="bg-surface-container-low rounded-lg p-space-sm my-space-xs">
<p className="font-body-md text-body-md text-on-surface leading-snug">
          “Onde fica a recepção do segundo andar?”
        </p>
</div>
<div className="flex items-center justify-between pt-space-xs mt-space-xs">
<button aria-label="Rever sessão com Avatar em Libras" className="replay-btn flex items-center gap-space-xs px-4 py-2 rounded-full bg-surface-container-high text-on-surface hover:bg-secondary-fixed hover:text-primary font-label-md text-label-md min-h-[48px] transition-all">
<span className="material-symbols-outlined text-[20px] text-primary">sign_language</span>
<span>Rever com Avatar</span>
</button>
<div className="flex items-center gap-space-xs">
<button aria-label="Ouvir áudio original" className="flex items-center justify-center w-12 h-12 rounded-full text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors" title="Ouvir áudio">
<span className="material-symbols-outlined text-[22px]">volume_up</span>
</button>
<button aria-label="Copiar transcrição" className="flex items-center justify-center w-12 h-12 rounded-full text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors" title="Copiar texto">
<span className="material-symbols-outlined text-[22px]">content_copy</span>
</button>
<button aria-label="Excluir sessão" className="flex items-center justify-center w-12 h-12 rounded-full text-on-surface-variant hover:bg-surface-container hover:text-error transition-colors" title="Excluir">
<span className="material-symbols-outlined text-[22px]">delete_outline</span>
</button>
</div>
</div>
</article>
<article className="session-card flex flex-col bg-surface-container-lowest rounded-xl p-space-md shadow-sm transition-all hover:shadow-md" data-category="older">
<div className="flex items-start justify-between gap-space-sm mb-space-xs">
<div className="flex items-center gap-space-xs flex-wrap">
<div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[18px]">forum</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface font-bold">18 de Março, 14:10</span>
<span className="font-body-sm text-[11px] text-on-surface-variant leading-tight">3m 40s • 8 frases detectadas</span>
</div>
</div>
<div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-[11px]">
<span className="material-symbols-outlined text-[14px]">info</span>
<span>1 trecho adaptado</span>
</div>
</div>
<div className="bg-surface-container-low rounded-lg p-space-sm my-space-xs">
<p className="font-body-md text-body-md text-on-surface leading-snug">
          “Muito obrigado pela atenção, clareza e pelo atendimento inclusivo prestado hoje.”
        </p>
</div>
<div className="flex items-center justify-between pt-space-xs mt-space-xs">
<button aria-label="Rever sessão com Avatar em Libras" className="replay-btn flex items-center gap-space-xs px-4 py-2 rounded-full bg-surface-container-high text-on-surface hover:bg-secondary-fixed hover:text-primary font-label-md text-label-md min-h-[48px] transition-all">
<span className="material-symbols-outlined text-[20px] text-primary">sign_language</span>
<span>Rever com Avatar</span>
</button>
<div className="flex items-center gap-space-xs">
<button aria-label="Ouvir áudio original" className="flex items-center justify-center w-12 h-12 rounded-full text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors" title="Ouvir áudio">
<span className="material-symbols-outlined text-[22px]">volume_up</span>
</button>
<button aria-label="Copiar transcrição" className="flex items-center justify-center w-12 h-12 rounded-full text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors" title="Copiar texto">
<span className="material-symbols-outlined text-[22px]">content_copy</span>
</button>
<button aria-label="Excluir sessão" className="flex items-center justify-center w-12 h-12 rounded-full text-on-surface-variant hover:bg-surface-container hover:text-error transition-colors" title="Excluir">
<span className="material-symbols-outlined text-[22px]">delete_outline</span>
</button>
</div>
</div>
</article>
</div>
<div className="mt-space-md p-space-md rounded-xl bg-surface-container-low flex items-start gap-space-sm shadow-sm">
<div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[22px]" style={{fontVariationSettings: "'FILL' 1"}}>verified_user</span>
</div>
<div className="flex flex-col">
<h3 className="font-label-md text-label-md text-on-surface">Privacidade & Segurança Garantidas</h3>
<p className="font-body-sm text-[13px] text-on-surface-variant leading-relaxed mt-0.5">
        Seus registros e áudios são armazenados localmente e criptografados. Nenhuma gravação vocal é compartilhada com terceiros sem sua expressa autorização.
      </p>
</div>
</div>
<div className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-sm hidden items-end justify-center" id="replay-modal">
<div className="w-full max-w-lg bg-surface-container-lowest rounded-t-3xl p-space-md flex flex-col gap-space-md shadow-2xl animate-fade-in pb-safe">
<div className="w-12 h-1.5 rounded-full bg-outline-variant self-center mb-1"></div>
<div className="flex items-center justify-between">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-primary text-[24px]">sign_language</span>
<span className="font-headline-sm text-headline-sm text-on-surface">Repetição em Libras</span>
</div>
<button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container" id="close-modal-btn">
<span className="material-symbols-outlined text-[22px]">close</span>
</button>
</div>
<div className="relative w-full aspect-video rounded-xl bg-surface-container flex flex-col items-center justify-center overflow-hidden">
<img alt="Render 3D suave e amigável de um avatar digital sinalizando Libras em fundo neutro e acolhedor, tons azuis e iluminação de estúdio natural e de alto contraste acessível." className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC97F5eO2E94DyqRHvm6v9NTqWtoUicZLYdmuLVZ-xv4oABTDORUdnrDWuQ5KkNje4aOjP_Kcl0pYm6Cgilzx7utcu67FsSHXl4XI26ItD80cCMjc1B-VUhV2awvvpmKned8IQbJI4UzFVtk9OSeNnjn93jPp4UJxgAkZ-Lm1sn4g9vqL6VvQUJvJ5xpnTqWK5ooX_gngeLZUfwPJ53Zs963Y5o1jzzDp87X-U3AOxV_DSpIjIZHk8"/>
<div className="absolute bottom-2 left-2 right-2 bg-inverse-surface/80 backdrop-blur-md text-inverse-on-surface px-3 py-1.5 rounded-lg text-center font-label-sm text-label-sm truncate">
          “Bom dia, tudo bem? Eu gostaria de marcar...”
        </div>
</div>
<div className="flex items-center justify-center gap-space-md py-space-xs">
<button aria-label="Velocidade 0.75x" className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors">
<span className="font-label-sm text-[12px] font-bold">0.75x</span>
</button>
<button aria-label="Pausar / Reproduzir" className="w-14 h-14 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-md hover:bg-primary-container transition-all">
<span className="material-symbols-outlined text-[32px]">pause</span>
</button>
<button aria-label="Reiniciar tradução" className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors">
<span className="material-symbols-outlined text-[22px]">replay</span>
</button>
</div>
</div>
</div>
<div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface px-4 py-2 rounded-full font-label-sm text-label-sm shadow-lg pointer-events-none opacity-0 transition-opacity duration-300 z-50 flex items-center gap-1.5" id="toast">
<span className="material-symbols-outlined text-[18px] text-tertiary-fixed">check_circle</span>
<span id="toast-text">Texto copiado!</span>
</div>
</div>
</main><nav className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_-2px_12px_rgba(23,43,58,0.06)]" data-active-classes="text-primary bg-primary/10"><div className="flex justify-around items-center h-16 px-space-sm"><a className="flex flex-col items-center justify-center gap-0.5 px-space-md py-1 rounded-full text-on-surface-variant hover:text-on-surface transition-colors min-w-[64px] min-h-[48px]" href="#" onClick={(e) => { e.preventDefault(); navigate("/"); }}><span className="material-symbols-outlined text-[24px]">sign_language</span><span className="font-label-sm text-label-sm">Traduzir</span></a><a className="flex flex-col items-center justify-center gap-0.5 px-space-md py-1 rounded-full text-on-surface-variant hover:text-on-surface transition-colors min-w-[64px] min-h-[48px]" href="#" onClick={(e) => { e.preventDefault(); navigate("/historico"); }}><span className="material-symbols-outlined text-[24px]">history</span><span className="font-label-sm text-label-sm">Histórico</span></a><a className="flex flex-col items-center justify-center gap-0.5 px-space-md py-1 rounded-full text-on-surface-variant hover:text-on-surface transition-colors min-w-[64px] min-h-[48px]" href="#" onClick={(e) => { e.preventDefault(); navigate("/configuracoes"); }}><span className="material-symbols-outlined text-[24px]">settings</span><span className="font-label-sm text-label-sm">Ajustes</span></a></div></nav>
    </>
  );
}
