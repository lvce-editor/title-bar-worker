import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { getEntryMap } from '../GetMenuEntryMap/GetMenuEntryMap.ts'
import { getMenuIds } from '../GetMenuIds/GetMenuIds.ts'
import { getWindowId } from '../GetWindowId/GetWindowId.ts'
import * as MenuEntryId from '../MenuEntryId/MenuEntryId.ts'
import * as ToElectronMenu from '../ToElectronMenu/ToElectronMenu.ts'

const setItems = async (items: readonly any[]): Promise<void> => {
  const windowId = await getWindowId()
  return RendererWorker.invoke('WebView.compatSharedProcessInvoke', 'ElectronApplicationMenu.setItems', windowId, items)
}

export const hydrate = async (state: TitleBarMenuBarState): Promise<TitleBarMenuBarState> => {
  const ids = getMenuIds()
  const map = await getEntryMap(state, ids)
  const { commandMap, electronMenu } = ToElectronMenu.toElectronMenu(map, MenuEntryId.TitleBar)
  await setItems(electronMenu)
  // TODO get all menu items
  // TODO send menu items to electron
  // TODO add listener for when menu items change
  return {
    ...state,
    commandMap,
  }
}
