import { expect, test } from '@jest/globals'
import * as HelpStrings from '../src/parts/HelpStrings/HelpStrings.ts'

test('showAllCommands', () => {
  expect(HelpStrings.showAllCommands()).toBe('Show All Commands')
})

test('toggleDeveloperTools', () => {
  expect(HelpStrings.toggleDeveloperTools()).toBe('Toggle Developer Tools')
})

test('openProcessExplorer', () => {
  expect(HelpStrings.openProcessExplorer()).toBe('Open Process Explorer')
})

test('checkForUpdates', () => {
  expect(HelpStrings.checkForUpdates()).toBe('Check For Updates')
})

test('about', () => {
  expect(HelpStrings.about()).toBe('About')
})
