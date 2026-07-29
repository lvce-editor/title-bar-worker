import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as MenuEntriesOpenRecent from '../src/parts/MenuEntriesOpenRecent/MenuEntriesOpenRecent.ts'
import * as MenuEntrySeparator from '../src/parts/MenuEntrySeparator/MenuEntrySeparator.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'

test('getMenuEntries - abbreviates home directory in labels and keeps original args', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'RecentlyOpened.getRecentlyOpened'() {
      return ['file:///home/user/project', 'file:///usr/lib/lvce/resources/app/playground']
    },
  })

  const result = await MenuEntriesOpenRecent.getMenuEntries()
  expect(result).toEqual([
    {
      args: ['file:///home/user/project'],
      command: 'Workspace.setPath',
      flags: MenuItemFlags.None,
      label: '~/project',
    },
    {
      args: ['file:///usr/lib/lvce/resources/app/playground'],
      command: 'Workspace.setPath',
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
  expect(mockRpc.invocations).toEqual([['RecentlyOpened.getRecentlyOpened']])
})
