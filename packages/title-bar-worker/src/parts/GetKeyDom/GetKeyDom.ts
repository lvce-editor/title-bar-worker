import { ParseKey } from '@lvce-editor/constants'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetKeyBindingsString from '../GetKeyBindingsString/GetKeyBindingsString.ts'
import * as GetKeyLabel from '../GetKeyLabel/GetKeyLabel.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const altKeyMask = 1 << 9

export const getKeyDom = (key: number): readonly VirtualDomNode[] => {
  const parsedKey = ParseKey.parseKey(key)
  const isAlt = Boolean(key & altKeyMask)
  const keyLabel = GetKeyLabel.getKeyLabel(key & 0xff, parsedKey.key)
  const keyBindingsString = GetKeyBindingsString.getKeyBindingString(keyLabel, isAlt, parsedKey.isCtrl, parsedKey.isShift, false)
  return [
    {
      childCount: 1,
      className: ClassNames.MenuItemKeyBinding,
      type: VirtualDomElements.Span,
    },
    text(keyBindingsString),
  ]
}
