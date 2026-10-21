import { expect, test } from '@jest/globals'
import { getMenuEntries } from '../src/parts/MenuEntriesFile/MenuEntriesFile.ts'
import * as MenuEntrySeparator from '../src/parts/MenuEntrySeparator/MenuEntrySeparator.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'
import * as PlatformType from '../src/parts/PlatformType/PlatformType.ts'

test('getMenuEntries - auto save enabled', async () => {
  const result = await getMenuEntries(PlatformType.Web, 'afterDelay')

  expect(result).toContainEqual({
    command: 'Preferences.toggleAutoSave',
    flags: MenuItemFlags.Checked,
    id: 'autoSave',
    label: 'Auto Save',
  })
})

test('getMenuEntries - auto save disabled', async () => {
  const result = await getMenuEntries(PlatformType.Electron, 'off')

  expect(result).toContainEqual({
    command: 'Preferences.toggleAutoSave',
    flags: MenuItemFlags.Unchecked,
    id: 'autoSave',
    label: 'Auto Save',
  })
  expect(result).toContainEqual(MenuEntrySeparator.menuEntrySeparator)
})

test('getMenuEntries - save requires an active editor while save all can save background tabs', async () => {
  const entries = await getMenuEntries(PlatformType.Web, 'off')
  expect(entries).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        flags: MenuItemFlags.Disabled,
        id: 'save',
      }),
      expect.objectContaining({
        flags: MenuItemFlags.None,
        id: 'saveAll',
      }),
    ]),
  )
})

test('getMenuEntries - save is enabled with active text editor', async () => {
  const entries = await getMenuEntries(PlatformType.Web, 'off', true)
  expect(entries).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        flags: MenuItemFlags.None,
        id: 'save',
      }),
      expect.objectContaining({
        flags: MenuItemFlags.None,
        id: 'saveAll',
      }),
    ]),
  )
})

test('getMenuEntries - close folder is disabled without an open workspace', async () => {
  const entries = await getMenuEntries(PlatformType.Web, 'off')
  expect(entries).toContainEqual({
    command: 'Workspace.close',
    flags: MenuItemFlags.Disabled,
    id: 'closeFolder',
    label: 'Close Folder',
  })
})

test('getMenuEntries - close folder restores focus with an open workspace', async () => {
  const entries = await getMenuEntries(PlatformType.Web, 'off', false, true)
  expect(entries).toContainEqual({
    command: 'Workspace.close',
    flags: MenuItemFlags.RestoreFocus,
    id: 'closeFolder',
    label: 'Close Folder',
  })
})

test('new file restores focus to the created editor', async () => {
  const entries = await getMenuEntries(PlatformType.Web, 'off')
  expect(entries).toContainEqual({
    command: 'Main.newFile',
    flags: MenuItemFlags.RestoreEditorFocus,
    id: 'newFile',
    label: 'New File',
  })
})

test('Open Folder does not restore focus over the warning dialog', async () => {
  const entries = await getMenuEntries(PlatformType.Web, 'off')

  expect(entries).toContainEqual({
    command: 'Dialog.openFolder',
    flags: MenuItemFlags.None,
    id: 'openFolder',
    label: 'Open Folder',
  })
})
