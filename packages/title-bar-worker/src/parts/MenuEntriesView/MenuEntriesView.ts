import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as I18NString from '../I18NString/I18NString.ts'
import * as MenuEntrySeparator from '../MenuEntrySeparator/MenuEntrySeparator.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'
import * as UiStrings from '../UiStrings/UiStrings.ts'

export const getMenuEntries = (): readonly MenuEntry[] => {
  return [
    {
      command: 'Command.openCommandPalette',
      flags: MenuItemFlags.None,
      id: 'commandPalette',
      label: I18NString.i18nString(UiStrings.CommandPalette),
    },
    {
      command: 'View.openView',
      flags: MenuItemFlags.None,
      id: 'openView',
      label: I18NString.i18nString(UiStrings.OpenView),
    },
    MenuEntrySeparator.menuEntrySeparator,
    {
      command: '',
      flags: MenuItemFlags.SubMenu,
      id: 'appearance',
      label: I18NString.i18nString(UiStrings.Appearance),
    },
    {
      command: '',
      flags: MenuItemFlags.SubMenu,
      id: 'editorLayout',
      label: I18NString.i18nString(UiStrings.EditorLayout),
    },
    MenuEntrySeparator.menuEntrySeparator,
    {
      args: ['Explorer'],
      command: 'Layout.openSideBarViewlet',
      flags: MenuItemFlags.None,
      id: 'explorer',
      label: I18NString.i18nString(UiStrings.Explorer),
    },
    {
      args: ['Search'],
      command: 'Layout.openSideBarViewlet',
      flags: MenuItemFlags.None,
      id: 'search',
      label: I18NString.i18nString(UiStrings.Search),
    },
    {
      args: ['Source Control', true],
      command: 'Layout.openSideBarViewlet',
      flags: MenuItemFlags.None,
      id: 'sourceControl',
      label: I18NString.i18nString(UiStrings.SourceControl),
    },
    {
      args: ['Run And Debug', true],
      command: 'Layout.openSideBarViewlet',
      flags: MenuItemFlags.None,
      id: 'run',
      label: I18NString.i18nString(UiStrings.Run),
    },
    {
      args: ['Extensions', true],
      command: 'Layout.openSideBarViewlet',
      flags: MenuItemFlags.None,
      id: 'extensions',
      label: I18NString.i18nString(UiStrings.Extensions),
    },
    MenuEntrySeparator.menuEntrySeparator,
    {
      args: [true],
      command: 'Layout.openChat',
      flags: MenuItemFlags.None,
      id: 'chat',
      label: I18NString.i18nString(UiStrings.Chat),
    },
    MenuEntrySeparator.menuEntrySeparator,
    {
      args: ['Problems'],
      command: 'Layout.showPanel',
      flags: MenuItemFlags.None,
      id: 'problems',
      label: I18NString.i18nString(UiStrings.Problems),
    },
    {
      args: ['Output'],
      command: 'Layout.showPanel',
      flags: MenuItemFlags.None,
      id: 'output',
      label: I18NString.i18nString(UiStrings.Output),
    },
    {
      args: ['Terminals'],
      command: 'Layout.showPanel',
      flags: MenuItemFlags.None,
      id: 'terminal',
      label: I18NString.i18nString(UiStrings.Terminal),
    },
    {
      command: 'Editor.toggleWordWrap',
      flags: MenuItemFlags.None,
      id: 'wordWrap',
      label: I18NString.i18nString(UiStrings.WordWrap),
    },
  ]
}
