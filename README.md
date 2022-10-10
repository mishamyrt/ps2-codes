# PS2 Cheats [![Quality assurance](https://github.com/mishamyrt/ps2-cheats/actions/workflows/qa.yaml/badge.svg)](https://github.com/mishamyrt/ps2-cheats/actions/workflows/qa.yaml)

Library for working with Playstation™ 2 cheat codes. Provides functions for reading cheat files and converting them to another available format.

## Installation

The library is available as an npm package. To install, run the command:

```sh
npm install -s ps2-cheats
```

## Usage

### Parsing

To parse a file, call the `fromString` function on the values of the `formats` object.

```ts
import { formats } from 'ps2-cheats'
import { readFile } from 'fs/promises'

const content = await readFile('./input.raw', { encoding: 'utf8' })
const cheats = formats.raw.fromString(content)

// Print parsed cheats count
console.log(cheats.length)
```

### Formatting

To generate a file from an array of cheats, use the `toString` method.

```ts
import { formats } from 'ps2-cheats'
import { writeFile, readFile } from 'fs/promises'

const rawContent = await readFile('./input.raw', { encoding: 'utf8' })
const cheats = formats.raw.fromString(content)
const pnachContent = formats.pnach.toString(cheats)

// Write pnach
await writeFile('./output.pnach', pnachContent)
```

### Assuming format

The library may try to determine the format of the input file itself. To do this, pass the content to the `assumeFormat` function.

```ts
import { formats, assumeFormat } from 'ps2-cheats'

const content = `
//Infinite Health
20220E9C C6212AA8
20220EA4 E6212AD4
//Infinite Devil Trigger Usage
2021ECA0 00000000
//Max Infinite Devil Trigger
20244EA0 C60128C8
20244EB0 E60128C4`

const format = assumeFormat(content) // returns 'raw'
const cheats = formats[format].fromString(content)
```
