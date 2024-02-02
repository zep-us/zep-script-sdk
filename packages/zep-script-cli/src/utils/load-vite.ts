export function loadViteDynamicImport() {
  process.env.VITE_CJS_IGNORE_WARNING = "true";
  return Function('return import("vite")')() as Promise<typeof import("vite")>;
}
