export type Address = [number, number]

export type Patch = Address[]

export interface Cheat {
  patch: Patch
  title?: string
}
