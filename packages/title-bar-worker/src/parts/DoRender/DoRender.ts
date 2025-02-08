import * as Render from '../Render/Render.ts'
import * as ExtensionDetailStates from '../TitleBarMenuBarStates/TitleBarMenuBarStates.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'

export const doRender = async (uid: number): Promise<readonly VirtualDomNode[]> => {
  const { oldState, newState } = ExtensionDetailStates.get(uid)
  const commands = []
  for (const item of Render.render) {
    if (!item.isEqual(oldState, newState)) {
      commands.push(item.apply(oldState, newState))
    }
  }
  return commands
}
