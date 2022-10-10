import { deepEqual, equal } from 'assert'
import { cheats } from '../data'
import { PnachFormat } from '../../src/formats'

const correctResult = `
First Test Cheat
patch=1,EE,00000000,extended,00000001
patch=1,EE,00000001,extended,00000002

Second Test Cheat
patch=1,EE,00000000,extended,00000002
patch=1,EE,00000001,extended,00000003

Unnamed cheat
patch=1,EE,00000000,extended,00000002
patch=1,EE,00000001,extended,00000003`

describe('Pnach format test', function () {
  it('should format cheat file', async function () {
    const result = await PnachFormat.toString(cheats)
    equal(result, correctResult.trim())
  })

  it('should parse cheat file', async function () {
    const result = await PnachFormat.fromString(correctResult)
    deepEqual(result[1], {
      title: 'Second Test Cheat',
      patch: [[0, 2], [1, 3]]
    })
  })
})
