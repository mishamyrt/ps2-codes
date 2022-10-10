import { equal } from 'assert'
import { parseHex, formatHex } from '../src/hex'

const str = 'DEADBEEF'
const value = 3735928559

describe('HEX tools', function () {
  it('should parse HEX string', async function () {
    equal(parseHex(str), value)
  })

  it('should format HEX string', async function () {
    equal(formatHex(value), str)
  })
})
