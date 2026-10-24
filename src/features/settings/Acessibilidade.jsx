import { useNavigate } from "react-router-dom";
import { selectPalette, setAvatarSpeed, setTextSize, toggleSwitch, triggerNativeToast } from "../../shared/interactions.js";

export default function Acessibilidade() {
  const navigate = useNavigate();

  return (
    <>
<header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="h-16 px-margin flex items-center justify-between"><div className="flex items-center gap-space-sm"><div className="w-9 h-9 rounded-xl bg-primary-container flex items-center justify-center"><span className="material-symbols-outlined text-on-primary-container text-[22px]">sign_language</span></div><div className="flex flex-col"><span className="font-headline-sm text-headline-sm text-on-surface leading-tight tracking-tight">Libras AI</span><span className="font-label-sm text-label-sm text-on-surface-variant leading-tight">Português para Libras</span></div></div><div className="flex items-center gap-space-sm"><a aria-label="Configurações" className="w-11 h-11 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container transition-colors" href="#" onClick={(e) => { e.preventDefault(); navigate("/configuracoes"); }}><span className="material-symbols-outlined text-[22px]">settings</span></a><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></div></header><main className="flex-1 flex flex-col relative w-full pt-16 pb-20 bg-surface"><div className="flex flex-col w-full px-margin pb-space-xl space-y-space-md lg:max-w-3xl lg:mx-auto">
<div className="w-full bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex items-center gap-space-md mt-space-sm">
<div className="w-12 h-12 rounded-xl bg-secondary-container flex items-center justify-center shrink-0 text-on-secondary-container">
<span className="material-symbols-outlined text-[28px]" style={{fontVariationSettings: "'FILL' 1"}}>tune</span>
</div>
<div className="flex flex-col min-w-0 flex-1">
<h2 className="font-headline-sm text-headline-sm text-on-surface truncate">Configurações & Acessibilidade</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant truncate">Personalize sua experiência com Libras AI</p>
</div>
<div className="px-space-sm py-0.5 rounded-full bg-surface-container flex items-center gap-1 shrink-0">
<span className="w-2 h-2 rounded-full bg-tertiary"></span>
<span className="font-label-sm text-label-sm text-tertiary">Ativo</span>
</div>
</div>
<section className="space-y-space-xs">
<div className="flex items-center gap-space-xs px-1">
<span className="material-symbols-outlined text-primary text-[20px]">accessibility_new</span>
<h3 className="font-label-lg text-label-lg text-on-surface">Acessibilidade</h3>
</div>
<div className="bg-surface-container-lowest rounded-xl shadow-sm p-space-md space-y-space-md">
<div className="space-y-space-xs">
<div className="flex items-center justify-between">
<label className="font-label-md text-label-md text-on-surface">Tamanho do texto na tela</label>
<span className="font-label-sm text-label-sm text-primary" id="font-size-label">Padrão</span>
</div>
<div className="grid grid-cols-3 gap-space-xs bg-surface-container-low p-1 rounded-xl">
<button className="font-size-btn min-h-[44px] rounded-lg font-label-md text-label-md transition-all flex items-center justify-center bg-primary-container text-on-primary-container shadow-xs" onClick={(e) => setTextSize('padrao', e.currentTarget)} type="button">
            Padrão
          </button>
<button className="font-size-btn min-h-[44px] rounded-lg font-label-md text-label-md transition-all flex items-center justify-center text-on-surface-variant hover:text-on-surface" onClick={(e) => setTextSize('grande', e.currentTarget)} type="button">
            Grande
          </button>
<button className="font-size-btn min-h-[44px] rounded-lg font-label-md text-label-md transition-all flex items-center justify-center text-on-surface-variant hover:text-on-surface" onClick={(e) => setTextSize('muito-grande', e.currentTarget)} type="button">
            Muito Grande
          </button>
</div>
</div>
<div className="w-full h-px bg-surface-container"></div>
<div className="flex items-center justify-between min-h-[48px] gap-space-sm">
<div className="flex flex-col min-w-0 pr-space-xs">
<span className="font-label-md text-label-md text-on-surface">Redução de movimento</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Suaviza animações da interface para evitar desconforto</span>
</div>
<button aria-checked="true" className="w-14 h-8 bg-primary rounded-full relative p-1 transition-colors shrink-0" onClick={(e) => toggleSwitch(e.currentTarget)} role="switch" type="button">
<div className="w-6 h-6 bg-on-primary rounded-full shadow-sm transform translate-x-6 transition-transform"></div>
</button>
</div>
<div className="w-full h-px bg-surface-container"></div>
<div className="flex items-center justify-between min-h-[48px] gap-space-sm">
<div className="flex flex-col min-w-0 pr-space-xs">
<span className="font-label-md text-label-md text-on-surface">Resposta tátil (vibração)</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Vibra ao captar voz e ao finalizar sinais de tradução</span>
</div>
<button aria-checked="true" className="w-14 h-8 bg-primary rounded-full relative p-1 transition-colors shrink-0" onClick={(e) => toggleSwitch(e.currentTarget)} role="switch" type="button">
<div className="w-6 h-6 bg-on-primary rounded-full shadow-sm transform translate-x-6 transition-transform"></div>
</button>
</div>
<div className="w-full h-px bg-surface-container"></div>
<div className="flex items-center justify-between min-h-[48px] gap-space-sm">
<div className="flex flex-col min-w-0 pr-space-xs">
<span className="font-label-md text-label-md text-on-surface">Alto contraste nas legendas</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Fundo preto com texto amarelo puro para máxima leitura</span>
</div>
<button aria-checked="false" className="w-14 h-8 bg-surface-variant rounded-full relative p-1 transition-colors shrink-0" onClick={(e) => toggleSwitch(e.currentTarget)} role="switch" type="button">
<div className="w-6 h-6 bg-on-primary rounded-full shadow-sm transform translate-x-0 transition-transform"></div>
</button>
</div>
</div>
</section>
<section className="space-y-space-xs">
<div className="flex items-center gap-space-xs px-1">
<span className="material-symbols-outlined text-primary text-[20px]">smart_toy</span>
<h3 className="font-label-lg text-label-lg text-on-surface">Avatar e Tradução</h3>
</div>
<div className="bg-surface-container-lowest rounded-xl shadow-sm p-space-md space-y-space-md">
<div className="space-y-space-xs">
<div className="flex items-center justify-between">
<label className="font-label-md text-label-md text-on-surface">Velocidade de sinalização</label>
<span className="font-label-sm text-label-sm text-primary font-bold" id="speed-indicator">1.0x (Normal)</span>
</div>
<div className="grid grid-cols-3 gap-space-xs bg-surface-container-low p-1 rounded-xl">
<button className="speed-btn min-h-[44px] rounded-lg font-label-md text-label-md transition-all flex items-center justify-center text-on-surface-variant hover:text-on-surface" onClick={(e) => setAvatarSpeed('0.75x', '0.75x (Lenta)', e.currentTarget)} type="button">
            0.75x
          </button>
<button className="speed-btn min-h-[44px] rounded-lg font-label-md text-label-md transition-all flex items-center justify-center bg-primary-container text-on-primary-container shadow-xs" onClick={(e) => setAvatarSpeed('1.0x', '1.0x (Normal)', e.currentTarget)} type="button">
            1.0x
          </button>
<button className="speed-btn min-h-[44px] rounded-lg font-label-md text-label-md transition-all flex items-center justify-center text-on-surface-variant hover:text-on-surface" onClick={(e) => setAvatarSpeed('1.25x', '1.25x (Rápida)', e.currentTarget)} type="button">
            1.25x
          </button>
</div>
</div>
<div className="w-full h-px bg-surface-container"></div>
<div className="space-y-space-xs">
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface">Fundo do palco 3D</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Destaque visual para percepção espacial dos dedos</span>
</div>
<div className="grid grid-cols-3 gap-space-sm pt-1">
<button className="palette-option flex flex-col items-center gap-1 p-2 rounded-xl bg-surface-container-high ring-2 ring-primary transition-all" onClick={(e) => selectPalette('claro', e.currentTarget)} type="button">
<span className="w-full h-8 rounded-lg bg-surface shadow-inner"></span>
<span className="font-label-sm text-label-sm text-on-surface font-semibold">Claro</span>
</button>
<button className="palette-option flex flex-col items-center gap-1 p-2 rounded-xl bg-surface-container transition-all" onClick={(e) => selectPalette('escuro', e.currentTarget)} type="button">
<span className="w-full h-8 rounded-lg bg-inverse-surface shadow-inner"></span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Escuro</span>
</button>
<button className="palette-option flex flex-col items-center gap-1 p-2 rounded-xl bg-surface-container transition-all" onClick={(e) => selectPalette('azul', e.currentTarget)} type="button">
<span className="w-full h-8 rounded-lg bg-secondary shadow-inner"></span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Neutro</span>
</button>
</div>
</div>
</div>
</section>
<section className="space-y-space-xs">
<div className="flex items-center gap-space-xs px-1">
<span className="material-symbols-outlined text-primary text-[20px]">security</span>
<h3 className="font-label-lg text-label-lg text-on-surface">Privacidade & Permissões</h3>
</div>
<div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
<a className="flex items-center justify-between p-space-md hover:bg-surface-container-low transition-colors min-h-[56px]" href="#" onClick={(e) => { e.preventDefault(); triggerNativeToast('Abrindo ajustes de permissão do Android...'); }}>
<div className="flex items-center gap-space-md min-w-0 pr-space-xs">
<div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[22px]">mic</span>
</div>
<div className="flex flex-col min-w-0">
<span className="font-label-md text-label-md text-on-surface">Permissão de Microfone</span>
<span className="font-body-sm text-body-sm text-tertiary font-semibold flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
              Permitido durante o uso
            </span>
</div>
</div>
<span className="material-symbols-outlined text-outline text-[20px] shrink-0">chevron_right</span>
</a>
<div className="w-full h-px bg-surface-container"></div>
<div className="flex items-center gap-space-md p-space-md min-h-[56px]">
<div className="w-10 h-10 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[22px]">lock</span>
</div>
<div className="flex flex-col min-w-0 flex-1">
<span className="font-label-md text-label-md text-on-surface">Processamento de Voz</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">IA com criptografia de ponta a ponta</span>
</div>
<div className="px-2 py-1 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm shrink-0">
          Seguro
        </div>
</div>
<div className="w-full h-px bg-surface-container"></div>
<a className="flex items-center justify-between p-space-md hover:bg-surface-container-low transition-colors min-h-[56px]" href="#" onClick={(e) => { e.preventDefault(); triggerNativeToast('Exibindo Termos de Privacidade'); }}>
<div className="flex items-center gap-space-md min-w-0 pr-space-xs">
<div className="w-10 h-10 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[22px]">policy</span>
</div>
<div className="flex flex-col min-w-0">
<span className="font-label-md text-label-md text-on-surface">Política de Privacidade & Termos</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Como seus dados e sinais são resguardados</span>
</div>
</div>
<span className="material-symbols-outlined text-outline text-[20px] shrink-0">open_in_new</span>
</a>
</div>
</section>
<div className="flex flex-col items-center justify-center pt-space-md space-y-space-xs text-center">
<div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center shadow-xs">
<span className="material-symbols-outlined text-[24px]">sign_language</span>
</div>
<div className="flex flex-col">
<span className="font-headline-sm text-headline-sm text-on-surface">Libras AI</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Versão 1.0.0 (Build 42)</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant max-w-xs mt-1">
      Compatível com a tecnologia aberta e dicionários do <span className="font-semibold text-primary">VLibras</span>. Promovendo inclusão e acessibilidade para toda comunidade surda.
    </p>
</div>
<div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface px-space-md py-space-sm rounded-full shadow-lg font-label-md text-label-md opacity-0 pointer-events-none transition-all duration-300 z-50 flex items-center gap-space-xs" id="settings-toast">
<span className="material-symbols-outlined text-[18px] text-tertiary-fixed">check_circle</span>
<span id="toast-message">Preferência atualizada</span>
</div>
</div>
</main><nav className="fixed bottom-0 w-full z-50 pb-safe bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_-2px_12px_rgba(23,43,58,0.06)]" data-active-classes="text-primary-container font-semibold"><div className="flex items-center justify-around h-16 px-space-sm max-w-md mx-auto"><a className="flex flex-col items-center justify-center flex-1 h-full py-1 text-on-surface-variant hover:text-on-surface transition-colors min-h-[48px]" href="#" onClick={(e) => { e.preventDefault(); navigate("/"); }}><span className="material-symbols-outlined text-[24px]">translate</span><span className="font-label-sm text-label-sm mt-0.5">Traduzir</span></a><a className="flex flex-col items-center justify-center flex-1 h-full py-1 text-on-surface-variant hover:text-on-surface transition-colors min-h-[48px]" href="#" onClick={(e) => { e.preventDefault(); navigate("/historico"); }}><span className="material-symbols-outlined text-[24px]">history</span><span className="font-label-sm text-label-sm mt-0.5">Histórico</span></a><a className="flex flex-col items-center justify-center flex-1 h-full py-1 text-on-surface-variant hover:text-on-surface transition-colors min-h-[48px]" href="#" onClick={(e) => { e.preventDefault(); navigate("/configuracoes"); }}><span className="material-symbols-outlined text-[24px]">settings</span><span className="font-label-sm text-label-sm mt-0.5">Configurações</span></a></div></nav>
    </>
  );
}
