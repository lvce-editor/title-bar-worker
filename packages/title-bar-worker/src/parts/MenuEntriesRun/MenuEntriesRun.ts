import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as MenuEntryId from '../MenuEntryId/MenuEntryId.ts'

export const id = MenuEntryId.Run

export const getMenuEntries = (): readonly MenuEntry[] => {
  return []
}
