import { expect, test } from '@jest/globals'
import { AriaRoles, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getTitleBarMenuBarVirtualDom } from '../src/parts/GetTitleBarMenuBarVirtualDom/GetTitleBarMenuBarVirtualDom.ts'
import * as MergeClassNames from '../src/parts/MergeClassNames/MergeClassNames.ts'

test('getTitleBarMenuBarVirtualDom - disabled', () => {
  expect(getTitleBarMenuBarVirtualDom(false, [], -1)).toEqual([])
})

test('getTitleBarMenuBarVirtualDom - adds context menu listener', () => {
  expect(getTitleBarMenuBarVirtualDom(true, [], -1)).toEqual([
    {
      ariaActivedescendant: '',
      childCount: 0,
      className: MergeClassNames.mergeClassNames(ClassNames.Viewlet, ClassNames.TitleBarMenuBar),
      onContextMenu: DomEventListenerFunctions.HandleContextMenu,
      onFocusIn: DomEventListenerFunctions.HandleFocusIn,
      onFocusOut: DomEventListenerFunctions.HandleFocusOut,
      onMouseDown: DomEventListenerFunctions.HandleClick,
      onPointerOut: DomEventListenerFunctions.HandlePointerOut,
      onPointerOver: DomEventListenerFunctions.HandlePointerOver,
      role: AriaRoles.MenuBar,
      tabIndex: 0,
      type: VirtualDomElements.Div,
    },
  ])
})
