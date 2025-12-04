import { VirtualDomElements, AriaRoles } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import type { VisibleMenuItem } from '../VisibleMenuItem/VisibleMenuItem.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const disabled: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.MenuItem,
  disabled: true,
  role: AriaRoles.MenuItem,
  tabIndex: -1,
  type: VirtualDomElements.Div,
}

export const getMenuItemDisabledDom = (menuItem: VisibleMenuItem): readonly VirtualDomNode[] => {
  const { label } = menuItem
  return [disabled, text(label)]
}
