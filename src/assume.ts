import { FormatKey, formats } from './formats'

export function assumeFormat (s: string): FormatKey | '' {
  for (const format in formats) {
    try {
      const cheats = formats[format as FormatKey].fromString(s)
      if (cheats.length) {
        return format as FormatKey
      }
    } catch {
      // Do nothing
    }
  }
  return ''
}
