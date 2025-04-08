import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'

export const getTitleBarIconVirtualDom = (iconSrc: string): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Div,
      className: MergeClassNames.mergeClassNames(ClassNames.Viewlet, ClassNames.TitleBarIcon),
      childCount: 1,
    },
    {
      type: VirtualDomElements.Img,
      className: ClassNames.TitleBarIconIcon,
      src: iconSrc,
      alt: '',
      childCount: 0,
    },
  ]
}
