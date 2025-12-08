import { AriaRoles, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import type { VisibleMenuItem } from '../VisibleMenuItem/VisibleMenuItem.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'

const getItemVirtualDom = (item: VisibleMenuItem): readonly VirtualDomNode[] => {
  // @ts-ignore
  const { icon, isFocused, isOpen, keyboardShortCut, label } = item
  let className = ClassNames.TitleBarTopLevelEntry
  if (isFocused) {
    className += ' ' + ClassNames.TitleBarEntryActive
  }
  return [
    {
      ariaExpanded: isOpen,
      ariaHasPopup: true,
      ariaKeyShortcuts: keyboardShortCut,
      ariaOwns: isOpen ? 'Menu-0' : undefined,
      childCount: 1,
      className: ClassNames.TitleBarTopLevelEntry,
      id: isFocused ? 'TitleBarEntryActive' : undefined,
      name: label, // TODO have separate name attribute
      role: AriaRoles.MenuItem,
      type: VirtualDomElements.Button,
    },
    { childCount: 1, className: ClassNames.TitleBarTopLevelEntryLabel, type: VirtualDomElements.Div },
  ]
}

export const getTitleBarMenuBarItemsVirtualDom = (visibleItems: readonly VisibleMenuItem[]): readonly VirtualDomNode[] => {
  const dom = visibleItems.flatMap(getItemVirtualDom)
  return dom
}
