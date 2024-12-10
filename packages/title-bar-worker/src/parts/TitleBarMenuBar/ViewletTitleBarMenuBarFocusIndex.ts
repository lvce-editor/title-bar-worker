import * as Assert from '../Assert/Assert.ts'
import { openMenuAtIndex } from './ViewletTitleBarMenuBarOpenMenuAtIndex.ts'

export const focusIndex = (state: any, index: number): any => {
  Assert.object(state)
  Assert.number(index)
  const { isMenuOpen } = state
  if (isMenuOpen) {
    return openMenuAtIndex(state, index, /* focus */ false)
  }
  return {
    ...state,
    focusedIndex: index,
  }
}
