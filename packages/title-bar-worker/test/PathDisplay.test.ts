import { expect, test } from '@jest/globals'
import * as PathDisplay from '../src/parts/PathDisplay/PathDisplay.ts'

test('getTitle - empty uri', () => {
  const result = PathDisplay.getTitle('/home/user', '')
  expect(result).toBe('')
})

test('getTitle - uri starts with homeDir', () => {
  const result = PathDisplay.getTitle('/home/user', '/home/user/project')
  expect(result).toBe('~/project')
})

test('getTitle - uri starts with file protocol', () => {
  const result = PathDisplay.getTitle('/home/user', 'file:///path/to/file')
  expect(result).toBe('/path/to/file')
})

test('getTitle - regular uri', () => {
  const result = PathDisplay.getTitle('/home/user', '/some/other/path')
  expect(result).toBe('/some/other/path')
})

test('getTitle - empty homeDir', () => {
  const result = PathDisplay.getTitle('', '/path/to/file')
  expect(result).toBe('/path/to/file')
})
