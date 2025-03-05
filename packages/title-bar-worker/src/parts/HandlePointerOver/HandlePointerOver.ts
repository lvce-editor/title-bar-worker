import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'

export const handlePointerOver = (state: TitleBarMenuBarState): TitleBarMenuBarState => {
  console.log('pointer over')
  return state
}
