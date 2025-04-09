import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'

export const menuEntrySeparator: MenuEntry = {
  id: 'separator',
  label: '',
  flags: MenuItemFlags.Separator,
  command: '',
}
