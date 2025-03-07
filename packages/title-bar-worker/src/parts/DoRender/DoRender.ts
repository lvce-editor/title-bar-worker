import * as ApplyRender from '../ApplyRender/ApplyRender.ts'
import * as Diff from '../Diff/Diff.ts'
import * as TitleBarMenuBarStates from '../TitleBarMenuBarStates/TitleBarMenuBarStates.ts'

export const doRender = (uid: number): any => {
  const { oldState, newState } = TitleBarMenuBarStates.get(uid)
  const diffResult = Diff.diff(oldState, newState)
  return ApplyRender.applyRender(oldState, newState, diffResult)
}
