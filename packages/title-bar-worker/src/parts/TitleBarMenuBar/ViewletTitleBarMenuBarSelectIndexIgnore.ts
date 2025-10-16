import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import type { VisibleMenuItem } from '../VisibleMenuItem/VisibleMenuItem.ts'
import * as ExecuteMenuItemcommand from '../ExecuteMenuItemCommand/ExecuteMenuItemCommand.ts'

export const selectIndexIgnore = async (state: TitleBarMenuBarState, item: VisibleMenuItem): Promise<TitleBarMenuBarState> => {
  await ExecuteMenuItemcommand.executeMenuItemCommand(item)
  return state
}
