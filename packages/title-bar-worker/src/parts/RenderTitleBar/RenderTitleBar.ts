import { ViewletCommand } from '@lvce-editor/constants'
import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as GetTitleBarVirtualDom from '../GetTitleBarVirtualDom/GetTitleBarVirtualDom.ts'

export const renderTitleBar = (oldState: TitleBarMenuBarState, newState: TitleBarMenuBarState): readonly any[] => {
  const dom = GetTitleBarVirtualDom.getTitleBarVirtualDom(newState)
  return [ViewletCommand.SetDom2, newState.uid, dom]
}
