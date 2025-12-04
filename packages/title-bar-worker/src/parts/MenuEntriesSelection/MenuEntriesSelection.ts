import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as EditorStrings from '../EditorStrings/EditorStrings.ts'
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
  ]
}
