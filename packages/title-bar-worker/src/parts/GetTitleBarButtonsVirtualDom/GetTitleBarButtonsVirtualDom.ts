import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { TitleBarButton } from '../TitleBarButton/TitleBarButton.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetTitleBarButtonVirtualDom from '../GetTitleBarButtonVirtualDom/GetTitleBarButtonVirtualDom.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'

export const getTitleBarButtonsVirtualDom = (buttons: readonly TitleBarButton[]): readonly VirtualDomNode[] => {
  const dom = [
    {
      type: VirtualDomElements.Div,
      className: MergeClassNames.mergeClassNames(ClassNames.Viewlet, ClassNames.TitleBarButtons),
      childCount: buttons.length,
    },
    ...buttons.flatMap(GetTitleBarButtonVirtualDom.createTitleBarButton),
  ]
  return dom
}
