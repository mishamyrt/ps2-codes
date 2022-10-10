import { deepEqual, equal } from 'assert'
import { RawFormat } from '../../src/formats'
import { cheats } from '../data'

const correctResult = `
//First Test Cheat
00000000 00000001
00000001 00000002

//Second Test Cheat
00000000 00000002
00000001 00000003

00000000 00000002
00000001 00000003`

describe('Raw format test', function () {
  it('should format cheat file', async function () {
    const result = await RawFormat.toString(cheats)
    equal(result, correctResult.trim())
  })

  it('should parse cheat file', async function () {
    const result = await RawFormat.fromString(correctResult)
    deepEqual(result[1], {
      title: 'Second Test Cheat',
      patch: [[0, 2], [1, 3]]
    })
  })
})
