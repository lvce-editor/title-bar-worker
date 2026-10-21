import { expect, test } from '@jest/globals'
import { MenuEntryId, PlatformType } from '@lvce-editor/constants'
import { MainAreaWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as GetMenuEntries2 from '../src/parts/GetMenuEntries2/GetMenuEntries2.ts'
import { MenuIdAlignPanel, MenuIdAppearance, MenuIdEditorLayout, MenuIdSwitchEditor, MenuIdSwitchGroup } from '../src/parts/GetMenuIds/GetMenuIds.ts'
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
  [MenuIdAlignPanel, 'alignPanelCenter'],
  [MenuIdEditorLayout, 'splitUp'],
])('getMenuEntries routes %s', async (id, firstId) => {
  using _mockRpc = RendererWorker.registerMockRpc({ 'Layout.getPanelAlignment': () => 'center' })
  const result = await getMenuEntries(id, PlatformType.Web)
  expect(result[0]?.id).toBe(firstId)
})

test('getMenuEntries routes recent workspaces', async () => {
  using _mockRpc = RendererWorker.registerMockRpc({ 'RecentlyOpened.getRecentlyOpened': () => [] })
  expect(await getMenuEntries(MenuEntryId.OpenRecent, 10)).toEqual(expect.arrayContaining([expect.objectContaining({ id: 'more' })]))
})

test('getMenuEntries2 uses the recent-entry limit from state', async () => {
  using _mockRpc = RendererWorker.registerMockRpc({
    'RecentlyOpened.getRecentlyOpened': () => ['file:///home/user/first.txt', 'file:///home/user/second.txt'],
  })
  const state = { ...createDefaultState(), maxMenuRecentEntries: 1 }
  const result = await GetMenuEntries2.getMenuEntries2(state, { menuId: MenuEntryId.OpenRecent })
  expect(result.filter((entry) => entry.command === 'Workspace.setUri')).toHaveLength(1)
})

test('getMenuEntries2 queries the main area for File and Selection menus', async () => {
  using mockRpc = MainAreaWorker.registerMockRpc({ 'Viewlet.executeViewletCommand': () => true })
  const state = createDefaultState()

  await GetMenuEntries2.getMenuEntries2(state, { menuId: MenuEntryId.File, platform: PlatformType.Web })
  await GetMenuEntries2.getMenuEntries2(state, { menuId: MenuEntryId.Selection })

  expect(mockRpc.invocations).toEqual([
    ['Viewlet.executeViewletCommand', state.mainAreaUid, 'hasOpenTextEditor'],
    ['Viewlet.executeViewletCommand', state.mainAreaUid, 'hasOpenTextEditor'],
  ])
})

test('getMenuEntries rejects unknown menus with context', async () => {
  await expect(getMenuEntries('unknown')).rejects.toThrow('Failed to load menu entries for id unknown')
})
