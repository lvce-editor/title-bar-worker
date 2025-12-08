import { MenuEntryId } from '@lvce-editor/constants'
import type { VisibleMenuItem } from '../VisibleMenuItem/VisibleMenuItem.ts'
import * as MenuEntriesEdit from '../MenuEntriesEdit/MenuEntriesEdit.ts'
import * as MenuEntriesFile from '../MenuEntriesFile/MenuEntriesFile.ts'
import * as MenuEntriesGo from '../MenuEntriesGo/MenuEntriesGo.ts'
import * as MenuEntriesHelp from '../MenuEntriesHelp/MenuEntriesHelp.ts'
import * as MenuEntriesOpenRecent from '../MenuEntriesOpenRecent/MenuEntriesOpenRecent.ts'
import * as MenuEntriesRun from '../MenuEntriesRun/MenuEntriesRun.ts'
import * as MenuEntriesSelection from '../MenuEntriesSelection/MenuEntriesSelection.ts'
import * as MenuEntriesTerminal from '../MenuEntriesTerminal/MenuEntriesTerminal.ts'
import * as MenuEntriesTitleBar from '../MenuEntriesTitleBar/MenuEntriesTitleBar.ts'
import * as MenuEntriesView from '../MenuEntriesView/MenuEntriesView.ts'
import { VError } from '../VError/VError.ts'

/**
 * @deprecated
 * @returns
 */
export const getMenus = (): any => {
  return []
}

const getFn = (id: string | number): any => {
  switch (id) {
    case MenuEntryId.Edit:
      return MenuEntriesEdit.getMenuEntries
    case MenuEntryId.File:
      return MenuEntriesFile.getMenuEntries
    case MenuEntryId.Go:
      return MenuEntriesGo.getMenuEntries
    case MenuEntryId.Help:
      return MenuEntriesHelp.getMenuEntries
    case MenuEntryId.OpenRecent:
      return MenuEntriesOpenRecent.getMenuEntries
    case MenuEntryId.Run:
      return MenuEntriesRun.getMenuEntries
    case MenuEntryId.Selection:
      return MenuEntriesSelection.getMenuEntries
    case MenuEntryId.Terminal:
      return MenuEntriesTerminal.getMenuEntries
    case MenuEntryId.TitleBar:
      return MenuEntriesTitleBar.getMenuEntries
    case MenuEntryId.View:
      return MenuEntriesView.getMenuEntries
    default:
      return undefined
  }
}

export const getMenuEntries = async (id: string | number, ...args: readonly unknown[]): Promise<readonly VisibleMenuItem[]> => {
  try {
    const fn = getFn(id)
    // @ts-ignore
    return fn(...args)
  } catch (error) {
    throw new VError(error, `Failed to load menu entries for id ${id}`)
  }
}
