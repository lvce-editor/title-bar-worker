import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import type { VisibleMenuItem } from '../VisibleMenuItem/VisibleMenuItem.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const arrowRight: VirtualDomNode = {
  type: VirtualDomElements.Div,
  className: ClassNames.MenuItemSubMenuArrowRight,
  childCount: 0,
}

export const getMenuItemSubMenuDom = (menuItem: VisibleMenuItem): readonly VirtualDomNode[] => {
  const { label, isFocused, isExpanded, level } = menuItem
  let className = ClassNames.MenuItem
  className += ' ' + ClassNames.MenuItemSubMenu
  if (isFocused) {
    className += ' ' + ClassNames.MenuItemFocused
  }
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
