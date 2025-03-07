import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetKeyBindingsString from '../GetKeyBindingsString/GetKeyBindingsString.ts'
import * as ParseKey from '../ParseKey/ParseKey.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getMenuItemDefaultDom = (menuItem: any): readonly VirtualDomNode[] => {
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
        className: 'MenuItemKeyBinding',
        childCount: 1,
      },
      text(keyBindingsString),
    )
  }
  return dom
}
