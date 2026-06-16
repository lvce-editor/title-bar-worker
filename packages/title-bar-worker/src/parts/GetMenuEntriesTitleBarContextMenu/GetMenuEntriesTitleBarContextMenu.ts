import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'
import * as TitleBarStrings from '../TitleBarStrings/TitleBarStrings.ts'

export const getMenuEntriesTitleBarContextMenu = async (state: TitleBarMenuBarState): Promise<readonly MenuEntry[]> => {
  const { commandCenterEnabled, titleBarMenuBarEnabled } = state
  let menuBarCommand = 'TitleBar.showMenuBar'
  let menuBarFlags = MenuItemFlags.Unchecked
  if (titleBarMenuBarEnabled) {
    menuBarCommand = 'TitleBar.hideMenuBar'
    menuBarFlags = MenuItemFlags.Checked
  }
  let commandCenterCommand = 'TitleBar.showCommandCenter'
  let commandCenterFlags = MenuItemFlags.Unchecked
  if (commandCenterEnabled) {
    commandCenterCommand = 'TitleBar.hideCommandCenter'
    commandCenterFlags = MenuItemFlags.Checked
  }
  // TODO checked state should be depending on whether or not that feature is currently visible or not
  return [
    {
      command: menuBarCommand,
      flags: menuBarFlags,
      id: 'MenuBar',
      label: TitleBarStrings.menuBar(),
    },
    {
      command: commandCenterCommand,
      flags: commandCenterFlags,
      id: 'Command center',
      label: TitleBarStrings.commandCenter(),
    },
    {
      command: '',
      flags: MenuItemFlags.Checked,
      id: 'layout controls',
      label: 'layout controls',
    },
  ]
}
