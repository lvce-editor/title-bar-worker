import * as Focus from '../Focus/Focus.ts'
import * as FocusKey from '../FocusKey/FocusKey.ts'

export const handleFocus = (state) => {
  Focus.setFocus(FocusKey.TitleBarMenuBar)
  return state
}
