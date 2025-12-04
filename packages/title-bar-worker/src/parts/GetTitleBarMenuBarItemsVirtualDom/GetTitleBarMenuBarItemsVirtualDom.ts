import { VirtualDomElements, AriaRoles } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import type { VisibleMenuItem } from '../VisibleMenuItem/VisibleMenuItem.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const getItemVirtualDom = (item: VisibleMenuItem): readonly VirtualDomNode[] => {
  // @ts-ignore
  const { icon, isFocused, isOpen, keyboardShortCut, label } = item
  // TODO avoid mutation
  const dom: any[] = [
    {
      ariaExpanded: isOpen,
      ariaHasPopup: true,
      ariaKeyShortcuts: keyboardShortCut,
      childCount: 1,
      className: ClassNames.TitleBarTopLevelEntry,
      name: label, // TODO have separate name attribute
      role: AriaRoles.MenuItem,
      type: VirtualDomElements.Button,
    },
  ]
  if (isOpen) {
    // @ts-ignore
    dom[0].ariaOwns = 'Menu-0'
  }
  if (isFocused) {
    dom[0].className += ' ' + ClassNames.TitleBarEntryActive
    // @ts-ignore
    dom[0].id = 'TitleBarEntryActive'
    dom.push({
      childCount: 1,
      className: ClassNames.TitleBarTopLevelEntryLabel,
      type: VirtualDomElements.Div,
    })
  }
  dom.push(text(label))
  return dom
}

export const getTitleBarMenuBarItemsVirtualDom = (visibleItems: readonly VisibleMenuItem[]): readonly VirtualDomNode[] => {
  const dom = visibleItems.flatMap(getItemVirtualDom)
  return dom
}
