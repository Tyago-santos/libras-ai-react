/**
 * Avatar do tradutor de Libras — render 3D do Stitch com profundidade melhorada:
 * anéis pulsantes, moldura com gradiente animado, brilho e flutuação suave.
 *
 * Props:
 * - src: imagem 3D do avatar
 * - alt: texto alternativo
 * - status: "parado" | "sinalizando" (controla anéis e brilho)
 * - height: classe de altura (padrão h-72)
 * - chip: conteúdo exibido no canto inferior direito
 */
export default function AvatarSinalizante({
  src,
  alt = "Avatar 3D sinalizando em Libras",
  status = "sinalizando",
  height = "h-72",
  chip = "Espaço Neutro",
}) {
  const sinalizando = status === "sinalizando";

  return (
    <div className={`relative w-full ${height} flex items-center justify-center overflow-hidden`}>
      {/* Brilho ambiente de fundo (profundidade) */}
      <div
        aria-hidden="true"
        className={`absolute w-56 h-56 rounded-full blur-3xl transition-opacity duration-700 ${
          sinalizando ? "bg-primary/25 opacity-100 animate-pulse" : "bg-primary/10 opacity-60"
        }`}
      />

      {/* Moldura arredondada com gradiente e profundidade */}
      <div className="relative w-44 h-56 md:w-52 md:h-64 rounded-3xl overflow-hidden shadow-avatar-glow ring-1 ring-primary/15 animate-avatar-float">
        {/* Anel pulsante (movimento das mãos) */}
        {sinalizando && (
          <>
            <span
              aria-hidden="true"
              className="absolute -inset-2 rounded-[2rem] border-2 border-primary-container/40 animate-pulse-ring"
            />
            <span
              aria-hidden="true"
              className="absolute -inset-2 rounded-[2rem] border-2 border-primary-container/30 animate-pulse-ring"
              style={{ animationDelay: "0.8s" }}
            />
          </>
        )}
        <img
          className="w-full h-full object-cover object-top select-none pointer-events-none"
          src={src}
          alt={alt}
        />
        {/* Sombra interna para dar volume ao rosto/torso */}
        <div
          aria-hidden="true"
          className="absolute inset-0 shadow-[inset_0_-24px_32px_-20px_rgba(0,23,74,0.45)] pointer-events-none"
        />
      </div>

      {/* Indicador do espaço de sinalização */}
      {chip && (
        <div className="absolute bottom-6 right-6 pointer-events-none flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container-lowest/85 backdrop-blur-md shadow-sm ring-1 ring-surface-container-high/50">
          <span
            className={`material-symbols-outlined text-[14px] ${
              sinalizando ? "text-primary animate-pulse" : "text-on-surface-variant"
            }`}
          >
            {sinalizando ? "motion_photos_on" : "panorama_fish_eye"}
          </span>
          <span className="font-label-sm text-label-sm text-on-surface-variant">{chip}</span>
        </div>
      )}
    </div>
  );
}
