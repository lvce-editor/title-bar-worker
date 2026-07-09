import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import { MenuIdSwitchEditor, MenuIdSwitchGroup } from '../GetMenuIds/GetMenuIds.ts'
import { menuEntrySeparator } from '../MenuEntrySeparator/MenuEntrySeparator.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'

const notImplementedMessage = {
  message: 'Not implemented',
}

const notImplementedArgs = [notImplementedMessage, ['OK']]

const notImplementedEntry = (id: string, label: string): MenuEntry => {
  return {
    args: notImplementedArgs,
    command: 'Dialog.showMessage',
    flags: MenuItemFlags.None,
    id,
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
    notImplementedEntry('goToFile', 'Go to File...'),
    notImplementedEntry('goToSymbolInWorkspace', 'Go to Symbol in Workspace...'),
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
    notImplementedEntry('firstSideInEditor', 'First Side in Editor'),
    notImplementedEntry('secondSideInEditor', 'Second Side in Editor'),
    menuEntrySeparator,
    notImplementedEntry('nextEditor', 'Next Editor'),
    notImplementedEntry('previousEditor', 'Previous Editor'),
    menuEntrySeparator,
    notImplementedEntry('nextUsedEditor', 'Next Used Editor'),
    notImplementedEntry('previousUsedEditor', 'Previous Used Editor'),
    menuEntrySeparator,
    notImplementedEntry('nextEditorInGroup', 'Next Editor in Group'),
    notImplementedEntry('previousEditorInGroup', 'Previous Editor in Group'),
    menuEntrySeparator,
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
