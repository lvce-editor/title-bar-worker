import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { getEntryMap } from '../GetMenuEntryMap/GetMenuEntryMap.ts'
import { getWindowId } from '../GetWindowId/GetWindowId.ts'
import * as MenuEntriesEdit from '../MenuEntriesEdit/MenuEntriesEdit.ts'
import * as MenuEntriesFile from '../MenuEntriesFile/MenuEntriesFile.ts'
import * as MenuEntriesGo from '../MenuEntriesGo/MenuEntriesGo.ts'
import * as MenuEntriesHelp from '../MenuEntriesHelp/MenuEntriesHelp.ts'
import * as MenuEntriesRun from '../MenuEntriesRun/MenuEntriesRun.ts'
import * as MenuEntriesSelection from '../MenuEntriesSelection/MenuEntriesSelection.ts'
import * as MenuEntriesTerminal from '../MenuEntriesTerminal/MenuEntriesTerminal.ts'
import * as MenuEntriesView from '../MenuEntriesView/MenuEntriesView.ts'
import * as MenuEntryId from '../MenuEntryId/MenuEntryId.ts'
import * as ToElectronMenu from '../ToElectronMenu/ToElectronMenu.ts'

const menuEntries = [
  MenuEntriesFile,
  MenuEntriesEdit,
  MenuEntriesSelection,
  MenuEntriesView,
  MenuEntriesGo,
  MenuEntriesRun,
  MenuEntriesTerminal,
  MenuEntriesHelp,
  // MenuEntriesTitleBar,
]

const setItems = async (items: readonly any[]): Promise<void> => {
  const windowId = await getWindowId()
  return RendererWorker.invoke('ElectronApplicationMenu.setItems', windowId, items)
}

export const hydrate = async (state: TitleBarMenuBarState): Promise<TitleBarMenuBarState> => {
  const map = await getEntryMap(menuEntries)
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
