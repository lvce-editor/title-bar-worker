import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { TitleBarButton } from '../TitleBarButton/TitleBarButton.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetIconVirtualDom from '../GetIconVirtualDom/GetIconVirtualDom.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'

export const createTitleBarButton = (button: TitleBarButton): readonly VirtualDomNode[] => {
  const { icon, id, label, onClick } = button
  const dom = [
    {
      ariaLabel: label,
      childCount: 1,
      className: MergeClassNames.mergeClassNames(ClassNames.TitleBarButton, `TitleBarButton${id}`),
      name: id,
      onClick,
      type: VirtualDomElements.Button,
    },
    GetIconVirtualDom.getIconVirtualDom(icon, VirtualDomElements.I),
  ]
  return dom
}
