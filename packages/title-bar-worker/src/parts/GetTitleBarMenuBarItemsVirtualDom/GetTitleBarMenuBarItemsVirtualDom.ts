import { AriaRoles, mergeClassNames, text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'

interface RenderedTitleBarEntry {
  readonly ariaLabel?: string
  readonly isFocused: boolean
  readonly isOpen?: boolean
  readonly keyboardShortCut?: string
  readonly label: string
}

const activeEntryLabelNode: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.TitleBarTopLevelEntryLabel,
  type: VirtualDomElements.Div,
}

const getActiveEntryLabelDom = (isFocused: boolean): readonly VirtualDomNode[] => {
  if (!isFocused) {
    return []
  }
  return [activeEntryLabelNode]
}

const getItemVirtualDom = (item: RenderedTitleBarEntry): readonly VirtualDomNode[] => {
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
    ...getActiveEntryLabelDom(isFocused),
    text(label),
  ]
}

export const getTitleBarMenuBarItemsVirtualDom = (visibleItems: readonly RenderedTitleBarEntry[]): readonly VirtualDomNode[] => {
  const dom = visibleItems.flatMap(getItemVirtualDom)
  return dom
}
