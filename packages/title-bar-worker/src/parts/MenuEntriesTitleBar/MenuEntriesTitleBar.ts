import * as MenuEntryId from '../MenuEntryId/MenuEntryId.ts'
import * as Platform from '../Platform/Platform.ts'
import * as PlatformType from '../PlatformType/PlatformType.ts'
import * as MenuEntriesTitleBarRemote from './MenuEntriesTitleBarRemote.ts'
import * as MenuEntriesTitleBarWeb from './MenuEntriesTitleBarWeb.ts'

const getFn = (): any => {
  switch (Platform.platform) {
    case PlatformType.Web:
      return MenuEntriesTitleBarWeb.getMenuEntries
    default:
      return MenuEntriesTitleBarRemote.getMenuEntries
  }
}

export const id = MenuEntryId.TitleBar

export const getMenuEntries = async (): Promise<any> => {
  const fn = getFn()
  return fn()
}
