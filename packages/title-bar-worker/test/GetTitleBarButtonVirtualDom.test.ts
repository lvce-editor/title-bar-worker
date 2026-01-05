import { expect, test } from '@jest/globals'
import { VirtualDomElements, AriaRoles } from '@lvce-editor/virtual-dom-worker'
import type { TitleBarButton } from '../src/parts/TitleBarButton/TitleBarButton.ts'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetTitleBarButtonVirtualDom from '../src/parts/GetTitleBarButtonVirtualDom/GetTitleBarButtonVirtualDom.ts'

test('createTitleBarButton - Close button', () => {
  const button: TitleBarButton = {
    icon: 'Close',
    id: 'Close',
    label: 'Close',
    onClick: DomEventListenerFunctions.HandleClickClose,
  }
  const result = GetTitleBarButtonVirtualDom.createTitleBarButton(button)
  expect(result).toHaveLength(2)
  expect(result[0]).toEqual({
    ariaLabel: 'Close',
    childCount: 1,
    className: 'TitleBarButton TitleBarButtonClose',
    onClick: DomEventListenerFunctions.HandleClickClose,
    type: VirtualDomElements.Button,
  })
  expect(result[1]).toEqual({
    childCount: 0,
    className: 'MaskIcon MaskIconClose',
    role: AriaRoles.None,
    type: VirtualDomElements.I,
  })
})

test('createTitleBarButton - Minimize button', () => {
  const button: TitleBarButton = {
    icon: 'Minimize',
    id: 'Minimize',
    label: 'Minimize',
    onClick: DomEventListenerFunctions.HandleClickMinimize,
  }
  const result = GetTitleBarButtonVirtualDom.createTitleBarButton(button)
  expect(result).toHaveLength(2)
  expect(result[0]).toEqual({
    ariaLabel: 'Minimize',
    childCount: 1,
    className: 'TitleBarButton TitleBarButtonMinimize',
    onClick: DomEventListenerFunctions.HandleClickMinimize,
    type: VirtualDomElements.Button,
  })
  expect(result[1]).toEqual({
    childCount: 0,
    className: 'MaskIcon MaskIconMinimize',
    role: AriaRoles.None,
    type: VirtualDomElements.I,
  })
})

test('createTitleBarButton - Maximize button', () => {
  const button: TitleBarButton = {
    icon: 'Maximize',
    id: 'Maximize',
    label: 'Maximize',
    onClick: DomEventListenerFunctions.HandleClickToggleMaximize,
  }
  const result = GetTitleBarButtonVirtualDom.createTitleBarButton(button)
  expect(result).toHaveLength(2)
  expect(result[0]).toEqual({
    ariaLabel: 'Maximize',
    childCount: 1,
    className: 'TitleBarButton TitleBarButtonMaximize',
    onClick: DomEventListenerFunctions.HandleClickToggleMaximize,
    type: VirtualDomElements.Button,
  })
  expect(result[1]).toEqual({
    childCount: 0,
    className: 'MaskIcon MaskIconMaximize',
    role: AriaRoles.None,
    type: VirtualDomElements.I,
  })
})

test('createTitleBarButton - custom button', () => {
  const button: TitleBarButton = {
    icon: 'CustomIcon',
    id: 'CustomId',
    label: 'Custom Label',
    onClick: DomEventListenerFunctions.HandleClick,
  }
  const result = GetTitleBarButtonVirtualDom.createTitleBarButton(button)
  expect(result).toHaveLength(2)
  expect(result[0]).toEqual({
    ariaLabel: 'Custom Label',
    childCount: 1,
    className: 'TitleBarButton TitleBarButtonCustomId',
    onClick: DomEventListenerFunctions.HandleClick,
    type: VirtualDomElements.Button,
  })
  expect(result[1]).toEqual({
    childCount: 0,
    className: 'MaskIcon MaskIconCustomIcon',
    role: AriaRoles.None,
    type: VirtualDomElements.I,
  })
})
