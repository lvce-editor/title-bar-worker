import type { ContextMenuProps } from '../ContextMenuProps/ContextMenuProps.ts'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { getMenuEntriesTitleBarContextMenu } from '../GetMenuEntriesTitleBarContextMenu/GetMenuEntriesTitleBarContextMenu.ts'
import { MenuIdTitleBarContextMenu } from '../GetMenuIds/GetMenuIds.ts'

export const getMenuEntries2 = async (state: TitleBarMenuBarState, props: ContextMenuProps): Promise<readonly MenuEntry[]> => {
  if (props.menuId === MenuIdTitleBarContextMenu) {
    return getMenuEntriesTitleBarContextMenu(state)
  }
  // TODO
  return []
}
