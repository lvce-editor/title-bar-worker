import { openMenuAtIndex } from './ViewletTitleBarMenuBarOpenMenuAtIndex.ts'

/**
 * @param {boolean} focus
 */
export const openMenu = (state: any, focus: boolean): any => {
  const { focusedIndex } = state
  if (focusedIndex === -1) {
    return state
  }
  return openMenuAtIndex(state, focusedIndex, focus)
}
