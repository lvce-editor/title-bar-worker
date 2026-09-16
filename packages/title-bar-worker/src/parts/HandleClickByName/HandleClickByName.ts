import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { getNavigableTitleBarEntries } from '../GetNavigableTitleBarEntries/GetNavigableTitleBarEntries.ts'
import { handleClick } from '../TitleBarMenuBar/ViewletTitleBarMenuBarHandleClick.ts'

export const handleClickByName = async (state: TitleBarMenuBarState, button: number, name: string): Promise<TitleBarMenuBarState> => {
  const entries = getNavigableTitleBarEntries(state)
  const index = entries.findIndex((entry) => entry.label === name)
  return handleClick(state, button, index)
}
