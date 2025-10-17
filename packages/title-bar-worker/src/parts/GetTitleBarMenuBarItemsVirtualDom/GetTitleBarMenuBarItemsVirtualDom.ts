import { VirtualDomElements, AriaRoles } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import type { VisibleMenuItem } from '../VisibleMenuItem/VisibleMenuItem.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const getItemVirtualDom = (item: VisibleMenuItem): readonly VirtualDomNode[] => {
  // @ts-ignore
  const { keyboardShortCut, label, icon, isOpen, isFocused } = item
  // TODO avoid mutation
  const dom = []
  dom.push({
    type: VirtualDomElements.Button,
    className: ClassNames.TitleBarTopLevelEntry,
    ariaHasPopup: true,
    ariaExpanded: isOpen,
    role: AriaRoles.MenuItem,
    childCount: 1,
    ariaKeyShortcuts: keyboardShortCut,
    name: label, // TODO have separate name attribute
  })
  if (isOpen) {
    // @ts-ignore
    dom[0].ariaOwns = 'Menu-0'
  }
  if (isFocused) {
    dom[0].className += ' ' + ClassNames.TitleBarEntryActive
    // @ts-ignore
    dom[0].id = 'TitleBarEntryActive'
    dom.push({
      type: VirtualDomElements.Div,
      className: ClassNames.TitleBarTopLevelEntryLabel,
      childCount: 1,
    })
  }
  dom.push(text(label))
  return dom
}

export const getTitleBarMenuBarItemsVirtualDom = (visibleItems: readonly VisibleMenuItem[]): readonly VirtualDomNode[] => {
  const dom = visibleItems.flatMap(getItemVirtualDom)
  return dom
}
