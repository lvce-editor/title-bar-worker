import { AriaRoles, mergeClassNames, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import type { VisibleMenuItem } from '../VisibleMenuItem/VisibleMenuItem.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getKeyDom } from '../GetKeyDom/GetKeyDom.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const checkMark: VirtualDomNode = {
  className: MergeClassNames.mergeClassNames(ClassNames.MenuItemCheckmarkIcon, ClassNames.MaskIconCheck),
  type: VirtualDomElements.Div,
}

export const getMenuItemCheckedDom = (menuItem: VisibleMenuItem): readonly VirtualDomNode[] => {
  const { isFocused, key, label } = menuItem
  const baseClassName = MergeClassNames.mergeClassNames(ClassNames.MenuItem, ClassNames.MenuItemCheckMark)
  const className = isFocused ? mergeClassNames(baseClassName, ClassNames.MenuItemFocused) : baseClassName
  const keyDom = key ? getKeyDom(key) : []
  return [
    {
      ariaChecked: true,
      childCount: key ? 3 : 2,
      className,
      role: AriaRoles.MenuItemCheckBox,
      tabIndex: -1,
      type: VirtualDomElements.Div,
    },
    checkMark,
    text(label),
    ...keyDom,
  ]
}
