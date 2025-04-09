import type { MenuItemRenderer } from '../MenuItemRenderer/MenuItemRenderer.ts'
import { getMenuItemCheckedDom } from '../GetMenuItemCheckedDom/GetMenuItemCheckedDom.ts'
import { getMenuItemDefaultDom } from '../GetMenuItemDefaultDom/GetMenuItemDefaultDom.ts'
import { getMenuItemDisabledDom } from '../GetMenuItemDisabledDom/GetMenuItemDisabledDom.ts'
import { getMenuItemsNoopDom } from '../GetMenuItemNoopDom/GetMenuItemNoopDom.ts'
import { getMenuItemSeparatorDom } from '../GetMenuItemSeparatorDom/GetMenuItemSeparatorDom.ts'
import { getMenuItemSubMenuDom } from '../GetMenuItemSubMenuDom/GetMenuItemSubMenuDom.ts'
import { getMenuItemUncheckedDom } from '../GetMenuItemUncheckedDom/GetMenuItemUncheckedDom.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'

export const getMenuItemRenderer = (flags: number): MenuItemRenderer => {
  switch (flags) {
    case MenuItemFlags.None:
    case MenuItemFlags.RestoreFocus:
    case MenuItemFlags.Ignore:
      return getMenuItemDefaultDom
    case MenuItemFlags.Separator:
      return getMenuItemSeparatorDom
    case MenuItemFlags.Checked:
      return getMenuItemCheckedDom
    case MenuItemFlags.Unchecked:
      return getMenuItemUncheckedDom
    case MenuItemFlags.Disabled:
      return getMenuItemDisabledDom
    case MenuItemFlags.SubMenu:
      return getMenuItemSubMenuDom
    default:
      return getMenuItemsNoopDom
  }
}
