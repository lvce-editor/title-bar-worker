import { expect, test } from '@jest/globals'
import * as GetKeyLabel from '../src/parts/GetKeyLabel/GetKeyLabel.ts'

test.each([
  [67, 'F11'],
  [86, '-'],
  [88, '/'],
  [89, '`'],
  [91, '\\'],
  [96, 'NumPad0'],
])('getKeyLabel - %s', (keyCode, expected) => {
  expect(GetKeyLabel.getKeyLabel(keyCode, 'Unknown')).toBe(expected)
})

test('getKeyLabel - fallback', () => {
  expect(GetKeyLabel.getKeyLabel(29, 'a')).toBe('a')
})
