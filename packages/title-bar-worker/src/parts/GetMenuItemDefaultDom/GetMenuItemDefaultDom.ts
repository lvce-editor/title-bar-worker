import { VirtualDomElements, AriaRoles } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import type { VisibleMenuItem } from '../VisibleMenuItem/VisibleMenuItem.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetKeyBindingsString from '../GetKeyBindingsString/GetKeyBindingsString.ts'
import * as ParseKey from '../ParseKey/ParseKey.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getMenuItemDefaultDom = (menuItem: VisibleMenuItem): readonly VirtualDomNode[] => {
  const { label, isFocused, key } = menuItem
  let className = ClassNames.MenuItem
  if (isFocused) {
    className += ' ' + ClassNames.MenuItemFocused
  }
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
