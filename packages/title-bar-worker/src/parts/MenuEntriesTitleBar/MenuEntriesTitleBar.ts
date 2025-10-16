import type { VisibleMenuItem } from '../VisibleMenuItem/VisibleMenuItem.ts'
import * as MenuEntryId from '../MenuEntryId/MenuEntryId.ts'
import * as PlatformType from '../PlatformType/PlatformType.ts'
import * as MenuEntriesTitleBarRemote from './MenuEntriesTitleBarRemote.ts'
import * as MenuEntriesTitleBarWeb from './MenuEntriesTitleBarWeb.ts'

const getFn = (platform: number): any => {
  switch (platform) {
    case PlatformType.Web:
      return MenuEntriesTitleBarWeb.getMenuEntries
    default:
      return MenuEntriesTitleBarRemote.getMenuEntries
  }
}

export const id = MenuEntryId.TitleBar

export const getMenuEntries = async (platform: number): Promise<readonly VisibleMenuItem[]> => {
  const fn = getFn(platform)
  return fn()
}
