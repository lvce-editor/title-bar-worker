import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as ExecuteMenuItemCommand from '../ExecuteMenuItemCommand/ExecuteMenuItemCommand.ts'

export const selectIndexRestoreEditorFocus = async (state: TitleBarMenuBarState, item: MenuEntry): Promise<TitleBarMenuBarState> => {
  await ExecuteMenuItemCommand.executeMenuItemCommand(item)
  try {
    await RendererWorker.invoke('Main.focus')
  } catch {
    // Focus restoration is best effort and must not turn a successful command into a failure.
  }
  return {
    ...state,
    focusedIndex: -1,
    isMenuOpen: false,
    menus: [],
  }
}
