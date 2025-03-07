import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'

const checkboxChecked: VirtualDomNode = {
  type: VirtualDomElements.Div,
  className: `${ClassNames.MenuItem} MenuItemCheckMark`,
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
      className: 'MenuItemCheckmarkIcon MaskIconCheck',
    },
    text(label),
  ]
}
