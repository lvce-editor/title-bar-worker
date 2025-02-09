import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'

export const getTitleBarIconVirtualDom = (iconSrc: string): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Div,
      className: 'Viewlet TitleBarIcon',
      childCount: 1,
    },
    {
      type: VirtualDomElements.Img,
      className: 'TitleBarIconIcon',
      src: iconSrc,
      alt: '',
      childCount: 0,
    },
  ]
}
