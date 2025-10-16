import { VirtualDomElements } from '@lvce-editor/constants'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const parentNode: VirtualDomNode = {
  type: VirtualDomElements.Div,
  className: 'TitleBarTitle',
  childCount: 1,
}

export const getTitleVirtualDom = (title: string): readonly VirtualDomNode[] => {
  return [parentNode, text(title)]
}
