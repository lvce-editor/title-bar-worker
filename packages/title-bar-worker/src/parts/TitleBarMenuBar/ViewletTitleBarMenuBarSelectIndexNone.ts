import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as ExecuteMenuItemcommand from '../ExecuteMenuItemCommand/ExecuteMenuItemCommand.ts'

export const selectIndexNone = async (state: TitleBarMenuBarState, item: any): Promise<TitleBarMenuBarState> => {
  await ExecuteMenuItemcommand.executeMenuItemCommand(item)
  return {
    ...state,
    menus: [],
    isMenuOpen: false,
  }
}
