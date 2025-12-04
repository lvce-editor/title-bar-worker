import { VirtualDomElements, AriaRoles } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import type { VisibleMenuItem } from '../VisibleMenuItem/VisibleMenuItem.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const checkboxChecked: VirtualDomNode = {
  ariaChecked: true,
  childCount: 2,
  className: MergeClassNames.mergeClassNames(ClassNames.MenuItem, ClassNames.MenuItemCheckMark),
  role: AriaRoles.MenuItemCheckBox,
  tabIndex: -1,
  type: VirtualDomElements.Div,
}

const checkMark: VirtualDomNode = {
  className: MergeClassNames.mergeClassNames(ClassNames.MenuItemCheckmarkIcon, ClassNames.MaskIconCheck),
  type: VirtualDomElements.Div,
}

export const getMenuItemCheckedDom = (menuItem: VisibleMenuItem): readonly VirtualDomNode[] => {
  const { label } = menuItem
  return [checkboxChecked, checkMark, text(label)]
}
