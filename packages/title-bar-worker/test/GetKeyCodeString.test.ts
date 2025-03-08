import { expect, test } from '@jest/globals'
import * as GetKeyCodeString from '../src/parts/GetKeyCodeString/GetKeyCodeString.ts'
import * as KeyCode from '../src/parts/KeyCode/KeyCode.ts'

test('getKeyCodeString', () => {
  expect(GetKeyCodeString.getKeyCodeString(KeyCode.Enter)).toBe('Enter')
  expect(GetKeyCodeString.getKeyCodeString(KeyCode.Escape)).toBe('Escape')
  expect(GetKeyCodeString.getKeyCodeString(KeyCode.UpArrow)).toBe('UpArrow')
  expect(GetKeyCodeString.getKeyCodeString(KeyCode.DownArrow)).toBe('DownArrow')
  expect(GetKeyCodeString.getKeyCodeString(KeyCode.Digit0)).toBe('0')
  expect(GetKeyCodeString.getKeyCodeString(KeyCode.Digit1)).toBe('1')
  expect(GetKeyCodeString.getKeyCodeString(KeyCode.KeyA)).toBe('a')
  expect(GetKeyCodeString.getKeyCodeString(KeyCode.F1)).toBe('F1')
  expect(GetKeyCodeString.getKeyCodeString(KeyCode.Equal)).toBe('=')
  expect(GetKeyCodeString.getKeyCodeString(KeyCode.Backquote)).toBe('Backquote')
  expect(GetKeyCodeString.getKeyCodeString(KeyCode.Backslash)).toBe('Backslash')
  expect(GetKeyCodeString.getKeyCodeString(999)).toBe('Unknown')
})
