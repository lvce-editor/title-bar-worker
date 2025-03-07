import * as ApplyRender from '../ApplyRender/ApplyRender.ts'
import * as Diff from '../Diff/Diff.ts'
import * as TitleBarMenuBarStates from '../TitleBarMenuBarStates/TitleBarMenuBarStates.ts'

export const doRender = (uid: number): readonly any[] => {
  const { oldState, newState } = TitleBarMenuBarStates.get(uid)
  const diffResult = Diff.diff(oldState, newState)
  const commands = ApplyRender.applyRender(oldState, newState, diffResult)
  return commands
}
