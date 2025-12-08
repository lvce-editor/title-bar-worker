import { VirtualDomElements } from '@lvce-editor/constants'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const parentNode: VirtualDomNode = {
  childCount: 1,
  className: 'TitleBarTitle',
  type: VirtualDomElements.Div,
}

export const getTitleVirtualDom = (titleBarTitleEnabled: boolean, title: string): readonly VirtualDomNode[] => {
  if (!titleBarTitleEnabled) {
    return []
  }
  return [parentNode, text(title)]
}
