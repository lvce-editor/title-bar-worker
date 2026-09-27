import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as ExecuteMenuItemcommand from '../ExecuteMenuItemCommand/ExecuteMenuItemCommand.ts'
import * as RenderMenus from '../RenderMenus/RenderMenus.ts'
import * as TitleBarMenuBarStates from '../TitleBarMenuBarStates/TitleBarMenuBarStates.ts'

export const selectIndexNone = async (state: TitleBarMenuBarState, item: MenuEntry): Promise<TitleBarMenuBarState> => {
  const { uid } = state
  const storedState = TitleBarMenuBarStates.get(uid)
  const latestState = storedState?.newState ?? state
  const closedState = {
    ...latestState,
    focusedIndex: -1,
    isMenuOpen: false,
    menus: [],
  }
  if (storedState) {
    TitleBarMenuBarStates.set(uid, storedState.oldState, closedState, closedState)
    if (latestState.menus.length > 0) {
      const [command, ...args] = RenderMenus.renderMenus(latestState, closedState)
      await RendererWorker.invoke(command, ...args)
    }
  }
  await ExecuteMenuItemcommand.executeMenuItemCommand(item)
  const latestCommandState = TitleBarMenuBarStates.get(uid)?.newState ?? closedState
  const finalState = {
    ...latestCommandState,
    focusedIndex: -1,
    isMenuOpen: false,
    menus: [],
  }
  if (storedState) {
    TitleBarMenuBarStates.set(uid, finalState, finalState, finalState)
  }
  return finalState
}
