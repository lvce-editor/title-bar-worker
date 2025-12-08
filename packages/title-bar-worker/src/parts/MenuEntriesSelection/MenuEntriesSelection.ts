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
      flags: MenuItemFlags.Disabled,
      id: 'moveLineUp',
      label: EditorStrings.moveLineUp(),
    },
    {
      command: 'Editor.moveLineDown',
      flags: MenuItemFlags.Disabled,
      id: 'moveLineDown',
      label: EditorStrings.moveLineDown(),
    },
    {
      command: 'Editor.duplicateSelection',
      flags: MenuItemFlags.Disabled,
      id: 'duplicateSelection',
      label: EditorStrings.duplicateSelection(),
    },
    menuEntrySeparator,
    {
      command: 'Editor.addCursorAbove',
      flags: MenuItemFlags.Disabled,
      id: 'addCursorAbove',
      label: EditorStrings.addCursorAbove(),
    },
    {
      command: 'Editor.addCursorBelow',
      flags: MenuItemFlags.Disabled,
      id: 'addCursorBelow',
      label: EditorStrings.addCursorBelow(),
    },
    {
      command: 'Editor.addCursorsToLineEnds',
      flags: MenuItemFlags.Disabled,
      id: 'addCursorsToLineEnds',
      label: EditorStrings.addCursorsToLineEnds(),
    },
    {
      command: 'Editor.addNextOccurrence',
      flags: MenuItemFlags.Disabled,
      id: 'addNextOccurrence',
      label: EditorStrings.addNextOccurrence(),
    },
    {
      command: 'Editor.addPreviousOccurrence',
      flags: MenuItemFlags.Disabled,
      id: 'addPreviousOccurrence',
      label: EditorStrings.addPreviousOccurrence(),
    },
    {
      command: 'Editor.selectAllOccurrences',
      flags: MenuItemFlags.Disabled,
      id: 'selectAllOccurrences',
      label: EditorStrings.selectAllOccurrences(),
    },
  ]
}
