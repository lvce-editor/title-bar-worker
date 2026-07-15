import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as ExecuteMenuItemCommand from '../ExecuteMenuItemCommand/ExecuteMenuItemCommand.ts'
import * as TitleBarMenuBarStates from '../TitleBarMenuBarStates/TitleBarMenuBarStates.ts'

export const selectIndexRestoreFocus = async (state: TitleBarMenuBarState, item: any): Promise<TitleBarMenuBarState> => {
  await ExecuteMenuItemCommand.executeMenuItemCommand(item)
  const latestState = TitleBarMenuBarStates.get(state.uid)?.newState ?? state
  return {
    ...latestState,
    isMenuOpen: false,
    menus: [],
  }
}
