import { expect, test } from '@jest/globals'
import * as TitleBarStrings from '../src/parts/TitleBarStrings/TitleBarStrings.ts'

test('file', () => {
  expect(TitleBarStrings.file()).toBe('File')
})

test('edit', () => {
  expect(TitleBarStrings.edit()).toBe('Edit')
})

test('selection', () => {
  expect(TitleBarStrings.selection()).toBe('Selection')
})

test('view', () => {
  expect(TitleBarStrings.view()).toBe('View')
})

test('go', () => {
  expect(TitleBarStrings.go()).toBe('Go')
})

test('run', () => {
  expect(TitleBarStrings.run()).toBe('Run')
})

test('terminal', () => {
  expect(TitleBarStrings.terminal()).toBe('Terminal')
})

test('help', () => {
  expect(TitleBarStrings.help()).toBe('Help')
})

test('more', () => {
  expect(TitleBarStrings.more()).toBe('more')
})

test('minimize', () => {
  expect(TitleBarStrings.minimize()).toBe('Minimize')
})

test('maximize', () => {
  expect(TitleBarStrings.maximize()).toBe('Maximize')
})

test('close', () => {
  expect(TitleBarStrings.close()).toBe('Close')
})
