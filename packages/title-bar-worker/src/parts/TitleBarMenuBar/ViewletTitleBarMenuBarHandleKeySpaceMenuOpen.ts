import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { handleKeyEnterMenuOpen } from './ViewletTitleBarMenuBarHandleKeyEnterMenuOpen.ts'

export const handleKeySpaceMenuOpen = (state: TitleBarMenuBarState): Promise<TitleBarMenuBarState> | TitleBarMenuBarState =>
  handleKeyEnterMenuOpen(state)
