import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as I18NString from '../I18NString/I18NString.ts'
import * as MenuEntrySeparator from '../MenuEntrySeparator/MenuEntrySeparator.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'
import * as UiStrings from '../UiStrings/UiStrings.ts'

export const getMenuEntries = (): readonly MenuEntry[] => {
  return [
    {
      command: 'MainArea.splitUp',
      flags: MenuItemFlags.None,
      id: 'splitUp',
      keyboardShortCut: 'Ctrl+K Ctrl+\\',
      label: I18NString.i18nString(UiStrings.SplitUp),
    },
    {
      command: 'MainArea.splitDown',
      flags: MenuItemFlags.None,
      id: 'splitDown',
      label: I18NString.i18nString(UiStrings.SplitDown),
    },
    {
      command: 'MainArea.splitLeft',
      flags: MenuItemFlags.None,
      id: 'splitLeft',
      label: I18NString.i18nString(UiStrings.SplitLeft),
    },
    {
      command: 'MainArea.splitRight',
      flags: MenuItemFlags.None,
      id: 'splitRight',
      label: I18NString.i18nString(UiStrings.SplitRight),
    },
    MenuEntrySeparator.menuEntrySeparator,
    {
      command: 'MainArea.moveIntoNewWindow',
      flags: MenuItemFlags.None,
      id: 'moveEditorIntoNewWindow',
      label: I18NString.i18nString(UiStrings.MoveEditorIntoNewWindow),
    },
    {
      command: 'MainArea.copyIntoNewWindow',
      flags: MenuItemFlags.None,
      id: 'copyEditorIntoNewWindow',
      keyboardShortCut: 'Ctrl+K O',
      label: I18NString.i18nString(UiStrings.CopyEditorIntoNewWindow),
    },
    MenuEntrySeparator.menuEntrySeparator,
    {
      command: 'MainArea.setEditorLayoutSingle',
      flags: MenuItemFlags.None,
      id: 'single',
      label: I18NString.i18nString(UiStrings.Single),
    },
    {
      command: 'MainArea.setEditorLayoutTwoColumns',
      flags: MenuItemFlags.None,
      id: 'twoColumns',
      label: I18NString.i18nString(UiStrings.TwoColumns),
    },
    {
      command: 'MainArea.setEditorLayoutThreeColumns',
      flags: MenuItemFlags.None,
      id: 'threeColumns',
      label: I18NString.i18nString(UiStrings.ThreeColumns),
    },
    {
      command: 'MainArea.setEditorLayoutTwoRows',
      flags: MenuItemFlags.None,
      id: 'twoRows',
      label: I18NString.i18nString(UiStrings.TwoRows),
    },
    {
      command: 'MainArea.setEditorLayoutThreeRows',
      flags: MenuItemFlags.None,
      id: 'threeRows',
      label: I18NString.i18nString(UiStrings.ThreeRows),
    },
    {
      command: 'MainArea.setEditorLayoutGrid',
      flags: MenuItemFlags.None,
      id: 'gridTwoByTwo',
      label: I18NString.i18nString(UiStrings.GridTwoByTwo),
    },
    {
      command: 'MainArea.setEditorLayoutTwoRowsRight',
      flags: MenuItemFlags.None,
      id: 'twoRowsRight',
      label: I18NString.i18nString(UiStrings.TwoRowsRight),
    },
    {
      command: 'MainArea.setEditorLayoutTwoColumnsBottom',
      flags: MenuItemFlags.None,
      id: 'twoColumnsBottom',
      label: I18NString.i18nString(UiStrings.TwoColumnsBottom),
    },
    MenuEntrySeparator.menuEntrySeparator,
    {
      command: 'MainArea.flipEditorLayout',
      flags: MenuItemFlags.None,
      id: 'flipLayout',
      keyboardShortCut: 'Shift+Alt+8',
      label: I18NString.i18nString(UiStrings.FlipLayout),
    },
  ]
}
