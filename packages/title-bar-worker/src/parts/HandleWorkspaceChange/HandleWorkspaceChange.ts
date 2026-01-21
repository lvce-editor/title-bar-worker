import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { getTitle } from '../GetTitle/GetTitle.ts'

// TODO in the future, it could also be a multi-root workspace
export const handleWorkspaceChange = async (state: TitleBarMenuBarState, uri: string): Promise<TitleBarMenuBarState> => {
  const title = getTitle(uri)
  return {
    ...state,
    title,
    workspaceUri: uri,
  }
}
