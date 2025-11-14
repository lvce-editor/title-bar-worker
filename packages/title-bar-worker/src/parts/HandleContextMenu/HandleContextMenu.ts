import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as ContextMenu from '../ContextMenu/ContextMenu.ts'
import { MenuIdTitleBarContextMenu } from '../GetMenuIds/GetMenuIds.ts'

export const handleContextMenu = async (
  state: TitleBarMenuBarState,
  button: number,
  eventX: number,
  eventY: number,
): Promise<TitleBarMenuBarState> => {
  const { uid } = state
  await ContextMenu.show2(uid, MenuIdTitleBarContextMenu, eventX, eventY, {
    menuId: MenuIdTitleBarContextMenu,
  })
  return state
}
