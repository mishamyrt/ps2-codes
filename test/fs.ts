import { readFile } from 'fs/promises'

export function readTextFile (path: string): Promise<string> {
  return readFile(path, { encoding: 'utf8' })
}
