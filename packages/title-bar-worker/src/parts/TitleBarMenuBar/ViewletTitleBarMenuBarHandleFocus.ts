import * as Focus from '../Focus/Focus.ts'
import * as FocusKey from '../FocusKey/FocusKey.ts'

export const handleFocus = async (state: any): Promise<any> => {
  await Focus.setFocus(FocusKey.TitleBarMenuBar)
  return state
}
