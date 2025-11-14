import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'

export const getMenuEntriesTitleBarContextMenu = async (state: TitleBarMenuBarState): Promise<readonly MenuEntry[]> => {
  // TODO checked state should be depending on whether or not that feature is currently visible or not
  return [
    {
      id: 'MenuBar',
      label: 'menu bar',
      flags: MenuItemFlags.Checked,
      command: '',
    },
    {
      id: 'Command center',
      label: 'command center',
      flags: MenuItemFlags.Checked,
      command: '',
    },
    {
      id: 'layout controls',
      label: 'layout controls',
      flags: MenuItemFlags.Checked,
      command: '',
    },
  ]
}
