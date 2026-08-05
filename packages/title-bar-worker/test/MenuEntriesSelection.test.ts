import { expect, test } from '@jest/globals'
import { getMenuEntries } from '../src/parts/MenuEntriesSelection/MenuEntriesSelection.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'

test('getMenuEntries disables every command without an active text editor', () => {
  const commandEntries = getMenuEntries().filter((entry) => entry.command)

  expect(commandEntries).not.toHaveLength(0)
  expect(commandEntries.every((entry) => entry.flags === MenuItemFlags.Disabled)).toBe(true)
})

test('getMenuEntries restores editor focus after every command with an active text editor', () => {
  const commandEntries = getMenuEntries(true).filter((entry) => entry.command)

  expect(commandEntries).not.toHaveLength(0)
  expect(commandEntries.every((entry) => entry.flags === MenuItemFlags.RestoreEditorFocus)).toBe(true)
})
