import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { TitleBarButton } from '../TitleBarButton/TitleBarButton.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetTitleBarButtonVirtualDom from '../GetTitleBarButtonVirtualDom/GetTitleBarButtonVirtualDom.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'

export const getTitleBarButtonsVirtualDom = (buttonsEnabled: boolean, buttons: readonly TitleBarButton[]): readonly VirtualDomNode[] => {
  if (!buttonsEnabled) {
    return []
  }
  return [
    {
      childCount: buttons.length,
      className: MergeClassNames.mergeClassNames(ClassNames.Viewlet, ClassNames.TitleBarButtons),
      type: VirtualDomElements.Div,
    },
    ...buttons.flatMap(GetTitleBarButtonVirtualDom.createTitleBarButton),
  ]
}
