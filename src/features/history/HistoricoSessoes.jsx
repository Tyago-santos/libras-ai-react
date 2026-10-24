import { useNavigate } from "react-router-dom";
import { copySnippet, playReplay, toggleFavorite } from "../../shared/interactions.js";

export default function HistoricoSessoes() {
  const navigate = useNavigate();

  return (
    <>
<header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="h-16 px-margin flex items-center justify-between"><div className="flex items-center gap-space-sm"><div className="w-9 h-9 rounded-xl bg-primary-container flex items-center justify-center"><span className="material-symbols-outlined text-on-primary-container text-[22px]">sign_language</span></div><div className="flex flex-col"><span className="font-headline-sm text-headline-sm text-on-surface leading-tight tracking-tight">Libras AI</span><span className="font-label-sm text-label-sm text-on-surface-variant leading-tight">Português para Libras</span></div></div><div className="flex items-center gap-space-sm"><a aria-label="Configurações" className="w-11 h-11 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container transition-colors" href="#" onClick={(e) => { e.preventDefault(); navigate("/configuracoes"); }}><span className="material-symbols-outlined text-[22px]">settings</span></a><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></div></header><main className="flex-1 flex flex-col relative w-full pt-16 pb-20 bg-surface"><div className="flex flex-col w-full lg:max-w-3xl lg:mx-auto">
<div className="px-margin pt-space-md pb-space-xs flex flex-col gap-1">
<div className="flex items-center justify-between">
<h1 className="font-headline-lg text-headline-lg text-on-surface">Histórico de Conversas</h1>
<button aria-label="Limpar histórico" className="flex items-center justify-center w-10 h-10 rounded-full bg-surface-container-high text-on-surface-variant hover:text-primary transition-colors" type="button">
<span className="material-symbols-outlined text-[20px]">delete_sweep</span>
</button>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">Registros das sessões recentes de tradução presencial</p>
</div>
<div className="px-margin py-space-sm flex flex-col gap-space-sm">
<div className="relative flex items-center w-full">
<span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">search</span>
<input className="w-full h-12 pl-11 pr-4 bg-surface-container-lowest rounded-xl font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary-container shadow-sm transition-all" id="historySearch" placeholder="Pesquisar falas traduzidas..." type="search"/>
</div>
<div className="flex items-center gap-space-xs overflow-x-auto py-1 no-scrollbar" role="tablist">
<button className="filter-chip px-4 py-2 rounded-full font-label-md text-label-md bg-primary-container text-on-primary-container shadow-sm whitespace-nowrap transition-all" data-filter="all" type="button">
        Todas (14)
      </button>
<button className="filter-chip px-4 py-2 rounded-full font-label-md text-label-md bg-surface-container text-on-surface-variant hover:bg-surface-container-high whitespace-nowrap transition-all" data-filter="today" type="button">
        Hoje (2)
      </button>
<button className="filter-chip px-4 py-2 rounded-full font-label-md text-label-md bg-surface-container text-on-surface-variant hover:bg-surface-container-high whitespace-nowrap transition-all" data-filter="week" type="button">
        Esta semana (8)
      </button>
<button className="filter-chip px-4 py-2 rounded-full font-label-md text-label-md bg-surface-container text-on-surface-variant hover:bg-surface-container-high whitespace-nowrap transition-all flex items-center gap-1" data-filter="favorites" type="button">
<span className="material-symbols-outlined text-[16px]">star</span>
        Favoritas
      </button>
</div>
</div>
<div className="px-margin py-space-xs flex flex-col gap-space-md">
<div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-sm relative overflow-hidden group" data-category="today">
<div className="flex items-center justify-between">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-primary-container text-[18px]">calendar_today</span>
<span className="font-label-md text-label-md text-on-surface">Hoje às 10:42</span>
</div>
<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
          Concluído
        </span>
</div>
<div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-[15px]">chat_bubble_outline</span>
          4 frases
        </span>
<span>•</span>
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-[15px]">schedule</span>
          2m 15s
        </span>
</div>
<div className="bg-surface-container-low rounded-lg p-space-sm">
<p className="font-body-md text-body-md text-on-surface line-clamp-2 leading-relaxed">
          "Bom dia, tudo bem? Eu gostaria de agendar uma consulta médica para amanhã..."
        </p>
</div>
<div className="flex items-center justify-between pt-1">
<div className="flex items-center gap-2">
<button className="flex items-center gap-1.5 px-3.5 py-2 min-h-[44px] rounded-lg bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md hover:bg-secondary-container transition-colors" onClick={(e) => playReplay(e.currentTarget)} type="button">
<span className="material-symbols-outlined text-[18px]">play_arrow</span>
<span>Repetir em Libras</span>
</button>
<button aria-label="Copiar transcrição" className="w-11 h-11 flex items-center justify-center rounded-lg bg-surface-container text-on-surface-variant hover:text-primary transition-colors" onClick={(e) => copySnippet(this, 'Bom dia, tudo bem? Eu gostaria de agendar uma consulta médica para amanhã...')} type="button">
<span className="material-symbols-outlined text-[20px]">content_copy</span>
</button>
</div>
<button aria-label="Favoritar tradução" className="w-11 h-11 flex items-center justify-center rounded-lg text-outline hover:text-amber-500 transition-colors" onClick={(e) => toggleFavorite(e.currentTarget)} type="button">
<span className="material-symbols-outlined text-[22px]">star_outline</span>
</button>
</div>
</div>
<div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-sm relative overflow-hidden" data-category="today">
<div className="flex items-center justify-between">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-primary-container text-[18px]">calendar_today</span>
<span className="font-label-md text-label-md text-on-surface">Hoje às 09:15</span>
</div>
<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
          Concluído
        </span>
</div>
<div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-[15px]">chat_bubble_outline</span>
          2 frases
        </span>
<span>•</span>
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-[15px]">schedule</span>
          45s
        </span>
</div>
<div className="bg-surface-container-low rounded-lg p-space-sm">
<p className="font-body-md text-body-md text-on-surface line-clamp-2 leading-relaxed">
          "Onde fica a recepção central do prédio?"
        </p>
</div>
<div className="flex items-center justify-between pt-1">
<div className="flex items-center gap-2">
<button className="flex items-center gap-1.5 px-3.5 py-2 min-h-[44px] rounded-lg bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md hover:bg-secondary-container transition-colors" onClick={(e) => playReplay(e.currentTarget)} type="button">
<span className="material-symbols-outlined text-[18px]">play_arrow</span>
<span>Repetir em Libras</span>
</button>
<button aria-label="Copiar transcrição" className="w-11 h-11 flex items-center justify-center rounded-lg bg-surface-container text-on-surface-variant hover:text-primary transition-colors" onClick={(e) => copySnippet(this, 'Onde fica a recepção central do prédio?')} type="button">
<span className="material-symbols-outlined text-[20px]">content_copy</span>
</button>
</div>
<button aria-label="Favoritar tradução" className="w-11 h-11 flex items-center justify-center rounded-lg text-outline hover:text-amber-500 transition-colors" onClick={(e) => toggleFavorite(e.currentTarget)} type="button">
<span className="material-symbols-outlined text-[22px]">star_outline</span>
</button>
</div>
</div>
<div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-sm relative overflow-hidden" data-category="week">
<div className="flex items-center justify-between">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-outline text-[18px]">event</span>
<span className="font-label-md text-label-md text-on-surface">Ontem às 16:30</span>
</div>
<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
          Concluído
        </span>
</div>
<div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-[15px]">chat_bubble_outline</span>
          6 frases
        </span>
<span>•</span>
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-[15px]">schedule</span>
          3m 40s
        </span>
</div>
<div className="bg-surface-container-low rounded-lg p-space-sm">
<p className="font-body-md text-body-md text-on-surface line-clamp-2 leading-relaxed">
          "Obrigado pela orientação, tenha um ótimo trabalho."
        </p>
</div>
<div className="flex items-center justify-between pt-1">
<div className="flex items-center gap-2">
<button className="flex items-center gap-1.5 px-3.5 py-2 min-h-[44px] rounded-lg bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md hover:bg-secondary-container transition-colors" onClick={(e) => playReplay(e.currentTarget)} type="button">
<span className="material-symbols-outlined text-[18px]">play_arrow</span>
<span>Repetir em Libras</span>
</button>
<button aria-label="Copiar transcrição" className="w-11 h-11 flex items-center justify-center rounded-lg bg-surface-container text-on-surface-variant hover:text-primary transition-colors" onClick={(e) => copySnippet(this, 'Obrigado pela orientação, tenha um ótimo trabalho.')} type="button">
<span className="material-symbols-outlined text-[20px]">content_copy</span>
</button>
</div>
<button aria-label="Favoritar tradução" className="w-11 h-11 flex items-center justify-center rounded-lg text-outline hover:text-amber-500 transition-colors" onClick={(e) => toggleFavorite(e.currentTarget)} type="button">
<span className="material-symbols-outlined text-[22px]">star_outline</span>
</button>
</div>
</div>
</div>
<div className="px-margin pt-space-md pb-space-lg">
<div className="bg-surface-container-low rounded-xl p-space-md flex items-start gap-space-sm">
<div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center shrink-0 text-primary">
<span className="material-symbols-outlined text-[20px]">lock</span>
</div>
<div className="flex flex-col gap-0.5">
<span className="font-label-md text-label-md text-on-surface">Privacidade Garantida</span>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
          Os áudios não são armazenados. Apenas o texto transcrito fica salvo localmente no seu dispositivo.
        </p>
</div>
</div>
</div>
<div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface font-label-md text-label-md px-4 py-2.5 rounded-full shadow-lg opacity-0 pointer-events-none transition-opacity duration-200 z-50 flex items-center gap-2" id="toastNotification">
<span className="material-symbols-outlined text-tertiary-fixed-dim text-[18px]">check_circle</span>
<span id="toastMessage">Texto copiado!</span>
</div>
</div>
</main><nav className="fixed bottom-0 w-full z-50 pb-safe bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_-2px_12px_rgba(23,43,58,0.06)]" data-active-classes="text-primary-container font-semibold"><div className="flex items-center justify-around h-16 px-space-sm max-w-md mx-auto"><a className="flex flex-col items-center justify-center flex-1 h-full py-1 text-on-surface-variant hover:text-on-surface transition-colors min-h-[48px]" href="#" onClick={(e) => { e.preventDefault(); navigate("/"); }}><span className="material-symbols-outlined text-[24px]">translate</span><span className="font-label-sm text-label-sm mt-0.5">Traduzir</span></a><a className="flex flex-col items-center justify-center flex-1 h-full py-1 text-on-surface-variant hover:text-on-surface transition-colors min-h-[48px]" href="#" onClick={(e) => { e.preventDefault(); navigate("/historico"); }}><span className="material-symbols-outlined text-[24px]">history</span><span className="font-label-sm text-label-sm mt-0.5">Histórico</span></a><a className="flex flex-col items-center justify-center flex-1 h-full py-1 text-on-surface-variant hover:text-on-surface transition-colors min-h-[48px]" href="#" onClick={(e) => { e.preventDefault(); navigate("/configuracoes"); }}><span className="material-symbols-outlined text-[24px]">settings</span><span className="font-label-sm text-label-sm mt-0.5">Configurações</span></a></div></nav>
    </>
  );
}
