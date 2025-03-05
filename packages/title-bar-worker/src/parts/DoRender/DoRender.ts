import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as Render from '../Render/Render.ts'
import * as TitleBarMenuBarStates from '../TitleBarMenuBarStates/TitleBarMenuBarStates.ts'

export const doRender = async (uid: number): Promise<readonly VirtualDomNode[]> => {
  const { oldState, newState } = TitleBarMenuBarStates.get(uid)
  const commands = []
  for (const item of Render.render) {
    if (!item.isEqual(oldState, newState)) {
      commands.push(item.apply(oldState, newState))
    }
  }
  return commands
}
