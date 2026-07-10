import { AriaRoles, mergeClassNames, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import type { VisibleMenuItem } from '../VisibleMenuItem/VisibleMenuItem.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getMenuItemUncheckedDom = (menuItem: VisibleMenuItem): readonly VirtualDomNode[] => {
  const { isFocused, label } = menuItem
  const className = isFocused ? mergeClassNames(ClassNames.MenuItem, ClassNames.MenuItemFocused) : ClassNames.MenuItem
  return [
    {
      ariaChecked: false,
      childCount: 1,
      className,
      role: AriaRoles.MenuItemCheckBox,
      tabIndex: -1,
      type: VirtualDomElements.Div,
    },
    text(label),
  ]
}
