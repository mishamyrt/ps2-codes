import { equal } from 'assert'
import { assumeFormat } from '../src'
import { readTextFile } from './fs'

describe('Format assuming', function () {
  it('should correctly assume raw', async function () {
    const content = await readTextFile('test/examples/file.raw')
    equal(assumeFormat(content), 'raw')
  })

  it('should correctly assume pnach', async function () {
    const content = await readTextFile('test/examples/file.pnach')
    equal(assumeFormat(content), 'pnach')
  })

  it('should return empty string if format is not found', async function () {
    const content = 'Dummy test string without any cheats'
    equal(assumeFormat(content), '')
  })
})
