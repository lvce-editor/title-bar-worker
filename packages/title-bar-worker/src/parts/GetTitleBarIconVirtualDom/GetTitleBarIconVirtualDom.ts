import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'

const parentNode: VirtualDomNode = {
  type: VirtualDomElements.Div,
  className: MergeClassNames.mergeClassNames(ClassNames.Viewlet, ClassNames.TitleBarIcon),
  childCount: 1,
}

export const getTitleBarIconVirtualDom = (iconSrc: string): readonly VirtualDomNode[] => {
  return [
    parentNode,
    {
      type: VirtualDomElements.Img,
      className: ClassNames.TitleBarIconIcon,
      src: iconSrc,
      alt: '',
      childCount: 0,
    },
  ]
}
