import { MenuEntryId } from '@lvce-editor/constants'
import type { ContextMenuProps } from '../ContextMenuProps/ContextMenuProps.ts'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { getMenuEntriesTitleBarContextMenu } from '../GetMenuEntriesTitleBarContextMenu/GetMenuEntriesTitleBarContextMenu.ts'
import { MenuIdAppearance, MenuIdEditorLayout, MenuIdSwitchEditor, MenuIdSwitchGroup, MenuIdTitleBarContextMenu } from '../GetMenuIds/GetMenuIds.ts'
import * as HasActiveTextEditor from '../HasActiveTextEditor/HasActiveTextEditor.ts'
import * as MenuEntriesAppearance from '../MenuEntriesAppearance/MenuEntriesAppearance.ts'
import * as MenuEntriesEdit from '../MenuEntriesEdit/MenuEntriesEdit.ts'
import * as MenuEntriesEditorLayout from '../MenuEntriesEditorLayout/MenuEntriesEditorLayout.ts'
import * as MenuEntriesFile from '../MenuEntriesFile/MenuEntriesFile.ts'
import * as MenuEntriesGo from '../MenuEntriesGo/MenuEntriesGo.ts'
import * as MenuEntriesHelp from '../MenuEntriesHelp/MenuEntriesHelp.ts'
import * as MenuEntriesOpenRecent from '../MenuEntriesOpenRecent/MenuEntriesOpenRecent.ts'
import * as MenuEntriesRun from '../MenuEntriesRun/MenuEntriesRun.ts'
import * as MenuEntriesSelection from '../MenuEntriesSelection/MenuEntriesSelection.ts'
import * as MenuEntriesTerminal from '../MenuEntriesTerminal/MenuEntriesTerminal.ts'
import * as MenuEntriesTitleBar from '../MenuEntriesTitleBar/MenuEntriesTitleBar.ts'
import * as MenuEntriesView from '../MenuEntriesView/MenuEntriesView.ts'

const DEFAULT_MAIN_AREA_UID = 2

export const getMenuEntries2 = async (state: TitleBarMenuBarState, props: ContextMenuProps): Promise<readonly MenuEntry[]> => {
  switch (props.menuId) {
    case MenuEntryId.Edit:
      return MenuEntriesEdit.getMenuEntries()
    case MenuEntryId.File:
      return MenuEntriesFile.getMenuEntries(
        props.platform,
        undefined,
        await HasActiveTextEditor.hasActiveTextEditor(state.mainAreaUid ?? DEFAULT_MAIN_AREA_UID),
      )
    case MenuEntryId.Go:
      return MenuEntriesGo.getMenuEntries()
    case MenuEntryId.Help:
      return MenuEntriesHelp.getMenuEntries(props.platform)
    case MenuEntryId.OpenRecent:
      return MenuEntriesOpenRecent.getMenuEntries()
    case MenuEntryId.Run:
      return MenuEntriesRun.getMenuEntries()
    case MenuEntryId.Selection:
      return MenuEntriesSelection.getMenuEntries()
    case MenuEntryId.Terminal:
      return MenuEntriesTerminal.getMenuEntries()
    case MenuEntryId.TitleBar:
      return MenuEntriesTitleBar.getMenuEntries(props.platform)
    case MenuEntryId.TitleBarContextMenu:
    case MenuIdTitleBarContextMenu:
      return getMenuEntriesTitleBarContextMenu(state)
    case MenuEntryId.View:
      return MenuEntriesView.getMenuEntries()
    // @ts-ignore
    case MenuIdAppearance:
      return MenuEntriesAppearance.getMenuEntries()
    // @ts-ignore
    case MenuIdEditorLayout:
      return MenuEntriesEditorLayout.getMenuEntries()
    // @ts-ignore
    case MenuIdSwitchEditor:
      return MenuEntriesGo.getMenuEntriesSwitchEditor()
    // @ts-ignore
    case MenuIdSwitchGroup:
      return MenuEntriesGo.getMenuEntriesSwitchGroup()
    default:
      return []
  }
}
