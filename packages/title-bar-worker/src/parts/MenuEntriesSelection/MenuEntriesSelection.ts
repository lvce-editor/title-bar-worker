import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as EditorStrings from '../EditorStrings/EditorStrings.ts'
import { menuEntrySeparator } from '../MenuEntrySeparator/MenuEntrySeparator.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'

const getCommandFlags = (hasActiveTextEditor: boolean): number => {
  if (hasActiveTextEditor) {
    return MenuItemFlags.RestoreEditorFocus
  }
  return MenuItemFlags.Disabled
}

export const getMenuEntries = (hasActiveTextEditor: boolean = false): readonly MenuEntry[] => {
  const commandFlags = getCommandFlags(hasActiveTextEditor)
  return [
    {
      command: 'Editor.selectAll',
      flags: commandFlags,
      id: 'selectAll',
      label: EditorStrings.selectAll(),
    },
    {
      command: 'Editor.expandSelection',
      flags: commandFlags,
      id: 'expandSelection',
      label: EditorStrings.expandSelection(),
    },
    {
      command: 'Editor.shrinkSelection',
      flags: commandFlags,
      id: 'shrinkSelection',
      label: EditorStrings.shrinkSelection(),
    },
    menuEntrySeparator,
    {
      command: 'Editor.copyLineUp',
      flags: commandFlags,
      id: 'copyLineUp',
      label: EditorStrings.copyLineUp(),
    },
    {
      command: 'Editor.copyLineDown',
      flags: commandFlags,
      id: 'copyLineDown',
      label: EditorStrings.copyLineDown(),
    },
    {
      command: 'Editor.moveLineUp',
      flags: commandFlags,
      id: 'moveLineUp',
      label: EditorStrings.moveLineUp(),
    },
    {
      command: 'Editor.moveLineDown',
      flags: commandFlags,
      id: 'moveLineDown',
      label: EditorStrings.moveLineDown(),
    },
    {
      command: 'Editor.duplicateSelection',
      flags: commandFlags,
      id: 'duplicateSelection',
      label: EditorStrings.duplicateSelection(),
    },
    menuEntrySeparator,
    {
      command: 'Editor.addCursorAbove',
      flags: commandFlags,
      id: 'addCursorAbove',
      label: EditorStrings.addCursorAbove(),
    },
    {
      command: 'Editor.addCursorBelow',
      flags: commandFlags,
      id: 'addCursorBelow',
      label: EditorStrings.addCursorBelow(),
    },
    {
      command: 'Editor.addCursorsToLineEnds',
      flags: commandFlags,
      id: 'addCursorsToLineEnds',
      label: EditorStrings.addCursorsToLineEnds(),
    },
    {
      command: 'Editor.addNextOccurrence',
      flags: commandFlags,
      id: 'addNextOccurrence',
      label: EditorStrings.addNextOccurrence(),
    },
    {
      command: 'Editor.addPreviousOccurrence',
      flags: commandFlags,
      id: 'addPreviousOccurrence',
      label: EditorStrings.addPreviousOccurrence(),
    },
    {
      command: 'Editor.selectAllOccurrences',
      flags: commandFlags,
      id: 'selectAllOccurrences',
      label: EditorStrings.selectAllOccurrences(),
    },
  ]
}
