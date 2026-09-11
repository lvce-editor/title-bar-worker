import { expect, test } from '@jest/globals'
import { MenuEntryId, PlatformType } from '@lvce-editor/constants'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { MenuIdAppearance, MenuIdEditorLayout, MenuIdSwitchEditor, MenuIdSwitchGroup } from '../src/parts/GetMenuIds/GetMenuIds.ts'
import { getMenuEntries } from '../src/parts/MenuEntries/MenuEntries.ts'

test('getMenuEntries - switch editor', async () => {
  const result = await getMenuEntries(MenuIdSwitchEditor)

  expect(result).toHaveLength(10)
  expect(result[0]).toMatchObject({
    id: 'nextEditor',
    label: 'Next Editor',
  })
})

test('getMenuEntries - switch group', async () => {
  const result = await getMenuEntries(MenuIdSwitchGroup)

  expect(result).toHaveLength(9)
  expect(result[0]).toMatchObject({
    id: 'nextGroup',
    label: 'Next Group',
  })
})

test.each([
  [MenuEntryId.Edit, 'undo'],
  [MenuEntryId.File, 'newFile'],
  [MenuEntryId.Go, 'back'],
  [MenuEntryId.Help, 'showAllCommands'],
  [MenuEntryId.Run, undefined],
  [MenuEntryId.Selection, 'selectAll'],
  [MenuEntryId.Terminal, 'newTerminal'],
  [MenuEntryId.TitleBar, MenuEntryId.File],
  [MenuEntryId.View, 'commandPalette'],
  [MenuIdAppearance, 'fullScreen'],
  [MenuIdEditorLayout, 'splitUp'],
])('getMenuEntries routes %s', async (id, firstId) => {
  const result = await getMenuEntries(id, PlatformType.Web)
  expect(result[0]?.id).toBe(firstId)
})

test('getMenuEntries routes recent workspaces', async () => {
  using _mockRpc = RendererWorker.registerMockRpc({ 'RecentlyOpened.getRecentlyOpened': () => [] })
  expect(await getMenuEntries(MenuEntryId.OpenRecent)).toEqual(expect.arrayContaining([expect.objectContaining({ id: 'more' })]))
})

test('getMenuEntries rejects unknown menus with context', async () => {
  await expect(getMenuEntries('unknown')).rejects.toThrow('Failed to load menu entries for id unknown')
})
