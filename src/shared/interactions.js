/**
 * Interações das telas de Configurações/Histórico — portadas dos <script>
 * originais do Stitch (atuação imperativa no DOM, fiel ao design).
 */

let toastTimeout;

export function triggerNativeToast(msg) {
  const toast = document.getElementById("settings-toast");
  const text = document.getElementById("toast-message");
  if (!toast || !text) return;
  text.textContent = msg;
  toast.classList.remove("opacity-0", "pointer-events-none");
  toast.classList.add("opacity-100");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("opacity-100");
    toast.classList.add("opacity-0", "pointer-events-none");
  }, 2200);
}

export function showToast(msg) {
  const toast = document.getElementById("toastNotification");
  const toastText = document.getElementById("toastMessage");
  if (toast && toastText) {
    toastText.innerText = msg;
    toast.classList.remove("opacity-0", "pointer-events-none");
    setTimeout(() => {
      toast.classList.add("opacity-0", "pointer-events-none");
    }, 2000);
  }
}

export function toggleSwitch(btn) {
  const isChecked = btn.getAttribute("aria-checked") === "true";
  const newState = !isChecked;
  btn.setAttribute("aria-checked", newState);
  const thumb = btn.firstElementChild;
  if (newState) {
    btn.classList.remove("bg-surface-variant", "bg-surface-container-highest");
    btn.classList.add("bg-primary");
    thumb.classList.remove("translate-x-0");
    thumb.classList.add("translate-x-6");
    triggerNativeToast("Recurso ativado");
  } else {
    btn.classList.remove("bg-primary");
    btn.classList.add("bg-surface-variant");
    thumb.classList.remove("translate-x-6");
    thumb.classList.add("translate-x-0");
    triggerNativeToast("Recurso desativado");
  }
}

export function setTextSize(size, el) {
  document.querySelectorAll(".font-size-btn").forEach((b) => {
    b.classList.remove("bg-primary-container", "text-on-primary-container", "shadow-xs");
    b.classList.add("text-on-surface-variant");
  });
  el.classList.add("bg-primary-container", "text-on-primary-container", "shadow-xs");
  el.classList.remove("text-on-surface-variant");

  const labels = {
    padrao: "Padrão",
    grande: "Grande (+15%)",
    "muito-grande": "Muito Grande (+30%)",
    extra: "Extra",
  };
  const label = document.getElementById("font-size-label");
  if (label) label.textContent = labels[size] || size;
  triggerNativeToast("Tamanho ajustado para " + (labels[size] || size));
}

/** Variante da tela Configurações (botoões .size-btn + label #text-size-label). */
export function setTextSizeCompact(size, el) {
  document.querySelectorAll(".size-btn").forEach((btn) => {
    btn.setAttribute("aria-checked", "false");
    btn.classList.remove("bg-primary", "text-on-primary", "shadow-sm");
    btn.classList.add("bg-transparent", "text-on-surface-variant");
  });

  el.setAttribute("aria-checked", "true");
  el.classList.remove("bg-transparent", "text-on-surface-variant");
  el.classList.add("bg-primary", "text-on-primary", "shadow-sm");

  const labelMap = {
    padrao: "Padrão",
    grande: "Grande (+25%)",
    extra: "Extra Grande (+50%)",
  };
  const label = document.getElementById("text-size-label");
  if (label) label.textContent = labelMap[size] || "Padrão";
}

/** Variante da tela Configurações (toggle com .dot). */
export function toggleSwitchDot(button) {
  const isChecked = button.getAttribute("aria-checked") === "true";
  const nextState = !isChecked;
  button.setAttribute("aria-checked", String(nextState));

  const dot = button.querySelector(".dot");
  if (nextState) {
    button.classList.remove("bg-surface-container-highest");
    button.classList.add("bg-primary");
    dot.classList.remove("bg-surface-container-lowest", "translate-x-0");
    dot.classList.add("bg-on-primary", "translate-x-6");
  } else {
    button.classList.remove("bg-primary");
    button.classList.add("bg-surface-container-highest");
    dot.classList.remove("bg-on-primary", "translate-x-6");
    dot.classList.add("bg-surface-container-lowest", "translate-x-0");
  }
}

export function setAvatarSpeed(speed, text, el) {
  document.querySelectorAll(".speed-btn").forEach((b) => {
    b.classList.remove("bg-primary-container", "text-on-primary-container", "shadow-xs");
    b.classList.add("text-on-surface-variant");
  });
  el.classList.add("bg-primary-container", "text-on-primary-container", "shadow-xs");
  el.classList.remove("text-on-surface-variant");

  const indicator = document.getElementById("speed-indicator");
  if (indicator) indicator.textContent = text;
  triggerNativeToast("Velocidade alterada para " + speed);
}

export function setSpeed(speedText, el) {
  document.querySelectorAll(".speed-btn").forEach((btn) => {
    btn.setAttribute("aria-checked", "false");
    btn.classList.remove("bg-primary", "text-on-primary", "shadow-sm");
    btn.classList.add("bg-transparent", "text-on-surface-variant");
  });

  el.setAttribute("aria-checked", "true");
  el.classList.remove("bg-transparent", "text-on-surface-variant");
  el.classList.add("bg-primary", "text-on-primary", "shadow-sm");

  const label = document.getElementById("speed-label");
  if (label) label.textContent = speedText;
}

export function selectPalette(theme, el) {
  document.querySelectorAll(".palette-option").forEach((p) => {
    p.classList.remove("ring-2", "ring-primary", "bg-surface-container-high");
    p.classList.add("bg-surface-container");
    const label = p.querySelector("span:last-child");
    if (label) {
      label.classList.remove("font-semibold", "text-on-surface");
      label.classList.add("text-on-surface-variant");
    }
  });
  el.classList.add("ring-2", "ring-primary", "bg-surface-container-high");
  el.classList.remove("bg-surface-container");
  const label = el.querySelector("span:last-child");
  if (label) {
    label.classList.add("font-semibold", "text-on-surface");
    label.classList.remove("text-on-surface-variant");
  }
  triggerNativeToast("Palco do avatar atualizado: " + theme);
}

export function copySnippet(btn, text) {
  navigator.clipboard?.writeText(text).catch(() => {});
  showToast("Transcrição copiada com sucesso!");
  const icon = btn.querySelector(".material-symbols-outlined");
  if (icon) {
    icon.textContent = "done";
    setTimeout(() => {
      icon.textContent = "content_copy";
    }, 1500);
  }
}

export function playReplay(btn) {
  const icon = btn.querySelector(".material-symbols-outlined");
  const label = btn.querySelector("span:not(.material-symbols-outlined)");
  if (icon && label) {
    const prevIcon = icon.textContent;
    const prevLabel = label.textContent;
    icon.textContent = "record_voice_over";
    label.textContent = "Transmitindo...";
    btn.classList.add("bg-primary", "text-on-primary");
    setTimeout(() => {
      icon.textContent = prevIcon;
      label.textContent = prevLabel;
      btn.classList.remove("bg-primary", "text-on-primary");
    }, 2000);
  }
}

export function toggleFavorite(btn) {
  const icon = btn.querySelector(".material-symbols-outlined");
  if (icon) {
    const isFilled = icon.textContent === "star";
    icon.textContent = isFilled ? "star_outline" : "star";
    btn.classList.toggle("text-amber-500", !isFilled);
    btn.classList.toggle("text-outline", isFilled);
    showToast(!isFilled ? "Adicionado aos favoritos" : "Removido dos favoritos");
  }
}
