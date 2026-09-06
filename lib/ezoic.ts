export function runEzoic(fn: () => void) {
  if (typeof window === "undefined") return;

  window.ezstandalone = window.ezstandalone || ({} as NonNullable<
    typeof window.ezstandalone
  >);

  window.ezstandalone.cmd = window.ezstandalone.cmd || [];

  window.ezstandalone.cmd.push(fn);
}