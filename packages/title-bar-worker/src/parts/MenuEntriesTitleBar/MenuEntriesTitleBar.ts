import type { VisibleMenuItem } from '../VisibleMenuItem/VisibleMenuItem.ts'
import * as PlatformType from '../PlatformType/PlatformType.ts'
import * as MenuEntriesTitleBarRemote from './MenuEntriesTitleBarRemote.ts'
import * as MenuEntriesTitleBarWeb from './MenuEntriesTitleBarWeb.ts'

interface Handler {
  (): readonly any[]
}

const getFn = (platform: number): Handler => {
  switch (platform) {
    case PlatformType.Web:
      return MenuEntriesTitleBarWeb.getMenuEntries
    default:
      return MenuEntriesTitleBarRemote.getMenuEntries
  }
}

export const getMenuEntries = async (platform: number): Promise<readonly VisibleMenuItem[]> => {
  const fn = getFn(platform)
  return fn()
}
