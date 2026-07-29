import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import { MenuIdSwitchEditor, MenuIdSwitchGroup } from '../GetMenuIds/GetMenuIds.ts'
import { menuEntrySeparator } from '../MenuEntrySeparator/MenuEntrySeparator.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'

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
    notImplementedEntry('back', 'Back'),
    notImplementedEntry('forward', 'Forward'),
    notImplementedEntry('lastEditLocation', 'Last Edit Location'),
    menuEntrySeparator,
    {
      command: '',
      flags: MenuItemFlags.SubMenu,
      id: MenuIdSwitchEditor,
      label: 'Switch Editor',
    },
    {
      command: '',
      flags: MenuItemFlags.SubMenu,
      id: MenuIdSwitchGroup,
      label: 'Switch Group',
    },
    menuEntrySeparator,
    {
      command: 'QuickPick.showFile',
      flags: MenuItemFlags.None,
      id: 'goToFile',
      label: 'Go to File...',
    },
    {
      args: ['workspace-symbol'],
      command: 'QuickPick.show',
      flags: MenuItemFlags.None,
      id: 'goToSymbolInWorkspace',
      label: 'Go to Symbol in Workspace...',
    },
    menuEntrySeparator,
    notImplementedEntry('goToSymbolInEditor', 'Go to Symbol in Editor...'),
    notImplementedEntry('goToDefinition', 'Go to Definition'),
    notImplementedEntry('goToDeclaration', 'Go to Declaration'),
    notImplementedEntry('goToTypeDefinition', 'Go to Type Definition'),
    notImplementedEntry('goToImplementations', 'Go to Implementations'),
    notImplementedEntry('goToReferences', 'Go to References'),
    menuEntrySeparator,
    notImplementedEntry('goToLineColumn', 'Go to Line/Column...'),
    notImplementedEntry('goToBracket', 'Go to Bracket'),
    menuEntrySeparator,
    notImplementedEntry('nextProblem', 'Next Problem'),
    notImplementedEntry('previousProblem', 'Previous Problem'),
    menuEntrySeparator,
    notImplementedEntry('nextChange', 'Next Change'),
    notImplementedEntry('previousChange', 'Previous Change'),
  ]
}

export const getMenuEntriesSwitchEditor = (): readonly MenuEntry[] => {
  return [
    notImplementedEntry('nextEditor', 'Next Editor', 'Ctrl+PageDown'),
    notImplementedEntry('previousEditor', 'Previous Editor', 'Ctrl+PageUp'),
    menuEntrySeparator,
    notImplementedEntry('nextUsedEditor', 'Next Used Editor'),
    notImplementedEntry('previousUsedEditor', 'Previous Used Editor'),
    menuEntrySeparator,
    notImplementedEntry('nextEditorInGroup', 'Next Editor in Group', 'Ctrl+K Ctrl+PageDown'),
    notImplementedEntry('previousEditorInGroup', 'Previous Editor in Group', 'Ctrl+K Ctrl+PageUp'),
    notImplementedEntry('nextUsedEditorInGroup', 'Next Used Editor in Group'),
    notImplementedEntry('previousUsedEditorInGroup', 'Previous Used Editor in Group'),
  ]
}

export const getMenuEntriesSwitchGroup = (): readonly MenuEntry[] => {
  return [
    notImplementedEntry('nextGroup', 'Next Group'),
    notImplementedEntry('previousGroup', 'Previous Group'),
    menuEntrySeparator,
    notImplementedEntry('groupOne', 'Group 1'),
    notImplementedEntry('groupTwo', 'Group 2'),
    notImplementedEntry('groupThree', 'Group 3'),
    notImplementedEntry('groupFour', 'Group 4'),
    notImplementedEntry('groupFive', 'Group 5'),
    notImplementedEntry('lastGroup', 'Last Group'),
  ]
}
