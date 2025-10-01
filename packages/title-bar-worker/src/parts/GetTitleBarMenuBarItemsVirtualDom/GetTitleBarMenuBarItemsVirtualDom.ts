import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const getItemVirtualDom = (item: any): readonly VirtualDomNode[] => {
  // @ts-ignore
  const { keyboardShortCut, label, icon, isOpen, isFocused } = item
  const dom = []
  dom.push({
    type: VirtualDomElements.Div,
    className: ClassNames.TitleBarTopLevelEntry,
    ariaHasPopup: true,
    ariaExpanded: isOpen,
    role: AriaRoles.MenuItem,
    childCount: 1,
    ariaKeyShortcuts: keyboardShortCut,
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

export const getTitleBarMenuBarItemsVirtualDom = (visibleItems: any): readonly VirtualDomNode[] => {
  const dom = visibleItems.flatMap(getItemVirtualDom)
  return dom
}
