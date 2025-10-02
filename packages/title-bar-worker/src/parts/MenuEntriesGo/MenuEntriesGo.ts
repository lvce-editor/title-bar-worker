import type { VisibleMenuItem } from '../VisibleMenuItem/VisibleMenuItem.ts'
import * as MenuEntryId from '../MenuEntryId/MenuEntryId.ts'

export const id = MenuEntryId.Go

export const getMenuEntries = (): readonly VisibleMenuItem[] => {
  return []
}
