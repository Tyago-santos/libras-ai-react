import { Routes, Route, Navigate } from "react-router-dom";
import DesktopSidebar from "./components/DesktopSidebar.jsx";
import {
  TraduzirProntoParaOuvir,
  TraduzirOuvindoFala,
  TraduzirAvatarSinalizando,
} from "../features/translation/index.js";
import { HistoricoConversas } from "../features/history/index.js";
import { Configuracoes, Acessibilidade } from "../features/settings/index.js";

export default function App() {
  return (
    <div className="min-h-dvh bg-background">
      {/* Navegação lateral — apenas desktop (>= 1024px) */}
      <DesktopSidebar />

      {/* Mobile/tablet: coluna centralizada (max-w-md/md). Desktop: área ao lado da sidebar */}
      <div className="lg:pl-64">
        <div className="w-full max-w-md md:max-w-2xl lg:max-w-5xl mx-auto relative">
          <Routes>
            {/* Fluxo de tradução por voz */}
            <Route path="/" element={<TraduzirProntoParaOuvir />} />
            <Route path="/ouvindo-fala" element={<TraduzirOuvindoFala />} />
            <Route path="/avatar-sinalizando" element={<TraduzirAvatarSinalizando />} />

            {/* Histórico */}
            <Route path="/historico" element={<HistoricoConversas />} />
            <Route path="/sessoes" element={<Navigate to="/historico" replace />} />

            {/* Configurações */}
            <Route path="/configuracoes" element={<Configuracoes />} />
            <Route path="/acessibilidade" element={<Acessibilidade />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
