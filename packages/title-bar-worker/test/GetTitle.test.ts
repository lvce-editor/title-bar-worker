import { expect, test } from '@jest/globals'
import * as GetTitle from '../src/parts/GetTitle/GetTitle.ts'

test('getTitle - empty string', () => {
  const result: string = GetTitle.getTitle('')
  expect(result).toBe('')
})

test('getTitle - no slashes', () => {
  const result: string = GetTitle.getTitle('workspace')
  expect(result).toBe('')
})

test('getTitle - single slash at end', () => {
  const result: string = GetTitle.getTitle('/')
  expect(result).toBe('')
})

test('getTitle - path with single slash', () => {
  const result: string = GetTitle.getTitle('/workspace')
  expect(result).toBe('workspace')
})

test('getTitle - path with multiple slashes', () => {
  const result: string = GetTitle.getTitle('/home/user/project')
  expect(result).toBe('project')
})

test('getTitle - path with trailing slash', () => {
  const result: string = GetTitle.getTitle('/home/user/project/')
  expect(result).toBe('')
})

test('getTitle - file protocol uri', () => {
  const result: string = GetTitle.getTitle('file:///path/to/workspace')
  expect(result).toBe('workspace')
})

test('getTitle - windows path', () => {
  const result: string = GetTitle.getTitle('C:\\Users\\user\\project')
  expect(result).toBe('')
})
