import * as DiffModules3 from '../DiffModules3/DiffModules3.ts'
import * as TitleBarMenuBarStates from '../TitleBarMenuBarStates/TitleBarMenuBarStates.ts'

export const diff3 = (uid: number): readonly number[] => {
  const { oldState, newState } = TitleBarMenuBarStates.get(uid)
  const diffResult: number[] = []
  for (let i = 0; i < DiffModules3.modules.length; i++) {
    const fn = DiffModules3.modules[i]
    if (!fn(oldState, newState)) {
      diffResult.push(DiffModules3.numbers[i])
    }
  }
  return diffResult
}
