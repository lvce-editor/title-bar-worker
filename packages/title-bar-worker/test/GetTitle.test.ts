import { expect, test } from '@jest/globals'
import * as GetTitle from '../src/parts/GetTitle/GetTitle.ts'

const APP_NAME = 'Lvce Editor'

test('getTitle - empty string', () => {
  const result: string = GetTitle.getTitle('', '${folderName}', APP_NAME)
  expect(result).toBe('')
})

test('getTitle - no slashes', () => {
  const result: string = GetTitle.getTitle('workspace', '${folderName}', APP_NAME)
  expect(result).toBe('')
})

test('getTitle - single slash at end', () => {
  const result: string = GetTitle.getTitle('/', '${folderName}', APP_NAME)
  expect(result).toBe('')
})

test('getTitle - path with single slash', () => {
  const result: string = GetTitle.getTitle('/workspace', '${folderName}', APP_NAME)
  expect(result).toBe('workspace')
})

test('getTitle - path with multiple slashes', () => {
  const result: string = GetTitle.getTitle('/home/user/project', '${folderName}', APP_NAME)
  expect(result).toBe('project')
})

test('getTitle - path with trailing slash', () => {
  const result: string = GetTitle.getTitle('/home/user/project/', '${folderName}', APP_NAME)
  expect(result).toBe('')
})

test('getTitle - file protocol uri', () => {
  const result: string = GetTitle.getTitle('file:///path/to/workspace', '${folderName}', APP_NAME)
  expect(result).toBe('workspace')
})

test('getTitle - windows path', () => {
  const result: string = GetTitle.getTitle('C:\\Users\\user\\project', '${folderName}', APP_NAME)
  expect(result).toBe('')
})

test('getTitle - with titleTemplate containing appName', () => {
  const result: string = GetTitle.getTitle('/home/user/project', '${appName} - ${folderName}', APP_NAME)
  expect(result).toBe('Lvce Editor - project')
})

test('getTitle - with empty titleTemplate', () => {
  const result: string = GetTitle.getTitle('/home/user/project', '', APP_NAME)
  expect(result).toBe('project')
})

test('getTitle - with titleTemplate without variables', () => {
  const result: string = GetTitle.getTitle('/home/user/project', 'My Custom Title', APP_NAME)
  expect(result).toBe('My Custom Title')
})
