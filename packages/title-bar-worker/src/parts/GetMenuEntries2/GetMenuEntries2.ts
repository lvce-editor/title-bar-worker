import { MenuEntryId } from '@lvce-editor/constants'
import type { ContextMenuProps } from '../ContextMenuProps/ContextMenuProps.ts'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { getMenuEntriesTitleBarContextMenu } from '../GetMenuEntriesTitleBarContextMenu/GetMenuEntriesTitleBarContextMenu.ts'
import { MenuIdTitleBarContextMenu } from '../GetMenuIds/GetMenuIds.ts'
import * as MenuEntries from '../MenuEntries/MenuEntries.ts'
import * as MenuEntriesTitleBar from '../MenuEntriesTitleBar/MenuEntriesTitleBar.ts'

export const getMenuEntries2 = async (state: TitleBarMenuBarState, props: ContextMenuProps): Promise<readonly MenuEntry[]> => {
  const { platform } = state
  switch (props.menuId) {
    case MenuEntryId.TitleBar:
      return MenuEntriesTitleBar.getMenuEntries(props.platform)
    case MenuEntryId.TitleBarContextMenu:
    case MenuIdTitleBarContextMenu:
      return getMenuEntriesTitleBarContextMenu(state)
    default:
      return MenuEntries.getMenuEntries(props.menuId, 'platform' in props ? props.platform : platform)
  }
}
