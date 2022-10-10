export function formatHex (v: number, length = 8): string {
  return v
    .toString(16)
    .toUpperCase()
    .padStart(length, '0')
}

export function parseHex (v: string): number {
  return parseInt(v, 16)
}
