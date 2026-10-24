import { NavLink } from "react-router-dom";

/**
 * Barra de navegação lateral do desktop (>= 1024px).
 * Substitui o header fixo e a bottom nav das telas neste breakpoint
 * (ambos são ocultados via CSS em index.css).
 */
const navItems = [
  { to: "/", icon: "translate", label: "Traduzir", end: true },
  { to: "/historico", icon: "history", label: "Histórico" },
  { to: "/sessoes", icon: "forum", label: "Sessões" },
  { to: "/configuracoes", icon: "settings", label: "Configurações" },
  { to: "/acessibilidade", icon: "accessibility_new", label: "Acessibilidade" },
];

export default function DesktopSidebar() {
  return (
    <aside
      aria-label="Navegação lateral"
      className="hidden lg:flex fixed inset-y-0 left-0 w-64 z-[60] bg-surface-container-lowest border-r border-outline-variant/40 flex-col"
    >
      {/* Marca */}
      <div className="h-16 px-5 flex items-center gap-space-sm border-b border-outline-variant/40 shrink-0">
        <div className="w-9 h-9 rounded-xl bg-primary-container flex items-center justify-center">
          <span className="material-symbols-outlined text-on-primary-container text-[22px]">
            sign_language
          </span>
        </div>
        <div className="flex flex-col">
          <span className="font-headline-sm text-headline-sm text-on-surface leading-tight tracking-tight">
            Libras AI
          </span>
          <span className="font-label-sm text-label-sm text-on-surface-variant leading-tight">
            Português para Libras
          </span>
        </div>
      </div>

      {/* Links */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto" aria-label="Navegação principal">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl min-h-[44px] transition-colors font-label-md text-label-md ${
                isActive
                  ? "bg-primary-container text-on-primary-container font-semibold shadow-sm"
                  : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
              }`
            }
          >
            <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Rodapé: status + perfil */}
      <div className="px-4 py-4 border-t border-outline-variant/40 flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-1.5 bg-surface-container-low px-2.5 py-1.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
          <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">
            Online
          </span>
        </div>
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
        </div>
      </div>
    </aside>
  );
}
