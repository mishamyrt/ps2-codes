import { parseHex, formatHex } from '../hex'
import type { Address, Cheat, CheatFormat, Patch } from '../types'

function parseAddress (line: string): Address | typeof NaN {
  const result = line
    .split(' ')
    .map(parseHex)
  if (Number.isInteger(result[0])) {
    return [result[0], result[1]]
  }
  return NaN
}

function parseComment (line: string): string {
  if (line.startsWith('//')) {
    return line.replace('//', '')
  }
  return ''
}

function formatPatch (p: Patch): string {
  return p.map(a =>
    a
      .map(i => formatHex(i))
      .join(' ')
  ).join('\n')
}

export const RawFormat: CheatFormat = {
  title: 'Raw (ps2rd)',
  fromString (input) {
    const lines = input.split('\n')
    const cheats: Cheat[] = []
    let title = ''
    let patch: Address[] = []
    let isOnAddress = false
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      const address = parseAddress(line)
      if (Array.isArray(address)) {
        isOnAddress = true
        patch.push(address)
        continue
      }
      if (isOnAddress) {
        cheats.push({
          title,
          patch
        })
        title = ''
        patch = []
        isOnAddress = false
      }
      const comment = parseComment(line)
      if (comment.length !== 0) {
        title = comment
        continue
      }
    }
    return cheats
  },
  toString (input) {
    return input
      .map(c => {
        let cheat = ''
        if (c.title) {
          cheat = `//${c.title}\n`
        }
        cheat += formatPatch(c.patch)
        return cheat
      })
      .join('\n\n')
  }
}
