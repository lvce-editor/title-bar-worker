import { expect, test } from '@jest/globals'
import { getMenuEntries } from '../src/parts/MenuEntriesEdit/MenuEntriesEdit.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'

test('getMenuEntries restores editor focus after every command', () => {
  const commandEntries = getMenuEntries().filter((entry) => entry.command)

  expect(commandEntries).not.toHaveLength(0)
  expect(commandEntries.every((entry) => entry.flags === MenuItemFlags.RestoreEditorFocus)).toBe(true)
})
