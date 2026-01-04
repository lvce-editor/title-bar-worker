import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { getMenuEntries2 } from '../GetMenuEntries2/GetMenuEntries2.ts'

export const getEntryMap = async (state: TitleBarMenuBarState, menuIds: readonly number[]): Promise<any> => {
  const map = Object.create(null)
  for (const id of menuIds) {
    const entries = await getMenuEntries2(state, {
      // @ts-ignore
      menuId: id,
    })
    map[id] = entries
  }
  return map
}
