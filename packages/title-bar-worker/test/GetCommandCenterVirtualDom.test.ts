import { expect, test } from '@jest/globals'
import { AriaRoles, VirtualDomElements } from '@lvce-editor/constants'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getCommandCenterVirtualDom } from '../src/parts/GetCommandCenterVirtualDom/GetCommandCenterVirtualDom.ts'

test('getCommandCenterVirtualDom returns no nodes when disabled', () => {
  expect(getCommandCenterVirtualDom(false)).toEqual([])
})

test('getCommandCenterVirtualDom returns an accessible command center when enabled', () => {
  expect(getCommandCenterVirtualDom(true)).toEqual([
    {
      ariaLabel: 'Command Center',
      childCount: 1,
      className: 'TitleBarCommandCenter',
      onClick: DomEventListenerFunctions.HandleCommandCenterClick,
      onKeyDown: DomEventListenerFunctions.HandleCommandCenterKeyDown,
      role: AriaRoles.Button,
      tabIndex: 0,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: 'Search',
      type: VirtualDomElements.Text,
    },
  ])
})
