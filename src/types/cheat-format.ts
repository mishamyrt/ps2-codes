import type { Cheat } from './cheat'

export interface CheatFormat {
  readonly title: string
  fromString: (input: string) => Cheat[]
  toString: (input: Cheat[]) => string
}
