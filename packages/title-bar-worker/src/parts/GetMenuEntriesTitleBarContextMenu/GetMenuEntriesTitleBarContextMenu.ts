import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'
import * as TitleBarStrings from '../TitleBarStrings/TitleBarStrings.ts'

export const getMenuEntriesTitleBarContextMenu = async (state: TitleBarMenuBarState): Promise<readonly MenuEntry[]> => {
  const { commandCenterEnabled, titleBarMenuBarEnabled, uid } = state
  // TODO checked state should be depending on whether or not that feature is currently visible or not
  return [
    {
      args: [uid, titleBarMenuBarEnabled ? 'hideMenuBar' : 'showMenuBar'],
      command: 'Viewlet.executeViewletCommand',
      flags: titleBarMenuBarEnabled ? MenuItemFlags.Checked : MenuItemFlags.Unchecked,
      id: 'MenuBar',
      label: TitleBarStrings.menuBar(),
    },
    {
      args: [uid, commandCenterEnabled ? 'hideCommandCenter' : 'showCommandCenter'],
      command: 'Viewlet.executeViewletCommand',
      flags: commandCenterEnabled ? MenuItemFlags.Checked : MenuItemFlags.Unchecked,
      id: 'Command center',
      label: TitleBarStrings.commandCenter(),
    },
    {
      command: '',
      flags: MenuItemFlags.Checked,
      id: 'layout controls',
      label: TitleBarStrings.layoutControls(),
    },
  ]
}
