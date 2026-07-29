import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as HandleCommandCenterClick from '../HandleCommandCenterClick/HandleCommandCenterClick.ts'

export const handleCommandCenterKeyDown = async (state: TitleBarMenuBarState, key: string): Promise<TitleBarMenuBarState> => {
  if (key !== 'Enter' && key !== ' ' && key !== 'Space') {
    return state
  }
  return HandleCommandCenterClick.handleCommandCenterClick(state)
}
