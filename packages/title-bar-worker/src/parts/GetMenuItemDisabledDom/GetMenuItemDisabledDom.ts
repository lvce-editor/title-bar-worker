import { VirtualDomElements, AriaRoles } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import type { VisibleMenuItem } from '../VisibleMenuItem/VisibleMenuItem.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getKeyDom } from '../GetKeyDom/GetKeyDom.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getMenuItemDisabledDom = (menuItem: VisibleMenuItem): readonly VirtualDomNode[] => {
  const { key, label } = menuItem
  const keyDom = key ? getKeyDom(key) : []
  return [
    {
      childCount: key ? 2 : 1,
      className: ClassNames.MenuItem,
      disabled: true,
      role: AriaRoles.MenuItem,
      tabIndex: -1,
      type: VirtualDomElements.Div,
    },
    text(label),
    ...keyDom,
  ]
}
