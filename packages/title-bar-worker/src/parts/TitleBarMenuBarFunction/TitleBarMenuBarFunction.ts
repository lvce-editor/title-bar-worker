import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'

export interface TitleBarMenuBarFunction<T extends readonly any[]> {
  (state: TitleBarMenuBarState, ...args: T): TitleBarMenuBarState | Promise<TitleBarMenuBarState>
}
