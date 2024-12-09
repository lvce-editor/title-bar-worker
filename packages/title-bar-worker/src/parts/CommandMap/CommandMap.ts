import * as GetKeyBindings from '../GetKeyBindings/GetKeyBindings.ts'
import * as GetTitleBarMenuBarVirtualDom from '../GetTitleBarMenuBarVirtualDom/GetTitleBarMenuBarVirtualDom.ts'
import * as MenuEntries from '../MenuEntries/MenuEntries.ts'
import * as TitleBarMenuBar from '../TitleBarMenuBar/TitleBarMenuBar.ts'

export const commandMap = {
  'TitleBarMenuBar.create': TitleBarMenuBar.create,
  'TitleBarMenuBar.getKeyBindings': GetKeyBindings.getKeyBindings,
  'TitleBarMenuBar.getMenus': MenuEntries.getMenus,
  'TitleBarMenuBar.getVirtualDom': GetTitleBarMenuBarVirtualDom.getTitleBarMenuBarVirtualDom,
  'TitleBarMenuBar.loadContent': TitleBarMenuBar.loadContent,
}
