import * as ApplyRender from '../ApplyRender/ApplyRender.ts'
import * as Diff from '../Diff/Diff.ts'
import * as TitleBarMenuBarStates from '../TitleBarMenuBarStates/TitleBarMenuBarStates.ts'
import { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'

export const doRender = async (uid: number): Promise<readonly VirtualDomNode[]> => {
  const { oldState, newState } = TitleBarMenuBarStates.get(uid)
  const diffResult = Diff.diff(oldState, newState)
  const commands = ApplyRender.applyRender(oldState, newState, diffResult)
  return commands
}
