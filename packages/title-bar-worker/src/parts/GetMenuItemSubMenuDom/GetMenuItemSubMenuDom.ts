import { VirtualDomElements, AriaRoles, mergeClassNames } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import type { VisibleMenuItem } from '../VisibleMenuItem/VisibleMenuItem.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const arrowRight: VirtualDomNode = {
  childCount: 0,
  className: ClassNames.MenuItemSubMenuArrowRight,
  type: VirtualDomElements.Div,
}

export const getMenuItemSubMenuDom = (menuItem: VisibleMenuItem): readonly VirtualDomNode[] => {
  const { isExpanded, isFocused, label, level } = menuItem
  const baseClassName = mergeClassNames(ClassNames.MenuItem, ClassNames.MenuItemSubMenu)
  const className = isFocused ? mergeClassNames(baseClassName, ClassNames.MenuItemFocused) : baseClassName
  return [
    {
      ariaExpanded: isExpanded,
      ariaHasPopup: true,
      ariaOwns: isExpanded ? `Menu-${level + 1}` : undefined,
      childCount: 2,
      className,
      role: AriaRoles.MenuItem,
      tabIndex: -1,
      type: VirtualDomElements.Div,
    },
    text(label),
    arrowRight,
  ]
}
