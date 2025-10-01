import type { TitleBarMenuBarFunction } from '../TitleBarMenuBarFunction/TitleBarMenuBarFunction.ts'
import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'

export const ifElse = <T extends readonly any[]>(
  menuOpenFunction: TitleBarMenuBarFunction<T>,
  menuClosedFunction: TitleBarMenuBarFunction<T>,
): TitleBarMenuBarFunction<T> => {
  const ifElseFunction = (state: TitleBarMenuBarState, ...args: T): TitleBarMenuBarState | Promise<TitleBarMenuBarState> => {
    const { isMenuOpen } = state
    if (isMenuOpen) {
      return menuOpenFunction(state, ...args)
    }
    return menuClosedFunction(state, ...args)
  }
  return ifElseFunction
}
