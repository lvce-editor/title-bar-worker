import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as ExecuteMenuItemCommand from '../ExecuteMenuItemCommand/ExecuteMenuItemCommand.ts'

export const selectIndexRestoreFocus = async (state: TitleBarMenuBarState, item: any): Promise<TitleBarMenuBarState> => {
  await ExecuteMenuItemCommand.executeMenuItemCommand(item)
  return {
    ...state,
    isMenuOpen: false,
    menus: [],
  }
}
