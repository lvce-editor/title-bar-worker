import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'
import * as PathDisplay from '../PathDisplay/PathDisplay.ts'

export const toMenuItem = (folder: string): MenuEntry => {
  const homeDir = PathDisplay.getHomeDir(folder)
  const label = PathDisplay.getTitle(homeDir, folder)
  return {
    args: [folder],
    command: 'Workspace.setPath',
    flags: MenuItemFlags.None,
    label,
  }
}
