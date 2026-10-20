import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { IMenu } from '../IMenu/IMenu.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getMenuItemVirtualDom } from '../GetMenuItemVirtualDom/GetMenuItemVirtualDom.ts'
import { getMenuVirtualDom } from '../GetMenuVirtualDom/GetMenuVirtualDom.ts'
import { getVisible } from '../GetVisibleMenuItems/GetVisibleMenuItems.ts'
import * as Menu from '../Menu/Menu.ts'

const getMenuDom = (menu: IMenu): readonly VirtualDomNode[] => {
  const { expanded = false, focusedIndex, height = Menu.getMenuHeight(menu.items), items, level, width = Menu.getMenuWidth(), x, y } = menu
  const visible = getVisible(items, focusedIndex, expanded, level)
  const children = visible.flatMap((item, index) => {
    const [root, ...rest] = getMenuItemVirtualDom(item)
    return [
      {
        ...root,
        name: `${level}:${index}`,
        onClick: DomEventListenerFunctions.HandleMenuItemClick,
        onMouseMove: DomEventListenerFunctions.HandleMenuItemHover,
      },
      ...rest,
    ]
  })
  return [
    {
      ...getMenuVirtualDom([])[0],
      childCount: items.length,
      id: `Menu-${level}`,
      style: `left:${x}px;top:${y}px;width:${width}px;height:${height}px`,
    },
    ...children,
  ]
}

export const getMenuRootVirtualDom = (menus: readonly IMenu[]): readonly VirtualDomNode[] => [
  {
    childCount: menus.length,
    className: 'TitleBarMenuRoot',
    onMouseLeave: DomEventListenerFunctions.HandleMenuRootLeave,
    type: VirtualDomElements.Div,
  },
  ...menus.flatMap(getMenuDom),
]
