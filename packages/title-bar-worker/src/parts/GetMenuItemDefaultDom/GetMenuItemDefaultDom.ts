import { AriaRoles, mergeClassNames, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import type { VisibleMenuItem } from '../VisibleMenuItem/VisibleMenuItem.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getKeyDom } from '../GetKeyDom/GetKeyDom.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const classNameFocused = mergeClassNames(ClassNames.MenuItem, ClassNames.MenuItemFocused)

const getMenuItemClassName = (isFocused: boolean): string => {
  if (isFocused) {
    return classNameFocused
  }
  return ClassNames.MenuItem
}

export const getMenuItemDefaultDom = (menuItem: VisibleMenuItem): readonly VirtualDomNode[] => {
  const { isFocused, key, label } = menuItem
  const className = getMenuItemClassName(isFocused)
  const keyDom = key ? getKeyDom(key) : []
  const childCount = key ? 2 : 1

  return [
    {
      childCount,
      className,
      role: AriaRoles.MenuItem,
      tabIndex: -1,
      type: VirtualDomElements.Div,
    },
    text(label),
    ...keyDom,
  ]
}
