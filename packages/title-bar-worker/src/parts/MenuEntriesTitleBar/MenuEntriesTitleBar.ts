import * as MenuEntryId from '../MenuEntryId/MenuEntryId.ts'
import * as Platform from '../Platform/Platform.ts'
import * as PlatformType from '../PlatformType/PlatformType.ts'
import * as MenuEntriesTitleBarRemote from './MenuEntriesTitleBarRemote.ts'
import * as MenuEntriesTitleBarWeb from './MenuEntriesTitleBarWeb.ts'

const getModule = () => {
  switch (Platform.platform) {
    case PlatformType.Web:
      return MenuEntriesTitleBarWeb
    default:
      return MenuEntriesTitleBarRemote
  }
}

export const id = MenuEntryId.TitleBar

export const getMenuEntries = async () => {
  const module = await getModule()
  return module.getMenuEntries()
}
