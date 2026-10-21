import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as MenuEntriesOpenRecent from '../src/parts/MenuEntriesOpenRecent/MenuEntriesOpenRecent.ts'
import * as MenuEntrySeparator from '../src/parts/MenuEntrySeparator/MenuEntrySeparator.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'

test('getMenuEntries - abbreviates and decodes home directory labels while keeping original uris', async () => {
  using _mockRpc = RendererWorker.registerMockRpc({
    'RecentlyOpened.getRecentlyOpened'() {
      return ['file:///home/user/workspace%20%E2%80%93%20%C3%BC', 'file:///usr/lib/lvce/resources/app/playground']
    },
  })

  const result = await MenuEntriesOpenRecent.getMenuEntries(10)
  expect(result).toEqual([
    {
      args: ['file:///home/user/workspace%20%E2%80%93%20%C3%BC'],
      command: 'Workspace.setUri',
      flags: MenuItemFlags.None,
      label: '~/workspace – ü',
    },
    {
      args: ['file:///usr/lib/lvce/resources/app/playground'],
      command: 'Workspace.setUri',
      flags: MenuItemFlags.None,
      label: '/usr/lib/lvce/resources/app/playground',
    },
    MenuEntrySeparator.menuEntrySeparator,
    {
      command: 'QuickPick.showRecent',
      flags: MenuItemFlags.None,
      id: 'more',
      label: 'More ...',
    },
    MenuEntrySeparator.menuEntrySeparator,
    {
      command: 'RecentlyOpened.clearRecentlyOpened',
      flags: MenuItemFlags.None,
      id: 'clearRecentlyOpened',
      label: 'Clear Recently Opened',
    },
  ])
  expect(_mockRpc.invocations).toEqual([['RecentlyOpened.getRecentlyOpened']])
})

test.each([
  [0, 0],
  [1, 1],
  [3, 3],
])('getMenuEntries - limits recent entries to %s', async (limit, expectedCount) => {
  using _mockRpc = RendererWorker.registerMockRpc({
    'RecentlyOpened.getRecentlyOpened'() {
      return ['file:///home/user/first.txt', 'file:///home/user/second.txt', 'file:///home/user/third.txt', 'file:///home/user/fourth.txt']
    },
  })

  const result = await MenuEntriesOpenRecent.getMenuEntries(limit)
  const recentEntries = result.filter((entry) => entry.command === 'Workspace.setUri')
  expect(recentEntries).toHaveLength(expectedCount)
  expect(recentEntries.map((entry) => entry.args?.[0])).toEqual(
    ['file:///home/user/first.txt', 'file:///home/user/second.txt', 'file:///home/user/third.txt'].slice(0, expectedCount),
  )
  expect(result).toEqual(expect.arrayContaining([expect.objectContaining({ id: 'more' }), expect.objectContaining({ id: 'clearRecentlyOpened' })]))
})
