import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetKeyBindingsString from '../GetKeyBindingsString/GetKeyBindingsString.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import * as ParseKey from '../ParseKey/ParseKey.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const separator: VirtualDomNode = {
  type: VirtualDomElements.Div,
  className: ClassNames.MenuItemSeparator,
  role: AriaRoles.Separator,
  childCount: 1,
}

const separatorLine: VirtualDomNode = {
  type: VirtualDomElements.Div,
  className: ClassNames.MenuItemSeparatorLine,
  childCount: 0,
}

const checkboxUnchecked: VirtualDomNode = {
  type: VirtualDomElements.Div,
  className: ClassNames.MenuItem,
  role: AriaRoles.MenuItemCheckBox,
  ariaChecked: false,
  tabIndex: -1,
  childCount: 1,
}

const checkboxChecked: VirtualDomNode = {
  type: VirtualDomElements.Div,
  className: MergeClassNames.mergeClassNames(ClassNames.MenuItem, ClassNames.MenuItemCheckMark),
  role: AriaRoles.MenuItemCheckBox,
  ariaChecked: true,
  tabIndex: -1,
  childCount: 2,
}

const disabled: VirtualDomNode = {
  type: VirtualDomElements.Div,
  className: ClassNames.MenuItem,
  role: AriaRoles.MenuItem,
  tabIndex: -1,
  disabled: true,
  childCount: 1,
}

const arrowRight: VirtualDomNode = {
  type: VirtualDomElements.Div,
  className: ClassNames.MenuItemSubMenuArrowRight,
  childCount: 0,
}

const getMenuItemSeparatorDom = (menuItem: any): readonly VirtualDomNode[] => {
  return [separator, separatorLine]
}

const getMenuItemCheckedDom = (menuItem: any): readonly VirtualDomNode[] => {
  const { label } = menuItem
  return [
    checkboxChecked,
    {
      type: VirtualDomElements.Div,
      className: MergeClassNames.mergeClassNames(ClassNames.MenuItemCheckmarkIcon, ClassNames.MaskIconCheck),
    },
    text(label),
  ]
}

const getMenuItemUncheckedDom = (menuItem: any): readonly VirtualDomNode[] => {
  const { label } = menuItem
  return [checkboxUnchecked, text(label)]
}

const getMenuItemDisabledDom = (menuItem: any): readonly VirtualDomNode[] => {
  const { label } = menuItem
  return [disabled, text(label)]
}

const getMenuItemDefaultDom = (menuItem: any): readonly VirtualDomNode[] => {
  const { label, isFocused, key } = menuItem
  let className = ClassNames.MenuItem
  if (isFocused) {
    className += ' ' + ClassNames.MenuItemFocused
  }
  const dom: any[] = []
  dom.push(
    {
      type: VirtualDomElements.Div,
      className,
      role: AriaRoles.MenuItem,
      tabIndex: -1,
      childCount: 1,
    },
    text(label),
  )
  if (key) {
    dom[0].childCount++
    const parsedKey = ParseKey.parseKey(key)
    const keyBindingsString = GetKeyBindingsString.getKeyBindingString(parsedKey.key, false, parsedKey.isCtrl, parsedKey.isShift, false)
    dom.push(
      {
        type: VirtualDomElements.Span,
        className: ClassNames.MenuItemKeyBinding,
        childCount: 1,
      },
      text(keyBindingsString),
    )
  }
  return dom
}

const getMenuItemSubMenuDom = (menuItem: any): readonly VirtualDomNode[] => {
  const { label, isFocused, isExpanded, level } = menuItem
  let className = ClassNames.MenuItem
  className += ' ' + ClassNames.MenuItemSubMenu
  if (isFocused) {
    className += ' ' + ClassNames.MenuItemFocused
  }
  return [
    {
      type: VirtualDomElements.Div,
      className,
      role: AriaRoles.MenuItem,
      tabIndex: -1,
      ariaHasPopup: true,
      ariaExpanded: isExpanded,
      ariaOwns: isExpanded ? `Menu-${level + 1}` : undefined,
      childCount: 2,
    },
    text(label),
    arrowRight,
  ]
}

const getMenuItemVirtualDom = (menuItem: any): readonly VirtualDomNode[] => {
  const { flags } = menuItem
  switch (flags) {
    case MenuItemFlags.None:
    case MenuItemFlags.RestoreFocus:
    case MenuItemFlags.Ignore:
      return getMenuItemDefaultDom(menuItem)
    case MenuItemFlags.Separator:
      return getMenuItemSeparatorDom(menuItem)
    case MenuItemFlags.Checked:
      return getMenuItemCheckedDom(menuItem)
    case MenuItemFlags.Unchecked:
      return getMenuItemUncheckedDom(menuItem)
    case MenuItemFlags.Disabled:
      return getMenuItemDisabledDom(menuItem)
    case MenuItemFlags.SubMenu:
      return getMenuItemSubMenuDom(menuItem)
    default:
      return []
  }
}

export const getMenuVirtualDom = (menuItems: readonly any[]): readonly VirtualDomNode[] => {
  const dom = []
  dom.push({
    type: VirtualDomElements.Div,
    className: ClassNames.Menu,
    role: AriaRoles.Menu,
    tabIndex: -1,
    childCount: menuItems.length,
  })
  dom.push(...menuItems.flatMap(getMenuItemVirtualDom))
  return dom
}
