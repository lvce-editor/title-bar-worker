import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as MenuEntryId from '../MenuEntryId/MenuEntryId.ts'

export const id = MenuEntryId.View

export const getMenuEntries = (): readonly MenuEntry[] => {
  return []
}
