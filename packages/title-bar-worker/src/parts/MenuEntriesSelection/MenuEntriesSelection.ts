import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as EditorStrings from '../EditorStrings/EditorStrings.ts'
import { menuEntrySeparator } from '../MenuEntrySeparator/MenuEntrySeparator.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'

export const getMenuEntries = (): readonly MenuEntry[] => {
  return [
    {
      command: 'Editor.selectAll',
      flags: MenuItemFlags.RestoreEditorFocus,
      id: 'selectAll',
      label: EditorStrings.selectAll(),
    },
    {
      command: 'Editor.expandSelection',
      flags: MenuItemFlags.RestoreEditorFocus,
      id: 'expandSelection',
      label: EditorStrings.expandSelection(),
    },
    {
      command: 'Editor.shrinkSelection',
      flags: MenuItemFlags.RestoreEditorFocus,
      id: 'shrinkSelection',
      label: EditorStrings.shrinkSelection(),
    },
    menuEntrySeparator,
    {
      command: 'Editor.copyLineUp',
      flags: MenuItemFlags.RestoreEditorFocus,
      id: 'copyLineUp',
      label: EditorStrings.copyLineUp(),
    },
    {
      command: 'Editor.copyLineDown',
      flags: MenuItemFlags.RestoreEditorFocus,
      id: 'copyLineDown',
      label: EditorStrings.copyLineDown(),
    },
    {
      command: 'Editor.moveLineUp',
      flags: MenuItemFlags.RestoreEditorFocus,
      id: 'moveLineUp',
      label: EditorStrings.moveLineUp(),
    },
    {
      command: 'Editor.moveLineDown',
      flags: MenuItemFlags.RestoreEditorFocus,
      id: 'moveLineDown',
      label: EditorStrings.moveLineDown(),
    },
    {
      command: 'Editor.duplicateSelection',
      flags: MenuItemFlags.RestoreEditorFocus,
      id: 'duplicateSelection',
      label: EditorStrings.duplicateSelection(),
    },
    menuEntrySeparator,
    {
      command: 'Editor.addCursorAbove',
      flags: MenuItemFlags.RestoreEditorFocus,
      id: 'addCursorAbove',
      label: EditorStrings.addCursorAbove(),
    },
    {
      command: 'Editor.addCursorBelow',
      flags: MenuItemFlags.RestoreEditorFocus,
      id: 'addCursorBelow',
      label: EditorStrings.addCursorBelow(),
    },
    {
      command: 'Editor.addCursorsToLineEnds',
      flags: MenuItemFlags.RestoreEditorFocus,
      id: 'addCursorsToLineEnds',
      label: EditorStrings.addCursorsToLineEnds(),
    },
    {
      command: 'Editor.addNextOccurrence',
      flags: MenuItemFlags.RestoreEditorFocus,
      id: 'addNextOccurrence',
      label: EditorStrings.addNextOccurrence(),
    },
    {
      command: 'Editor.addPreviousOccurrence',
      flags: MenuItemFlags.RestoreEditorFocus,
      id: 'addPreviousOccurrence',
      label: EditorStrings.addPreviousOccurrence(),
    },
    {
      command: 'Editor.selectAllOccurrences',
      flags: MenuItemFlags.RestoreEditorFocus,
      id: 'selectAllOccurrences',
      label: EditorStrings.selectAllOccurrences(),
    },
  ]
}
