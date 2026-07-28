export function isBlogEnabled(value: string | undefined): boolean {
  return value?.trim().toLowerCase() === "true";
}
