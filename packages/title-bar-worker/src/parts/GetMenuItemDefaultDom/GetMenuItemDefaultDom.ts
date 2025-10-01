import { mergeClassNames, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import type { VisibleMenuItem } from '../VisibleMenuItem/VisibleMenuItem.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetKeyBindingsString from '../GetKeyBindingsString/GetKeyBindingsString.ts'
import * as ParseKey from '../ParseKey/ParseKey.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const classNameFocused = mergeClassNames(ClassNames.MenuItem, ClassNames.MenuItemFocused)

const getMenuItemClassName = (isFocused: boolean): string => {
  if (isFocused) {
    return classNameFocused
  }
  return ClassNames.MenuItem
}

export const getMenuItemDefaultDom = (menuItem: VisibleMenuItem): readonly VirtualDomNode[] => {
  const { label, isFocused, key } = menuItem
  const className = getMenuItemClassName(isFocused)
  const dom: any[] = []
  dom.push(
    {
      type: VirtualDomElements.Div,
      className,
      role: AriaRoles.MenuItem,
      tabIndex: -1,
      childCount: 1,
    },
    text(label),
  )
  if (key) {
    dom[0].childCount++
    const parsedKey = ParseKey.parseKey(key)
    const keyBindingsString = GetKeyBindingsString.getKeyBindingString(parsedKey.key, false, parsedKey.isCtrl, parsedKey.isShift, false)
    dom.push(
      {
        type: VirtualDomElements.Span,
        className: ClassNames.MenuItemKeyBinding,
        childCount: 1,
      },
      text(keyBindingsString),
    )
  }
  return dom
}
