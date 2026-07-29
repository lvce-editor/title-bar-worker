import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as I18NString from '../I18NString/I18NString.ts'
import * as MenuEntrySeparator from '../MenuEntrySeparator/MenuEntrySeparator.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'
import * as UiStrings from '../UiStrings/UiStrings.ts'

export const getMenuEntries = (): readonly MenuEntry[] => {
  return [
    {
      command: 'Main.splitUp',
      flags: MenuItemFlags.None,
      id: 'splitUp',
      keyboardShortCut: 'Ctrl+K Ctrl+\\',
      label: I18NString.i18nString(UiStrings.SplitUp),
    },
    {
      command: 'Main.splitDown',
      flags: MenuItemFlags.None,
      id: 'splitDown',
      label: I18NString.i18nString(UiStrings.SplitDown),
    },
    {
      command: 'Main.splitLeft',
      flags: MenuItemFlags.None,
      id: 'splitLeft',
      label: I18NString.i18nString(UiStrings.SplitLeft),
    },
    {
      command: 'Main.splitRight',
      flags: MenuItemFlags.None,
      id: 'splitRight',
      label: I18NString.i18nString(UiStrings.SplitRight),
    },
    MenuEntrySeparator.menuEntrySeparator,
    {
      command: 'Main.moveIntoNewWindow',
      flags: MenuItemFlags.None,
      id: 'moveEditorIntoNewWindow',
      label: I18NString.i18nString(UiStrings.MoveEditorIntoNewWindow),
    },
    {
      command: 'Main.copyIntoNewWindow',
      flags: MenuItemFlags.None,
      id: 'copyEditorIntoNewWindow',
      keyboardShortCut: 'Ctrl+K O',
      label: I18NString.i18nString(UiStrings.CopyEditorIntoNewWindow),
    },
    MenuEntrySeparator.menuEntrySeparator,
    {
      command: 'Main.setEditorLayoutSingle',
      flags: MenuItemFlags.None,
      id: 'single',
      label: I18NString.i18nString(UiStrings.Single),
    },
    {
      command: 'Main.setEditorLayoutTwoColumns',
      flags: MenuItemFlags.None,
      id: 'twoColumns',
      label: I18NString.i18nString(UiStrings.TwoColumns),
    },
    {
      command: 'Main.setEditorLayoutThreeColumns',
      flags: MenuItemFlags.None,
      id: 'threeColumns',
      label: I18NString.i18nString(UiStrings.ThreeColumns),
    },
    {
      command: 'Main.setEditorLayoutTwoRows',
      flags: MenuItemFlags.None,
      id: 'twoRows',
      label: I18NString.i18nString(UiStrings.TwoRows),
    },
    {
      command: 'Main.setEditorLayoutThreeRows',
      flags: MenuItemFlags.None,
      id: 'threeRows',
      label: I18NString.i18nString(UiStrings.ThreeRows),
    },
    {
      command: 'Main.setEditorLayoutGrid',
      flags: MenuItemFlags.None,
      id: 'gridTwoByTwo',
      label: I18NString.i18nString(UiStrings.GridTwoByTwo),
    },
    {
      command: 'Main.setEditorLayoutTwoRowsRight',
      flags: MenuItemFlags.None,
      id: 'twoRowsRight',
      label: I18NString.i18nString(UiStrings.TwoRowsRight),
    },
    {
      command: 'Main.setEditorLayoutTwoColumnsBottom',
      flags: MenuItemFlags.None,
      id: 'twoColumnsBottom',
      label: I18NString.i18nString(UiStrings.TwoColumnsBottom),
    },
    MenuEntrySeparator.menuEntrySeparator,
    {
      command: 'Main.flipEditorLayout',
      flags: MenuItemFlags.None,
      id: 'flipLayout',
      keyboardShortCut: 'Shift+Alt+8',
      label: I18NString.i18nString(UiStrings.FlipLayout),
    },
  ]
}
