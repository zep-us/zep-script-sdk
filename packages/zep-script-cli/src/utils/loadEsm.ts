export function loadExeca() {
  return Function('return import("execa")')() as Promise<
    typeof import("execa")
  >;
}
