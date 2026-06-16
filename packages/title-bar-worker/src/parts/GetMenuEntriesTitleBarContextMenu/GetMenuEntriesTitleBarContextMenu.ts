import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'
import * as TitleBarStrings from '../TitleBarStrings/TitleBarStrings.ts'

export const getMenuEntriesTitleBarContextMenu = async (state: TitleBarMenuBarState): Promise<readonly MenuEntry[]> => {
  const { commandCenterEnabled, titleBarMenuBarEnabled } = state
  // TODO checked state should be depending on whether or not that feature is currently visible or not
  return [
    {
      command: `TitleBar.${titleBarMenuBarEnabled ? 'hide' : 'show'}MenuBar`,
      flags: titleBarMenuBarEnabled ? MenuItemFlags.Checked : MenuItemFlags.Unchecked,
      id: 'MenuBar',
      label: TitleBarStrings.menuBar(),
    },
    {
      command: `TitleBar.${commandCenterEnabled ? 'hide' : 'show'}CommandCenter`,
      flags: commandCenterEnabled ? MenuItemFlags.Checked : MenuItemFlags.Unchecked,
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
