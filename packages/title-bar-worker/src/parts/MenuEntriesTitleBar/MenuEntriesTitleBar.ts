import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as PlatformType from '../PlatformType/PlatformType.ts'
import * as MenuEntriesTitleBarRemote from './MenuEntriesTitleBarRemote.ts'
import * as MenuEntriesTitleBarWeb from './MenuEntriesTitleBarWeb.ts'

interface Handler {
  (): readonly any[]
}

const isRemoteWorkspace = (workspaceUri: string): boolean => {
  try {
    const { protocol } = new URL(workspaceUri)
    return protocol === 'remote-ssh:' || protocol === 'remote-server:'
  } catch {
    return false
  }
}

const getFn = (platform: number, workspaceUri: string): Handler => {
  switch (platform) {
    case PlatformType.Web:
      if (isRemoteWorkspace(workspaceUri)) {
        return MenuEntriesTitleBarRemote.getMenuEntries
      }
      return MenuEntriesTitleBarWeb.getMenuEntries
    default:
      return MenuEntriesTitleBarRemote.getMenuEntries
  }
}

export const getMenuEntries = async (platform: number, workspaceUri = ''): Promise<readonly MenuEntry[]> => {
  const fn = getFn(platform, workspaceUri)
  return fn()
}
