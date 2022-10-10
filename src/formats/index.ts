import { PnachFormat } from './pnach'
import { RawFormat } from './raw'

export const formats = {
  pnach: PnachFormat,
  raw: RawFormat
}

export type FormatKey = keyof typeof formats

export {
  PnachFormat,
  RawFormat
}
