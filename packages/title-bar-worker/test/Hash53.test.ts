import { expect, test } from '@jest/globals'
import { hash53 } from '../src/parts/Hash53/Hash53.ts'

const vectors: readonly (readonly [string, number, number])[] = [
  ['', 0, 3_338_908_027_751_811],
  ['', 1, 7_956_228_673_112_545],
  ['a', 0, 3_212_125_409_472_531],
  ['a', 1, 1_613_339_699_444_328],
  ['Hello, world!', 0, 2_195_435_029_717_678],
  ['Hello, world!', 1, 4_042_665_410_769_214],
  ['  tabs\tand\nnewlines  ', 0, 7_356_404_340_319_338],
  ['  tabs\tand\nnewlines  ', 1, 2_422_492_702_374_260],
  ['before\0after', 0, 7_321_398_901_759_653],
  ['before\0after', 1, 879_565_428_967_461],
  ['A'.repeat(1024), 0, 8_679_623_710_844_379],
  ['A'.repeat(1024), 1, 4_496_892_644_804_521],
  ['é', 0, 8_859_066_144_357_724],
  ['😀', 0, 6_579_386_575_394_746],
  ['😀', 1, 1_785_451_951_573_176],
  ['e\u{301}', 0, 677_342_419_498_126],
  ['e\u{301}', 1, 3_692_525_388_272_717],
  ['\u{D800}', 0, 3_063_721_467_345_607],
  ['\u{DC00}', 0, 1_452_299_719_939_100],
  ['', 42, 237_522_606_461_695],
  ['a', 42, 2_528_748_892_112_953],
  ['Hello, world!', 42, 1_591_860_110_375_195],
  ['', 0x7f_ff_ff_ff, 4_612_813_144_067_459],
]

for (const [index, [value, seed, expected]] of vectors.entries()) {
  test(`hash53 vector ${index}`, () => {
    const hash = hash53(value, seed)

    expect(hash).toBe(expected)
    expect(hash53(value, seed)).toBe(hash)
    expect(Number.isSafeInteger(hash)).toBe(true)
    expect(hash).toBeGreaterThanOrEqual(0)
  })
}
