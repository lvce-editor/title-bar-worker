import type { TitleBarButton } from '../TitleBarButton/TitleBarButton.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as GetIconVirtualDom from '../GetIconVirtualDom/GetIconVirtualDom.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'

export const createTitleBarButton = (button: TitleBarButton): readonly VirtualDomNode[] => {
  const { id, icon, label, onClick } = button
  const dom = [
    {
      type: VirtualDomElements.Button,
      className: `TitleBarButton TitleBarButton${id}`,
      ariaLabel: label,
      childCount: 1,
      onClick,
    },
    GetIconVirtualDom.getIconVirtualDom(icon, VirtualDomElements.I),
  ]
  return dom
}
