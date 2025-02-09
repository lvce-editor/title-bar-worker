import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.js'

export const getTitleVirtualDom = (title: string): readonly VirtualDomNode[] => {
  return [text(title)]
}
