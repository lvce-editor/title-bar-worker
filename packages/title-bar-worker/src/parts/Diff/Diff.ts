import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as DiffModules from '../DiffModules/DiffModules.ts'

export const diff = (oldState: TitleBarMenuBarState, newState: TitleBarMenuBarState): readonly number[] => {
  const diffResult: number[] = []
  for (const module of DiffModules.modules) {
    if (!module.isEqual(oldState, newState)) {
      diffResult.push(module.diffType)
    }
  }
  return diffResult
}
