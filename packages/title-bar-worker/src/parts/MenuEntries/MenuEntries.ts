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

const menus = [
  MenuEntriesEdit,
  MenuEntriesFile,
  MenuEntriesGo,
  MenuEntriesHelp,
  MenuEntriesRun,
  MenuEntriesSelection,
  MenuEntriesTerminal,
  MenuEntriesTitleBar,
  MenuEntriesView,
  MenuEntriesOpenRecent,
]

export const getMenus = (): any => {
  return menus
}

export const getMenuEntries = async (id: any, ...args: any) => {
  try {
    const module = menus[0]
    // @ts-ignore
    const inject = module.inject || []
    // @ts-ignore
    return module.getMenuEntries(...args)
  } catch (error) {
    throw new VError(error, `Failed to load menu entries for id ${id}`)
  }
}
