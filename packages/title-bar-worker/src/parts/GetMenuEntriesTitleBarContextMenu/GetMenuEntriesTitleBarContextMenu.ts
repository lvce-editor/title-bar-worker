import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'

export const getMenuEntriesTitleBarContextMenu = async (state: TitleBarMenuBarState): Promise<readonly MenuEntry[]> => {
  // TODO should return 3 options
  // 1. menu bar (toggle)
  // 2. command center
  // 3. layout controls
  return []
}
