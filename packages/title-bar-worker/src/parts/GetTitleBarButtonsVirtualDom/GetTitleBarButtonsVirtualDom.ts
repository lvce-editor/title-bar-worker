import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as GetTitleBarButtonVirtualDom from '../GetTitleBarButtonVirtualDom/GetTitleBarButtonVirtualDom.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'

export const getTitleBarButtonsVirtualDom = (buttons: readonly any[]): readonly VirtualDomNode[] => {
  const dom = [
    {
      type: VirtualDomElements.Div,
      className: 'Viewlet TitleBarButtons',
      childCount: buttons.length,
    },
    ...buttons.flatMap(GetTitleBarButtonVirtualDom.createTitleBarButton),
  ]
  return dom
}
