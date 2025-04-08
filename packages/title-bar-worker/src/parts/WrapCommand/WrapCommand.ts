import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as TitleBarMenuBarStates from '../TitleBarMenuBarStates/TitleBarMenuBarStates.ts'

export interface WrappedFn {
  (uid: number, ...args: readonly any[]): Promise<void>
}

interface Fn {
  (state: TitleBarMenuBarState, ...args: readonly any[]): TitleBarMenuBarState | Promise<TitleBarMenuBarState>
}

export const wrapCommand = (fn: Fn): WrappedFn => {
  const wrapped = async (uid: number, ...args: readonly any[]): Promise<void> => {
    const { newState } = TitleBarMenuBarStates.get(uid)
    const newerState = await fn(newState, ...args)
    if (newState === newerState) {
      return
    }
    const latest = TitleBarMenuBarStates.get(uid)
    TitleBarMenuBarStates.set(uid, latest.oldState, newerState)
  }
  return wrapped
}
