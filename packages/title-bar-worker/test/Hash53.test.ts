import { expect, test } from '@jest/globals'
import { hash53 } from '../src/parts/Hash53/Hash53.ts'

const vectors: readonly (readonly [string, number, number])[] = [
  ['', 0, 3338908027751811],
  ['', 1, 7956228673112545],
  ['a', 0, 3212125409472531],
  ['a', 1, 1613339699444328],
  ['Hello, world!', 0, 2195435029717678],
  ['Hello, world!', 1, 4042665410769214],
  ['  tabs\tand\nnewlines  ', 0, 7356404340319338],
  ['  tabs\tand\nnewlines  ', 1, 2422492702374260],
  ['before\0after', 0, 7321398901759653],
  ['before\0after', 1, 879565428967461],
  ['A'.repeat(1024), 0, 8679623710844379],
  ['A'.repeat(1024), 1, 4496892644804521],
  ['é', 0, 8859066144357724],
  ['😀', 0, 6579386575394746],
  ['😀', 1, 1785451951573176],
  ['e\u0301', 0, 677342419498126],
  ['e\u0301', 1, 3692525388272717],
  ['\ud800', 0, 3063721467345607],
  ['\udc00', 0, 1452299719939100],
  ['', 42, 237522606461695],
  ['a', 42, 2528748892112953],
  ['Hello, world!', 42, 1591860110375195],
  ['', 0x7fffffff, 4612813144067459],
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
