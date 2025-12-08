import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as EditorStrings from '../EditorStrings/EditorStrings.ts'
import { menuEntrySeparator } from '../MenuEntrySeparator/MenuEntrySeparator.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'

export const getMenuEntries = (): readonly MenuEntry[] => {
  return [
    {
      command: 'Editor.selectAll',
      flags: MenuItemFlags.None,
      id: 'selectAll',
      label: EditorStrings.selectAll(),
    },
    {
      command: 'Editor.expandSelection',
      flags: MenuItemFlags.None,
      id: 'expandSelection',
      label: EditorStrings.expandSelection(),
    },
    {
      command: 'Editor.shrinkSelection',
      flags: MenuItemFlags.None,
      id: 'shrinkSelection',
      label: EditorStrings.shrinkSelection(),
    },
    menuEntrySeparator,
    {
      command: 'Editor.copyLineUp',
      flags: MenuItemFlags.None,
      id: 'copyLineUp',
      label: EditorStrings.copyLineUp(),
    },
    {
      command: 'Editor.copyLineDown',
      flags: MenuItemFlags.None,
      id: 'copyLineDown',
      label: EditorStrings.copyLineDown(),
    },
    {
      command: 'Editor.moveLineUp',
      flags: MenuItemFlags.None,
      id: 'moveLineUp',
      label: EditorStrings.moveLineUp(),
    },
    {
      command: 'Editor.moveLineDown',
      flags: MenuItemFlags.None,
      id: 'moveLineDown',
      label: EditorStrings.moveLineDown(),
    },
    {
      command: 'Editor.duplicateSelection',
      flags: MenuItemFlags.None,
      id: 'duplicateSelection',
      label: EditorStrings.duplicateSelection(),
    },
    menuEntrySeparator,
    {
      command: 'Editor.addCursorAbove',
      flags: MenuItemFlags.None,
      id: 'addCursorAbove',
      label: EditorStrings.addCursorAbove(),
    },
    {
      command: 'Editor.addCursorBelow',
      flags: MenuItemFlags.None,
      id: 'addCursorBelow',
      label: EditorStrings.addCursorBelow(),
    },
    {
      command: 'Editor.addCursorsToLineEnds',
      flags: MenuItemFlags.None,
      id: 'addCursorsToLineEnds',
      label: EditorStrings.addCursorsToLineEnds(),
    },
    {
      command: 'Editor.addNextOccurrence',
      flags: MenuItemFlags.None,
      id: 'addNextOccurrence',
      label: EditorStrings.addNextOccurrence(),
    },
    {
      command: 'Editor.addPreviousOccurrence',
      flags: MenuItemFlags.None,
      id: 'addPreviousOccurrence',
      label: EditorStrings.addPreviousOccurrence(),
    },
    {
      command: 'Editor.selectAllOccurrences',
      flags: MenuItemFlags.None,
      id: 'selectAllOccurrences',
      label: EditorStrings.selectAllOccurrences(),
    },
  ]
}
