import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const checkboxChecked: VirtualDomNode = {
  type: VirtualDomElements.Div,
  className: MergeClassNames.mergeClassNames(ClassNames.MenuItem, ClassNames.MenuItemCheckMark),
  role: AriaRoles.MenuItemCheckBox,
  ariaChecked: true,
  tabIndex: -1,
  childCount: 2,
}

export const getMenuItemCheckedDom = (menuItem: any): readonly VirtualDomNode[] => {
  const { label } = menuItem
  return [
    checkboxChecked,
    {
      type: VirtualDomElements.Div,
      className: MergeClassNames.mergeClassNames(ClassNames.MenuItemCheckmarkIcon, ClassNames.MaskIconCheck),
    },
    text(label),
  ]
}
