import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'
import * as TitleBarStrings from '../TitleBarStrings/TitleBarStrings.ts'

export const getMenuEntriesTitleBarContextMenu = async (state: TitleBarMenuBarState): Promise<readonly MenuEntry[]> => {
  const { titleBarMenuBarEnabled, commandCenterEnabled } = state
  // TODO checked state should be depending on whether or not that feature is currently visible or not
  return [
    {
      id: 'MenuBar',
      label: TitleBarStrings.menuBar(),
      flags: titleBarMenuBarEnabled ? MenuItemFlags.Checked : MenuItemFlags.Unchecked,
      command: titleBarMenuBarEnabled ? 'TitleBar.hideMenuBar' : 'TitleBar.showMenuBar',
    },
    {
      id: 'Command center',
      label: TitleBarStrings.commandCenter(),
      flags: commandCenterEnabled ? MenuItemFlags.Checked : MenuItemFlags.Unchecked,
      command: commandCenterEnabled ? 'TitleBar.hideCommandCenter' : 'TitleBar.showCommandCenter',
    },
    {
      id: 'layout controls',
      label: 'layout controls',
      flags: MenuItemFlags.Checked,
      command: '',
    },
  ]
}
