import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as EditorStrings from '../EditorStrings/EditorStrings.ts'
import * as MenuEntrySeparator from '../MenuEntrySeparator/MenuEntrySeparator.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'

export const getMenuEntries = (): readonly MenuEntry[] => {
  return [
    {
      command: 'Editor.undo',
      flags: MenuItemFlags.RestoreEditorFocus,
      id: 'undo',
      label: EditorStrings.undo(),
    },
    {
      command: 'Editor.redo',
      flags: MenuItemFlags.RestoreEditorFocus,
      id: 'redo',
      label: EditorStrings.redo(),
    },
    MenuEntrySeparator.menuEntrySeparator,
    {
      command: /* Editor.cut */ 'Editor.cut',
      flags: MenuItemFlags.RestoreEditorFocus,
      id: 'cut',
      label: EditorStrings.cut(),
    },
    {
      command: /* Editor.copy */ 'Editor.copy',
      flags: MenuItemFlags.RestoreEditorFocus,
      id: 'copy',
      label: EditorStrings.copy(),
    },
    {
      command: /* Editor.paste */ 'Editor.paste',
      flags: MenuItemFlags.RestoreEditorFocus,
      id: 'paste',
      label: EditorStrings.paste(),
    },
    MenuEntrySeparator.menuEntrySeparator,
    {
      command: /* Editor.toggleLineComment */ 'Editor.toggleLineComment',
      flags: MenuItemFlags.RestoreEditorFocus,
      id: 'toggle-line-comment',
      label: EditorStrings.toggleLineComment(),
    },
    {
      command: /* Editor.toggleBlockComment */ 'Editor.toggleBlockComment',
      flags: MenuItemFlags.RestoreEditorFocus,
      id: 'toggle-block-comment',
      label: EditorStrings.toggleBlockComment(),
    },
  ]
}
