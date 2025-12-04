import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as EditorStrings from '../EditorStrings/EditorStrings.ts'
import * as MenuEntryId from '../MenuEntryId/MenuEntryId.ts'
import * as MenuEntrySeparator from '../MenuEntrySeparator/MenuEntrySeparator.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'

export const getMenuEntries = (): readonly MenuEntry[] => {
  return [
    {
      command: /* TODO */ '-1',
      flags: MenuItemFlags.Disabled,
      id: 'undo',
      label: EditorStrings.undo(),
    },
    {
      command: /* TODO */ '-1',
      flags: MenuItemFlags.Disabled,
      id: 'redo',
      label: EditorStrings.redo(),
    },
    MenuEntrySeparator.menuEntrySeparator,
    {
      command: /* Editor.cut */ 'Editor.cut',
      flags: MenuItemFlags.None,
      id: 'cut',
      label: EditorStrings.cut(),
    },
    {
      command: /* Editor.copy */ 'Editor.copy',
      flags: MenuItemFlags.None,
      id: 'copy',
      label: EditorStrings.copy(),
    },
    {
      command: /* Editor.paste */ 'Editor.paste',
      flags: MenuItemFlags.None,
      id: 'paste',
      label: EditorStrings.paste(),
    },
    MenuEntrySeparator.menuEntrySeparator,
    {
      command: /* Editor.toggleLineComment */ 'Editor.toggleLineComment',
      flags: MenuItemFlags.None,
      id: 'toggle-line-comment',
      label: EditorStrings.toggleLineComment(),
    },
    {
      command: /* Editor.toggleBlockComment */ 'Editor.toggleBlockComment',
      flags: MenuItemFlags.None,
      id: 'toggle-block-comment',
      label: EditorStrings.toggleBlockComment(),
    },
  ]
}
