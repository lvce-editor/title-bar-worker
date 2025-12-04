import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as FileStrings from '../FileStrings/FileStrings.ts'
import * as MenuEntryId from '../MenuEntryId/MenuEntryId.ts'
import * as MenuEntrySeparator from '../MenuEntrySeparator/MenuEntrySeparator.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'
import * as PlatformType from '../PlatformType/PlatformType.ts'

export const getMenuEntries = (platform: number): readonly MenuEntry[] => {
  const entries: MenuEntry[] = [
    {
      command: '-1',
      flags: MenuItemFlags.None,
      id: 'newFile',
      label: FileStrings.newFile(),
    },
    {
      command: /* Window.openNew */ 'Window.openNew',
      flags: MenuItemFlags.None,
      id: 'newWindow',
      label: FileStrings.newWindow(),
    },
    MenuEntrySeparator.menuEntrySeparator,
    {
      command: 'Dialog.openFile',
      flags: MenuItemFlags.None,
      id: 'openFile',
      label: FileStrings.openFile(),
    },
    {
      command: 'Dialog.openFolder',
      flags: MenuItemFlags.RestoreFocus,
      id: 'openFolder',
      label: FileStrings.openFolder(),
    },
    {
      command: '',
      flags: MenuItemFlags.SubMenu,
      id: MenuEntryId.OpenRecent,
      label: FileStrings.openRecent(),
    },
    MenuEntrySeparator.menuEntrySeparator,
    {
      command: 'Main.save',
      flags: MenuItemFlags.None,
      id: 'save',
      label: FileStrings.save(),
    },
    {
      command: 'Main.saveAll',
      flags: MenuItemFlags.None,
      id: 'saveAll',
      label: FileStrings.saveAll(),
    },
  ]
  if (platform === PlatformType.Electron) {
    entries.push(MenuEntrySeparator.menuEntrySeparator, {
      command: 'Chrome.exit',
      flags: MenuItemFlags.Ignore,
      id: 'exit',
      label: FileStrings.exit(),
    })
  }
  return entries
}
