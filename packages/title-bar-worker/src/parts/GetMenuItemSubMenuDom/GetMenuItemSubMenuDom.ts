import { VirtualDomElements, AriaRoles, mergeClassNames } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import type { VisibleMenuItem } from '../VisibleMenuItem/VisibleMenuItem.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const arrowRight: VirtualDomNode = {
  type: VirtualDomElements.Div,
  className: ClassNames.MenuItemSubMenuArrowRight,
  childCount: 0,
}

export const getMenuItemSubMenuDom = (menuItem: VisibleMenuItem): readonly VirtualDomNode[] => {
  const { label, isFocused, isExpanded, level } = menuItem
  const baseClassName = mergeClassNames(ClassNames.MenuItem, ClassNames.MenuItemSubMenu)
  const className = isFocused ? mergeClassNames(baseClassName, ClassNames.MenuItemFocused) : baseClassName
  return [
    {
      type: VirtualDomElements.Div,
      className,
      role: AriaRoles.MenuItem,
      tabIndex: -1,
      ariaHasPopup: true,
      ariaExpanded: isExpanded,
      ariaOwns: isExpanded ? `Menu-${level + 1}` : undefined,
      childCount: 2,
    },
    text(label),
    arrowRight,
  ]
}
