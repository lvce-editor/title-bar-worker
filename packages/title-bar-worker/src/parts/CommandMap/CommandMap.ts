import * as GetKeyBindings from '../GetKeyBindings/GetKeyBindings.ts'
import * as GetTitleBarMenuBarVirtualDom from '../GetTitleBarMenuBarVirtualDom/GetTitleBarMenuBarVirtualDom.ts'
import * as TitleBarMenuBar from '../TitleBarMenuBar/TitleBarMenuBar.ts'

export const commandMap = {
  'TitleBarMenuBar.create': TitleBarMenuBar.create,
  'TitleBarMenuBar.getVirtualDom': GetTitleBarMenuBarVirtualDom.getTitleBarMenuBarVirtualDom,
  'TitleBarMenuBar.loadContent': TitleBarMenuBar.loadContent,
  'TitleBarMenuBar.getKeyBindings': GetKeyBindings.getKeyBindings,
}
