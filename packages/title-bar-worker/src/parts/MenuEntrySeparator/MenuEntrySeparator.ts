import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'

export const menuEntrySeparator: MenuEntry = {
  command: '',
  flags: MenuItemFlags.Separator,
  id: 'separator',
  label: '',
}
