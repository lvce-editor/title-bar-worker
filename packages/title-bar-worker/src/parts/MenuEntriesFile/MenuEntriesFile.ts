import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as FileStrings from '../FileStrings/FileStrings.ts'
import * as MenuEntryId from '../MenuEntryId/MenuEntryId.ts'
import * as MenuEntrySeparator from '../MenuEntrySeparator/MenuEntrySeparator.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'
import * as PlatformType from '../PlatformType/PlatformType.ts'

const getAutoSave = async (): Promise<string> => {
  try {
    return await RendererWorker.invoke('Preferences.get', 'files.autoSave')
  } catch {
    return 'off'
  }
}

const isAutoSaveEnabled = (autoSave: string): boolean => {
  return autoSave !== 'off'
}

const getSaveFlags = (hasActiveTextEditor: boolean): number => {
  if (hasActiveTextEditor) {
    return MenuItemFlags.None
  }
  return MenuItemFlags.Disabled
}

export const getMenuEntries = async (platform: number, autoSave?: string, hasActiveTextEditor: boolean = false): Promise<readonly MenuEntry[]> => {
  const autoSaveValue = autoSave ?? (await getAutoSave())
  const saveFlags = getSaveFlags(hasActiveTextEditor)
  const entries: MenuEntry[] = [
    {
      command: 'Main.newFile',
      flags: MenuItemFlags.None,
      id: 'newFile',
      label: FileStrings.newFile(),
    },
    {
      command: 'Window.openNew',
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
      flags: saveFlags,
      id: 'save',
      label: FileStrings.save(),
    },
    {
      command: 'Main.saveAll',
      flags: saveFlags,
      id: 'saveAll',
      label: FileStrings.saveAll(),
    },
    MenuEntrySeparator.menuEntrySeparator,
    {
      command: 'Preferences.toggleAutoSave',
      flags: isAutoSaveEnabled(autoSaveValue) ? MenuItemFlags.Checked : MenuItemFlags.Unchecked,
      id: 'autoSave',
      label: FileStrings.autoSave(),
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
