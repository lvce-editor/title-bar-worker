import { ParseKey } from '@lvce-editor/constants'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetKeyBindingsString from '../GetKeyBindingsString/GetKeyBindingsString.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getKeyDom = (key: number): readonly VirtualDomNode[] => {
  const parsedKey = ParseKey.parseKey(key)
  const keyBindingsString = GetKeyBindingsString.getKeyBindingString(parsedKey.key, false, parsedKey.isCtrl, parsedKey.isShift, false)
  return [
    {
      type: VirtualDomElements.Span,
      className: ClassNames.MenuItemKeyBinding,
      childCount: 1,
    },
    text(keyBindingsString),
  ]
}
