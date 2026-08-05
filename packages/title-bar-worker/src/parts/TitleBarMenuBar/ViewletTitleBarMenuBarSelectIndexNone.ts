import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as ExecuteMenuItemcommand from '../ExecuteMenuItemCommand/ExecuteMenuItemCommand.ts'
import * as TitleBarMenuBarStates from '../TitleBarMenuBarStates/TitleBarMenuBarStates.ts'

export const selectIndexNone = async (state: TitleBarMenuBarState, item: MenuEntry): Promise<TitleBarMenuBarState> => {
  const { uid } = state
  await ExecuteMenuItemcommand.executeMenuItemCommand(item)
  const latestState = TitleBarMenuBarStates.get(uid)?.newState ?? state
  return {
    ...latestState,
    focusedIndex: -1,
    isMenuOpen: false,
    menus: [],
  }
}
