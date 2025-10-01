import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as Focus from '../Focus/Focus.ts'
import * as FocusKey from '../FocusKey/FocusKey.ts'

export const handleFocus = async (state: TitleBarMenuBarState): Promise<TitleBarMenuBarState> => {
  await Focus.setFocus(FocusKey.TitleBarMenuBar)
  return state
}
