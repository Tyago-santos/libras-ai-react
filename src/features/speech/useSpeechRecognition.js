import { useSyncExternalStore } from "react";
import { speechEngine } from "./speechEngine";

/**
 * Assina o motor de ditado compartilhado entre as telas.
 * `supported`/`listening`/`transcribing`/`finalText`/`error` refletem o estado real.
 */
export function useSpeechRecognition() {
  const state = useSyncExternalStore(
    speechEngine.subscribe,
    speechEngine.getSnapshot,
    speechEngine.getSnapshot,
  );

  return {
    ...state,
    start: speechEngine.start,
    stop: speechEngine.stop,
    pause: speechEngine.pause,
    resume: speechEngine.resume,
    clear: speechEngine.clear,
  };
}
