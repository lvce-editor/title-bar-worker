import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as Diff3 from '../Diff3/Diff3.ts'
import * as ExecuteMenuItemcommand from '../ExecuteMenuItemCommand/ExecuteMenuItemCommand.ts'
import * as Render3 from '../Render3/Render3.ts'
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
      const commands = await Render3.render3(uid, Diff3.diff3(uid))
      await RendererWorker.invoke('Viewlet.applyCommands', commands)
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
    TitleBarMenuBarStates.set(uid, TitleBarMenuBarStates.get(uid).oldState, finalState, finalState)
  }
  return finalState
}
