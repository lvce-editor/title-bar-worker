import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import { MenuIdSwitchEditor, MenuIdSwitchGroup } from '../GetMenuIds/GetMenuIds.ts'
import * as I18NString from '../I18NString/I18NString.ts'
import { menuEntrySeparator } from '../MenuEntrySeparator/MenuEntrySeparator.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'
import * as UiStrings from '../UiStrings/UiStrings.ts'

const notImplementedMessage = {
  message: 'Not implemented',
}

const notImplementedArgs = [notImplementedMessage, ['OK']]

const notImplementedEntry = (id: string, label: string, keyboardShortCut?: string): MenuEntry => {
  return {
    args: notImplementedArgs,
    command: 'Dialog.showMessage',
    flags: MenuItemFlags.None,
    id,
    ...(keyboardShortCut && { keyboardShortCut }),
    label,
  }
}

export const getMenuEntries = (): readonly MenuEntry[] => {
  return [
    notImplementedEntry('back', I18NString.i18nString(UiStrings.Back)),
    notImplementedEntry('forward', I18NString.i18nString(UiStrings.Forward)),
    notImplementedEntry('lastEditLocation', I18NString.i18nString(UiStrings.LastEditLocation)),
    menuEntrySeparator,
    {
      command: '',
      flags: MenuItemFlags.SubMenu,
      id: MenuIdSwitchEditor,
      label: I18NString.i18nString(UiStrings.SwitchEditor),
    },
    {
      command: '',
      flags: MenuItemFlags.SubMenu,
      id: MenuIdSwitchGroup,
      label: I18NString.i18nString(UiStrings.SwitchGroup),
    },
    menuEntrySeparator,
    {
      command: 'QuickPick.showFile',
      flags: MenuItemFlags.None,
      id: 'goToFile',
      label: I18NString.i18nString(UiStrings.GoToFileWithEllipsis),
    },
    {
      args: ['workspace-symbol'],
      command: 'QuickPick.show',
      flags: MenuItemFlags.None,
      id: 'goToSymbolInWorkspace',
      label: I18NString.i18nString(UiStrings.GoToSymbolInWorkspace),
    },
    menuEntrySeparator,
    notImplementedEntry('goToSymbolInEditor', I18NString.i18nString(UiStrings.GoToSymbolInEditorWithEllipsis)),
    notImplementedEntry('goToDefinition', I18NString.i18nString(UiStrings.GoToDefinition)),
    notImplementedEntry('goToDeclaration', I18NString.i18nString(UiStrings.GoToDeclaration)),
    notImplementedEntry('goToTypeDefinition', I18NString.i18nString(UiStrings.GoToTypeDefinition)),
    notImplementedEntry('goToImplementations', I18NString.i18nString(UiStrings.GoToImplementations)),
    notImplementedEntry('goToReferences', I18NString.i18nString(UiStrings.GoToReferences)),
    menuEntrySeparator,
    notImplementedEntry('goToLineColumn', I18NString.i18nString(UiStrings.GoToLineColumn)),
    notImplementedEntry('goToBracket', I18NString.i18nString(UiStrings.GoToBracket)),
    menuEntrySeparator,
    notImplementedEntry('nextProblem', I18NString.i18nString(UiStrings.NextProblem)),
    notImplementedEntry('previousProblem', I18NString.i18nString(UiStrings.PreviousProblem)),
    menuEntrySeparator,
    notImplementedEntry('nextChange', I18NString.i18nString(UiStrings.NextChange)),
    notImplementedEntry('previousChange', I18NString.i18nString(UiStrings.PreviousChange)),
  ]
}

export const getMenuEntriesSwitchEditor = (): readonly MenuEntry[] => {
  return [
    notImplementedEntry('nextEditor', I18NString.i18nString(UiStrings.NextEditor), 'Ctrl+PageDown'),
    notImplementedEntry('previousEditor', I18NString.i18nString(UiStrings.PreviousEditor), 'Ctrl+PageUp'),
    menuEntrySeparator,
    notImplementedEntry('nextUsedEditor', I18NString.i18nString(UiStrings.NextUsedEditor)),
    notImplementedEntry('previousUsedEditor', I18NString.i18nString(UiStrings.PreviousUsedEditor)),
    menuEntrySeparator,
    notImplementedEntry('nextEditorInGroup', I18NString.i18nString(UiStrings.NextEditorInGroup), 'Ctrl+K Ctrl+PageDown'),
    notImplementedEntry('previousEditorInGroup', I18NString.i18nString(UiStrings.PreviousEditorInGroup), 'Ctrl+K Ctrl+PageUp'),
    notImplementedEntry('nextUsedEditorInGroup', I18NString.i18nString(UiStrings.NextUsedEditorInGroup)),
    notImplementedEntry('previousUsedEditorInGroup', I18NString.i18nString(UiStrings.PreviousUsedEditorInGroup)),
  ]
}

export const getMenuEntriesSwitchGroup = (): readonly MenuEntry[] => {
  return [
    notImplementedEntry('nextGroup', I18NString.i18nString(UiStrings.NextGroup)),
    notImplementedEntry('previousGroup', I18NString.i18nString(UiStrings.PreviousGroup)),
    menuEntrySeparator,
    notImplementedEntry('groupOne', I18NString.i18nString(UiStrings.Group1)),
    notImplementedEntry('groupTwo', I18NString.i18nString(UiStrings.Group2)),
    notImplementedEntry('groupThree', I18NString.i18nString(UiStrings.Group3)),
    notImplementedEntry('groupFour', I18NString.i18nString(UiStrings.Group4)),
    notImplementedEntry('groupFive', I18NString.i18nString(UiStrings.Group5)),
    notImplementedEntry('lastGroup', I18NString.i18nString(UiStrings.LastGroup)),
  ]
}
