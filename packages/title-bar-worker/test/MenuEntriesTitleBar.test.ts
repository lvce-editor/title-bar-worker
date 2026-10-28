import { expect, test } from '@jest/globals'
import { PlatformType } from '@lvce-editor/constants'
import { MenuEntryId } from '@lvce-editor/constants'
import * as MenuEntriesTitleBar from '../src/parts/MenuEntriesTitleBar/MenuEntriesTitleBar.ts'

test('getMenuEntries - web workspace without remote connection', async () => {
  const entries = await MenuEntriesTitleBar.getMenuEntries(PlatformType.Web, 'file:///home/user/project')

  expect(entries.map((entry) => entry.id)).not.toContain(MenuEntryId.Terminal)
})

test('getMenuEntries - web workspace connected through remote ssh', async () => {
  const entries = await MenuEntriesTitleBar.getMenuEntries(PlatformType.Web, 'remote-ssh://host/home/user/project')

  expect(entries.map((entry) => entry.id)).toContain(MenuEntryId.Terminal)
})

test('getMenuEntries - remote platform includes terminal', async () => {
  const entries = await MenuEntriesTitleBar.getMenuEntries(PlatformType.Remote)

  expect(entries.map((entry) => entry.id)).toContain(MenuEntryId.Terminal)
})

test('getMenuEntries - electron platform includes terminal', async () => {
  const entries = await MenuEntriesTitleBar.getMenuEntries(PlatformType.Electron)

  expect(entries.map((entry) => entry.id)).toContain(MenuEntryId.Terminal)
})
