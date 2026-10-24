import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSpeechRecognition, useMicLevel } from "../speech";
import { useVlibrasPlayer } from "../avatar";

/**
 * Escuta com tradução EM TEMPO REAL:
 * - Web Speech API (pt-BR) transcreve enquanto você fala;
 * - cada frase finalizada entra numa fila e é sinalizada pelo avatar
 *   assim que ele fica livre (sem interromper o sinal em andamento);
 * - interim (parcial) aparece na tela para feedback imediato.
 */
export default function TraduzirOuvindoFala() {
  const navigate = useNavigate();
  const speech = useSpeechRecognition();
  const player = useVlibrasPlayer();
  const level = useMicLevel(speech.listening);

  /** Quantos caracteres do finalText já foram para a fila. */
  const consumedRef = useRef(0);
  /** Frases finalizadas aguardando o avatar ficar livre. */
  const queueRef = useRef([]);
  const [filaCount, setFilaCount] = useState(0);

  // Ditado REAL ao entrar na tela (Web Speech API pt-BR).
  // Ao sair, libera o microfone.
  useEffect(() => {
    speech.start();
    return () => speech.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const transcript = [speech.finalText, speech.interim]
    .filter(Boolean)
    .join(" ")
    .trim();

  const temErro = Boolean(speech.error) || !speech.supported;

  const chipLabel = !speech.supported
    ? "Ditado indisponível"
    : speech.error
      ? "Microfone indisponível"
      : speech.listening
        ? "Ouvindo você..."
        : speech.paused || speech.stopped
          ? "Captação pausada"
          : "Iniciando ditado…";

  // Toda fala FINALIZADA pelo reconhecimento vira uma frase da fila.
  useEffect(() => {
    if (speech.finalText.length < consumedRef.current) {
      consumedRef.current = 0; // transcrição foi limpa
    }
    const delta = speech.finalText.slice(consumedRef.current).trim();
    if (delta) {
      consumedRef.current = speech.finalText.length;
      queueRef.current.push(delta);
      setFilaCount(queueRef.current.length);
    }
  }, [speech.finalText]);

  // Assim que o avatar fica livre, sinaliza a próxima frase da fila.
  useEffect(() => {
    if (player.status === "pronto" && queueRef.current.length > 0) {
      const proxima = queueRef.current.shift();
      setFilaCount(queueRef.current.length);
      player.sign(proxima);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player.status, speech.finalText]);

  const toggleMic = () => {
    if (speech.listening) {
      speech.stop();
    } else {
      speech.start({ keepText: true });
    }
  };

  const irParaTexto = () => navigate("/", { state: { focusText: true } });

  return (
    <>
<header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="h-16 px-margin flex items-center justify-between"><div className="flex items-center gap-space-sm"><div className="w-9 h-9 rounded-xl bg-primary-container flex items-center justify-center"><span className="material-symbols-outlined text-on-primary-container text-[22px]">sign_language</span></div><div className="flex flex-col"><span className="font-headline-sm text-headline-sm text-on-surface leading-tight tracking-tight">Libras AI</span><span className="font-label-sm text-label-sm text-on-surface-variant leading-tight">Português para Libras</span></div></div><div className="flex items-center gap-space-sm"><a aria-label="Configurações" className="w-11 h-11 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container transition-colors" href="#" onClick={(e) => { e.preventDefault(); navigate("/configuracoes"); }}><span className="material-symbols-outlined text-[22px]">settings</span></a><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></div></header><main className="flex-1 flex flex-col relative w-full pt-16 pb-20 bg-surface"><div className="flex flex-col w-full px-margin space-y-space-sm sm:space-y-space-md lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
<section className="relative w-full h-[260px] sm:h-[320px] lg:h-auto lg:row-span-2 rounded-xl bg-surface-container-lowest shadow-sm overflow-hidden flex flex-col items-center justify-end">
{/* Luz ambiente 3D atrás do avatar */}
<div aria-hidden="true" className="absolute top-10 left-1/2 -translate-x-1/2 w-44 h-44 rounded-full bg-primary-container/25 blur-3xl animate-pulse pointer-events-none"></div>
<img alt="Digital 3D rendered avatar character representing Brazilian Sign Language VLibras interpreter, upper torso and clear expressive hands poised attentively in ready position. Neutral soft studio background with minimal cool blue rim lighting, clean modern aesthetic, high visual accessibility focus on facial grammar and hand shape." className={`absolute inset-0 w-full h-full object-cover object-top animate-avatar-breathe ${player.loaded ? "hidden" : ""}`} src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqrV6fgGCt93g8QsqdI8MjDNALzujN8KaqMVE4FJyEqOp3njZ5QeBMxQRKxg7kxm15-9aJXLdzGUefF_TDZwz7v6qsHrw68ZZU0Y8JccNJsn479Ji9EVIK5oEBzeKeV8oSQTO7LcVXSbGPs8r2XaE6F4zU-ybn4nVSFWJuTgeyUk8iy8cqSf7O5S9GJn543RwUpaDCBOTUoJ-ILE6cRuXzH0wwb81jjw5KkrRN04dfWouMUYVYEP8"/>
{/* Player Unity WebGL oficial (VLibras) — sinaliza ao vivo enquanto você fala */}
<iframe ref={player.iframeRef} title="Avatar VLibras 3D" src="/vlibras-unity/index.html" allow="autoplay" className={`absolute inset-0 w-full h-full border-0 transition-opacity duration-500 ${player.loaded ? "opacity-100" : "opacity-0"}`}></iframe>
<div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-surface-container-lowest/40 pointer-events-none"></div>
{/* Sombra volumétrica inferior */}
<div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-surface-container-lowest/80 to-transparent pointer-events-none"></div>
<div className="absolute top-space-sm right-space-sm flex items-center gap-space-xs z-10">
<button aria-label="Ajustar velocidade de reprodução" className="h-9 px-3 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-on-surface shadow-sm flex items-center justify-center font-label-sm text-label-sm hover:bg-surface-container transition-colors" id="speedBtn" type="button">
<span className="text-primary font-bold">1.0x</span>
</button>
<button aria-label="Recentralizar visualização do avatar" className="w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-on-surface-variant shadow-sm flex items-center justify-center hover:bg-surface-container transition-colors" type="button">
<span className="material-symbols-outlined text-[20px]">center_focus_strong</span>
</button>
</div>
<div className="relative z-10 mb-space-md flex flex-col items-center">
<div className={`inline-flex items-center gap-space-sm px-4 py-1.5 rounded-full backdrop-blur-md shadow-sm ${temErro ? "bg-error-container/90 text-on-error-container" : "bg-secondary-container/90 text-on-secondary-container"}`}>
<span className="relative flex h-2.5 w-2.5">
<span className={`${speech.listening ? "animate-ping" : ""} absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75`}></span>
<span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-tertiary"></span>
</span>
<span className={`material-symbols-outlined text-[18px] ${speech.listening ? "text-primary animate-pulse" : ""}`}>{temErro ? "mic_off" : "hearing"}</span>
<span className="font-label-md text-label-md font-semibold tracking-wide">{chipLabel}</span>
</div>
{(player.status === "sinalizando" || player.status === "traduzindo" || filaCount > 0 || player.glossSource === "llm") && (
<span className="mt-1.5 px-2.5 py-0.5 rounded-full bg-surface-container-lowest/85 backdrop-blur-md shadow-sm font-label-sm text-label-sm text-on-surface-variant">
  {player.status === "traduzindo"
    ? "traduzindo…"
    : player.status === "sinalizando"
      ? player.glossCount.total > 0
        ? `sinalizando ${player.glossCount.current}/${player.glossCount.total}`
        : "sinalizando…"
      : "avatar pronto"}
  {filaCount > 0 ? ` · ${filaCount} na fila` : ""}
  {player.glossSource === "llm" ? " · glosa por IA" : ""}
</span>
)}
</div>
</section>
<section className="w-full bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col space-y-space-sm">
<div className="flex items-center justify-between">
<div className="flex items-center gap-space-xs">
<span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-label-sm text-label-sm uppercase tracking-wider font-bold">
          Tempo Real
        </span>
<span className="font-label-md text-label-md text-on-surface-variant font-medium">Você disse:</span>
</div>
<div className="flex items-center gap-1">
<button aria-label="Copiar texto falado" className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors" id="copyBtn" type="button" onClick={() => { if (transcript) navigator.clipboard?.writeText(transcript); }}>
<span className="material-symbols-outlined text-[18px]">content_copy</span>
</button>
<button aria-label="Limpar transcrição" className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors" id="clearBtn" type="button" onClick={() => speech.clear()}>
<span className="material-symbols-outlined text-[18px]">close</span>
</button>
</div>
</div>
<div className="min-h-[58px] flex items-baseline flex-wrap">
<p className="font-body-lg text-body-lg text-on-surface font-medium leading-relaxed line-clamp-2" id="liveTranscript">
        {transcript ? (
          <>
            {speech.finalText && <span>{speech.finalText} </span>}
            {speech.interim && <span className="text-on-surface-variant">{speech.interim}</span>}
          </>
        ) : (
          <span className="text-on-surface-variant font-normal">
            {speech.error
              ? speech.error
              : !speech.supported
                ? "Seu navegador não suporta ditado por voz — use o teclado."
                : speech.listening
                  ? "Comece a falar… o avatar sinaliza frase a frase"
                  : "Aguardando permissão do microfone…"}
          </span>
        )}
      </p>
<span aria-hidden="true" className="inline-block w-2 h-5 bg-primary ml-1 translate-y-0.5 animate-pulse rounded-full"></span>
</div>
<div className="pt-space-xs flex items-center justify-between">
<div className="flex items-center gap-1.5 text-on-surface-variant">
<span className={`material-symbols-outlined text-[16px] text-primary ${speech.listening ? "animate-spin" : ""}`}>{speech.listening ? "sync" : "graphic_eq"}</span>
<span className="font-label-sm text-label-sm">
          {speech.error
            ? "Ditado indisponível — use o teclado"
            : speech.listening
              ? "Transcrevendo sua fala em tempo real"
              : "Aguardando fala"}
        </span>
</div>
<div className="flex items-center gap-1 bg-surface-container px-2.5 py-1 rounded-full text-on-surface-variant">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
<span className="font-label-sm text-label-sm font-semibold text-tertiary">pt-BR</span>
</div>
</div>
{player.error && (
<p className="font-label-sm text-label-sm text-error">Erro na tradução: {player.error}</p>
)}
</section>
<section className="w-full flex flex-col items-center justify-center pt-space-xs pb-space-sm space-y-space-md">
<div aria-label="Nível de captação de voz" className={`flex items-center justify-center gap-1.5 h-10 w-48 px-2 ${speech.listening ? "" : "opacity-40"}`}>
{[0.55, 0.8, 1, 0.95, 0.7, 0.85, 0.5].map((peso, i) => (
  <span key={i} className={`${i === 3 || i === 4 ? "w-1.5" : "w-1"} ${i % 2 ? "bg-primary-container" : "bg-primary"} rounded-full`} style={{ height: `${Math.round(4 + level * 36 * peso)}px` }} />
))}
</div>
<div className="relative flex items-center justify-center">
<span className="absolute inline-flex w-24 h-24 rounded-full bg-primary/20 animate-ping opacity-60 pointer-events-none"></span>
<span className="absolute inline-flex w-20 h-20 rounded-full bg-primary/30 pointer-events-none"></span>
<button aria-label={speech.listening ? "Parar de ouvir" : "Começar a ouvir"} className="relative z-10 w-[72px] h-[72px] rounded-full bg-primary text-on-primary shadow-xl flex items-center justify-center hover:bg-on-primary-fixed-variant active:scale-95 transition-all focus:outline-none" id="toggleMicBtn" type="button" onClick={toggleMic}>
<span className="material-symbols-outlined text-[32px]" style={{fontVariationSettings: "'FILL' 1"}}>{speech.listening ? "stop" : "mic"}</span>
</button>
</div>
<div className="text-center">
<p className="font-label-lg text-label-lg text-on-surface font-bold tracking-tight">{speech.listening ? "Parar de ouvir" : "Começar a ouvir"}</p>
<span className="font-label-sm text-label-sm text-on-surface-variant">
  {speech.listening
    ? "A tradução acontece enquanto você fala — toque para pausar"
    : "Toque para voltar a falar — a fila continua de onde parou"}
</span>
</div>
{temErro && (
<div className="flex flex-col items-center gap-2 px-4 text-center">
  <button type="button" onClick={irParaTexto} className="flex items-center gap-1.5 text-on-surface-variant hover:text-primary transition-colors py-1 px-3 rounded-full min-h-[44px]">
    <span className="material-symbols-outlined text-[18px]">keyboard</span>
    <span className="font-label-md text-label-md">Digitar em vez disso</span>
  </button>
</div>
)}
</section>
</div>
</main><nav className="fixed bottom-0 w-full z-50 pb-safe bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_-2px_12px_rgba(23,43,58,0.06)]" data-active-classes="text-primary-container font-semibold"><div className="flex items-center justify-around h-16 px-space-sm max-w-md mx-auto"><a aria-current="page" className="flex flex-col items-center justify-center flex-1 h-full py-1 transition-colors min-h-[48px] text-primary-container font-semibold" href="#" onClick={(e) => { e.preventDefault(); navigate("/"); }}><span className="material-symbols-outlined text-[24px]">translate</span><span className="font-label-sm text-label-sm mt-0.5">Traduzir</span></a><a className="flex flex-col items-center justify-center flex-1 h-full py-1 text-on-surface-variant hover:text-on-surface transition-colors min-h-[48px]" href="#" onClick={(e) => { e.preventDefault(); navigate("/historico"); }}><span className="material-symbols-outlined text-[24px]">history</span><span className="font-label-sm text-label-sm mt-0.5">Histórico</span></a><a className="flex flex-col items-center justify-center flex-1 h-full py-1 text-on-surface-variant hover:text-on-surface transition-colors min-h-[48px]" href="#" onClick={(e) => { e.preventDefault(); navigate("/configuracoes"); }}><span className="material-symbols-outlined text-[24px]">settings</span><span className="font-label-sm text-label-sm mt-0.5">Configurações</span></a></div></nav>
    </>
  );
}
