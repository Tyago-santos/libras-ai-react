import { useNavigate } from "react-router-dom";
import { setSpeed, setTextSizeCompact, toggleSwitchDot } from "../../shared/interactions.js";

export default function Configuracoes() {
  const navigate = useNavigate();

  return (
    <>
<header className="fixed top-0 inset-x-0 z-50 bg-surface/90 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="h-16 px-margin flex items-center justify-between"><div className="flex items-center gap-space-sm"><div className="w-9 h-9 rounded-xl bg-primary-container flex items-center justify-center"><span className="material-symbols-outlined text-on-primary-container text-[22px]">sign_language</span></div><span className="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight">Libras AI</span><span className="font-label-sm text-label-sm text-on-surface-variant hidden sm:inline-block ml-space-xs">• Configurações</span></div><div className="flex items-center gap-space-sm"><div aria-label="Perfil de Usuário" className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></div></header><main className="flex flex-col relative w-full pt-16 pb-24 bg-surface min-h-screen"><div className="flex flex-col w-full px-margin pb-space-xl lg:max-w-3xl lg:mx-auto">
<header className="pt-space-sm pb-space-md">
<div className="inline-flex items-center gap-space-xs bg-secondary-container/40 text-on-secondary-container px-3 py-1 rounded-full mb-space-xs">
<span className="material-symbols-outlined text-[16px]">tune</span>
<span className="font-label-sm text-label-sm">Preferências do Sistema</span>
</div>
<h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Configurações</h1>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Acessibilidade e preferências de uso do Libras AI</p>
</header>
<section className="mb-space-lg flex flex-col gap-space-sm">
<div className="flex items-center gap-space-xs px-1">
<span className="material-symbols-outlined text-primary text-[20px]">visibility</span>
<h2 className="font-headline-sm text-headline-sm text-on-surface">Acessibilidade e Visualização</h2>
</div>
<div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-md">
<div className="flex flex-col gap-space-xs">
<div className="flex justify-between items-center">
<span className="font-label-lg text-label-lg text-on-surface">Tamanho do Texto</span>
<span className="font-label-sm text-label-sm text-primary bg-primary/10 px-2 py-0.5 rounded-full" id="text-size-label">Padrão</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">Ajusta o contraste e legibilidade das transcrições</p>
<div aria-label="Tamanho do Texto" className="grid grid-cols-3 gap-2 bg-surface-container-low p-1.5 rounded-lg mt-1" role="radiogroup">
<button aria-checked="true" className="size-btn py-2 px-3 rounded-md font-label-md text-label-md text-on-primary bg-primary shadow-sm flex items-center justify-center transition-all" onClick={(e) => setTextSizeCompact('padrao', e.currentTarget)} role="radio" type="button">
            Padrão
          </button>
<button aria-checked="false" className="size-btn py-2 px-3 rounded-md font-label-md text-label-md text-on-surface-variant hover:text-on-surface bg-transparent flex items-center justify-center transition-all" onClick={(e) => setTextSizeCompact('grande', e.currentTarget)} role="radio" type="button">
            Grande
          </button>
<button aria-checked="false" className="size-btn py-2 px-3 rounded-md font-label-md text-label-md text-on-surface-variant hover:text-on-surface bg-transparent flex items-center justify-center transition-all" onClick={(e) => setTextSizeCompact('extra', e.currentTarget)} role="radio" type="button">
            Extra
          </button>
</div>
</div>
<div className="h-px bg-surface-container-high w-full"></div>
<div className="flex items-center justify-between min-h-[48px]">
<div className="flex flex-col pr-2">
<label className="font-label-lg text-label-lg text-on-surface cursor-pointer" for="toggle-reduced-motion">Redução de Animações</label>
<span className="font-body-sm text-body-sm text-on-surface-variant">Evita movimentos intensos na navegação</span>
</div>
<button aria-checked="false" className="w-14 h-8 bg-surface-container-highest rounded-full p-1 transition-colors relative flex items-center shrink-0" id="toggle-reduced-motion" onClick={(e) => toggleSwitchDot(e.currentTarget)} role="switch" type="button">
<span className="dot w-6 h-6 rounded-full bg-surface-container-lowest shadow-sm transition-transform duration-200 ease-in-out translate-x-0"></span>
</button>
</div>
<div className="h-px bg-surface-container-high w-full"></div>
<div className="flex items-center justify-between min-h-[48px]">
<div className="flex flex-col pr-2">
<label className="font-label-lg text-label-lg text-on-surface cursor-pointer" for="toggle-high-contrast">Alto Contraste de Interface</label>
<span className="font-body-sm text-body-sm text-on-surface-variant">Linhas visíveis e contornos nítidos para baixa visão</span>
</div>
<button aria-checked="true" className="w-14 h-8 bg-primary rounded-full p-1 transition-colors relative flex items-center shrink-0" id="toggle-high-contrast" onClick={(e) => toggleSwitchDot(e.currentTarget)} role="switch" type="button">
<span className="dot w-6 h-6 rounded-full bg-on-primary shadow-sm transition-transform duration-200 ease-in-out translate-x-6"></span>
</button>
</div>
<div className="h-px bg-surface-container-high w-full"></div>
<div className="flex flex-col gap-space-xs">
<div className="flex justify-between items-center">
<span className="font-label-lg text-label-lg text-on-surface">Velocidade dos Sinais (Avatar)</span>
<span className="font-label-sm text-label-sm text-tertiary bg-tertiary/10 px-2 py-0.5 rounded-full" id="speed-label">1.0x Normal</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">Ritmo da gesticulação em Libras no visor 3D</p>
<div aria-label="Velocidade dos Sinais" className="grid grid-cols-3 gap-2 bg-surface-container-low p-1.5 rounded-lg mt-1" role="radiogroup">
<button aria-checked="false" className="speed-btn py-2 px-3 rounded-md font-label-md text-label-md text-on-surface-variant hover:text-on-surface bg-transparent flex items-center justify-center transition-all" onClick={(e) => setSpeed('0.75x Lenta', e.currentTarget)} role="radio" type="button">
            0.75x
          </button>
<button aria-checked="true" className="speed-btn py-2 px-3 rounded-md font-label-md text-label-md text-on-primary bg-primary shadow-sm flex items-center justify-center transition-all" onClick={(e) => setSpeed('1.0x Normal', e.currentTarget)} role="radio" type="button">
            1.0x
          </button>
<button aria-checked="false" className="speed-btn py-2 px-3 rounded-md font-label-md text-label-md text-on-surface-variant hover:text-on-surface bg-transparent flex items-center justify-center transition-all" onClick={(e) => setSpeed('1.25x Rápida', e.currentTarget)} role="radio" type="button">
            1.25x
          </button>
</div>
</div>
</div>
</section>
<section className="mb-space-lg flex flex-col gap-space-sm">
<div className="flex items-center gap-space-xs px-1">
<span className="material-symbols-outlined text-primary text-[20px]">mic</span>
<h2 className="font-headline-sm text-headline-sm text-on-surface">Áudio e Reconhecimento de Voz</h2>
</div>
<div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-md">
<div className="flex items-center justify-between min-h-[48px]">
<div className="flex flex-col pr-2">
<label className="font-label-lg text-label-lg text-on-surface cursor-pointer" for="toggle-audio-feedback">Feedback Sonoro</label>
<span className="font-body-sm text-body-sm text-on-surface-variant">Bipe discreto ao iniciar e finalizar escuta</span>
</div>
<button aria-checked="true" className="w-14 h-8 bg-primary rounded-full p-1 transition-colors relative flex items-center shrink-0" id="toggle-audio-feedback" onClick={(e) => toggleSwitchDot(e.currentTarget)} role="switch" type="button">
<span className="dot w-6 h-6 rounded-full bg-on-primary shadow-sm transition-transform duration-200 ease-in-out translate-x-6"></span>
</button>
</div>
<div className="h-px bg-surface-container-high w-full"></div>
<div className="flex items-center justify-between min-h-[48px]">
<div className="flex flex-col pr-2">
<label className="font-label-lg text-label-lg text-on-surface cursor-pointer" for="toggle-haptic">Vibração Tátil (Háptico)</label>
<span className="font-body-sm text-body-sm text-on-surface-variant">Vibra suavemente ao apertar o microfone</span>
</div>
<button aria-checked="true" className="w-14 h-8 bg-primary rounded-full p-1 transition-colors relative flex items-center shrink-0" id="toggle-haptic" onClick={(e) => toggleSwitchDot(e.currentTarget)} role="switch" type="button">
<span className="dot w-6 h-6 rounded-full bg-on-primary shadow-sm transition-transform duration-200 ease-in-out translate-x-6"></span>
</button>
</div>
<div className="h-px bg-surface-container-high w-full"></div>
<div className="flex items-center justify-between py-1 min-h-[48px]">
<div className="flex flex-col pr-2">
<span className="font-label-lg text-label-lg text-on-surface">Sensibilidade do Microfone</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Calibrado para diálogo presencial e clareza acústica</span>
</div>
<div className="flex items-center gap-1.5 px-3 py-1 bg-surface-container-high rounded-full shrink-0">
<span className="w-2 h-2 rounded-full bg-tertiary"></span>
<span className="font-label-sm text-label-sm text-on-surface">Otimizada</span>
</div>
</div>
</div>
</section>
<section className="mb-space-lg flex flex-col gap-space-sm">
<div className="flex items-center gap-space-xs px-1">
<span className="material-symbols-outlined text-primary text-[20px]">security</span>
<h2 className="font-headline-sm text-headline-sm text-on-surface">Privacidade e Sistema</h2>
</div>
<div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col">
<a className="flex items-center justify-between p-space-md hover:bg-surface-container-low transition-colors min-h-[56px]" href="#privacidade-dados">
<div className="flex items-center gap-3">
<div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-primary text-[20px]">cloud_done</span>
</div>
<div className="flex flex-col">
<span className="font-label-lg text-label-lg text-on-surface">Processamento de Dados</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Áudio não é gravado nem armazenado</span>
</div>
</div>
<span className="material-symbols-outlined text-on-surface-variant text-[20px]">chevron_right</span>
</a>
<div className="h-px bg-surface-container-high mx-space-md"></div>
<a className="flex items-center justify-between p-space-md hover:bg-surface-container-low transition-colors min-h-[56px]" href="#permissoes">
<div className="flex items-center gap-3">
<div className="w-9 h-9 rounded-full bg-tertiary/10 flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-tertiary text-[20px]">check_circle</span>
</div>
<div className="flex flex-col">
<span className="font-label-lg text-label-lg text-on-surface">Permissões do Microfone</span>
<span className="font-body-sm text-body-sm text-tertiary font-semibold">Status: Concedido com Sucesso</span>
</div>
</div>
<span className="material-symbols-outlined text-on-surface-variant text-[20px]">chevron_right</span>
</a>
<div className="h-px bg-surface-container-high mx-space-md"></div>
<a className="flex items-center justify-between p-space-md hover:bg-surface-container-low transition-colors min-h-[56px]" href="#termos">
<div className="flex items-center gap-3">
<div className="w-9 h-9 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-on-secondary-container text-[20px]">description</span>
</div>
<div className="flex flex-col">
<span className="font-label-lg text-label-lg text-on-surface">Termos de Uso e Privacidade</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Diretrizes de conformidade LGPD</span>
</div>
</div>
<span className="material-symbols-outlined text-on-surface-variant text-[20px]">open_in_new</span>
</a>
</div>
</section>
<footer className="mt-space-sm mb-space-md text-center flex flex-col items-center gap-1">
<div className="inline-flex items-center gap-1 text-on-surface-variant">
<span className="material-symbols-outlined text-[16px] text-primary">verified</span>
<span className="font-label-sm text-label-sm font-semibold">Libras AI • Versão 1.0.0 (Build 24)</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">Motor de Glosas e Dicionário Nacional VLibras Integrável</p>
</footer>
</div>
</main><nav className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_-2px_12px_rgba(23,43,58,0.06)]" data-active-classes="text-primary bg-primary/10"><div className="flex justify-around items-center h-16 px-space-sm"><a className="flex flex-col items-center justify-center gap-0.5 px-space-md py-1 rounded-full text-on-surface-variant hover:text-on-surface transition-colors min-w-[64px] min-h-[48px]" href="#" onClick={(e) => { e.preventDefault(); navigate("/"); }}><span className="material-symbols-outlined text-[24px]">sign_language</span><span className="font-label-sm text-label-sm">Traduzir</span></a><a className="flex flex-col items-center justify-center gap-0.5 px-space-md py-1 rounded-full text-on-surface-variant hover:text-on-surface transition-colors min-w-[64px] min-h-[48px]" href="#" onClick={(e) => { e.preventDefault(); navigate("/historico"); }}><span className="material-symbols-outlined text-[24px]">history</span><span className="font-label-sm text-label-sm">Histórico</span></a><a className="flex flex-col items-center justify-center gap-0.5 px-space-md py-1 rounded-full text-on-surface-variant hover:text-on-surface transition-colors min-w-[64px] min-h-[48px]" href="#" onClick={(e) => { e.preventDefault(); navigate("/configuracoes"); }}><span className="material-symbols-outlined text-[24px]">settings</span><span className="font-label-sm text-label-sm">Ajustes</span></a></div></nav>
    </>
  );
}
