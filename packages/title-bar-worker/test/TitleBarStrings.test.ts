import { expect, test } from '@jest/globals'
import * as TitleBarStrings from '../src/parts/TitleBarStrings/TitleBarStrings.ts'

test('file', () => {
  expect(TitleBarStrings.file()).toBe('File')
})

test('edit', () => {
  expect(TitleBarStrings.edit()).toBe('Edit')
})

test('fullScreen', () => {
  expect(TitleBarStrings.fullScreen()).toBe('Full Screen')
})

test('help', () => {
  expect(TitleBarStrings.help()).toBe('Help')
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

test('titleBar', () => {
  expect(TitleBarStrings.titleBar()).toBe('Title Bar')
})

test('menuBar', () => {
  expect(TitleBarStrings.menuBar()).toBe('Menu Bar')
})

test('commandCenter', () => {
  expect(TitleBarStrings.commandCenter()).toBe('Command Center')
})

test('layoutControls', () => {
  expect(TitleBarStrings.layoutControls()).toBe('Layout Controls')
})
