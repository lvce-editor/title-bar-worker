import { AriaRoles, mergeClassNames, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import type { VisibleMenuItem } from '../VisibleMenuItem/VisibleMenuItem.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getKeyDom } from '../GetKeyDom/GetKeyDom.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getMenuItemUncheckedDom = (menuItem: VisibleMenuItem): readonly VirtualDomNode[] => {
  const { isFocused, key, label } = menuItem
  const className = isFocused ? mergeClassNames(ClassNames.MenuItem, ClassNames.MenuItemFocused) : ClassNames.MenuItem
  const keyDom = key ? getKeyDom(key) : []
  return [
    {
      ariaChecked: false,
      childCount: key ? 2 : 1,
      className,
      role: AriaRoles.MenuItemCheckBox,
      tabIndex: -1,
      type: VirtualDomElements.Div,
    },
    text(label),
    ...keyDom,
  ]
}
