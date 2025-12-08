import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as ExecuteMenuItemcommand from '../ExecuteMenuItemCommand/ExecuteMenuItemCommand.ts'

export const selectIndexIgnore = async (state: TitleBarMenuBarState, item: MenuEntry): Promise<TitleBarMenuBarState> => {
  await ExecuteMenuItemcommand.executeMenuItemCommand(item)
  return state
}
