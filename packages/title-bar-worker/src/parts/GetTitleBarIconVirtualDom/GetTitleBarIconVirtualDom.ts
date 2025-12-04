import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'

const parentNode: VirtualDomNode = {
  childCount: 1,
  className: MergeClassNames.mergeClassNames(ClassNames.Viewlet, ClassNames.TitleBarIcon),
  type: VirtualDomElements.Div,
}

export const getTitleBarIconVirtualDom = (iconSrc: string): readonly VirtualDomNode[] => {
  return [
    parentNode,
    {
      alt: '',
      childCount: 0,
      className: ClassNames.TitleBarIconIcon,
      src: iconSrc,
      type: VirtualDomElements.Img,
    },
  ]
}
