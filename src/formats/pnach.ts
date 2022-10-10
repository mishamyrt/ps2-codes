import { parseHex, formatHex } from '../hex'
import { Cheat, CheatFormat, Patch } from '../types'

function formatPatch (p: Patch): string {
  return p
    .map(addr => {
      const hex = addr.map(a => formatHex(a))
      return `patch=1,EE,${hex[0]},extended,${hex[1]}`
    })
    .join('\n')
}

function formatCheat (c: Cheat) {
  return (c.title || 'Unnamed cheat') + '\n' + formatPatch(c.patch)
}

function isTitle (s: string): boolean {
  return s.startsWith('gametitle=')
}

function isPatch (s: string): boolean {
  return s.startsWith('patch=')
}

export const PnachFormat: CheatFormat = {
  title: 'PCSX2 / AetherSX2 (pnach)',
  fromString (input) {
    const lines = input.split('\n')
    const cheats = []
    let title: string | undefined
    let patch: Patch = []
    for (let i = 0; i < lines.length; i++) {
      if (isPatch(lines[i])) {
        const parts = lines[i].split(',')
        patch.push(
          [
            parseHex(parts[2]),
            parseHex(parts[4])
          ]
        )
        continue
      } else if (patch.length > 0) {
        cheats.push({
          title,
          patch
        })
        patch = []
        title = undefined
      }
      if (isTitle(lines[i])) {
        continue
      }
      title = lines[i].trim()
    }
    return cheats
  },
  toString (i) {
    return i
      .map(formatCheat)
      .join('\n\n')
  }
}
