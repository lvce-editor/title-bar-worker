import { AriaRoles, mergeClassNames, text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import type { VisibleMenuItem } from '../VisibleMenuItem/VisibleMenuItem.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'

const activeEntryLabelNode: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.TitleBarTopLevelEntryLabel,
  type: VirtualDomElements.Div,
}

const getItemVirtualDom = (item: VisibleMenuItem): readonly VirtualDomNode[] => {
  // @ts-ignore
  const { ariaLabel, isFocused, isOpen, keyboardShortCut, label } = item
  const className = isFocused ? mergeClassNames(ClassNames.TitleBarTopLevelEntry, ClassNames.TitleBarEntryActive) : ClassNames.TitleBarTopLevelEntry
  return [
    {
      ariaExpanded: isOpen,
      ariaHasPopup: true,
      ariaKeyShortcuts: keyboardShortCut,
      ariaLabel: ariaLabel || label,
      ariaOwns: isOpen ? 'Menu-0' : undefined,
      childCount: 1,
      className,
      id: isFocused ? 'TitleBarEntryActive' : undefined,
      name: label, // TODO have separate name attribute
      role: AriaRoles.MenuItem,
      type: VirtualDomElements.Button,
    },
    ...(isFocused ? [activeEntryLabelNode] : []),
    text(label),
  ]
}

export const getTitleBarMenuBarItemsVirtualDom = (visibleItems: readonly VisibleMenuItem[]): readonly VirtualDomNode[] => {
  const dom = visibleItems.flatMap(getItemVirtualDom)
  return dom
}
