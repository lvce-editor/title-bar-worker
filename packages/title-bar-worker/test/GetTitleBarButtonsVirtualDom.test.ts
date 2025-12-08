import { expect, test } from '@jest/globals'
import { VirtualDomElements, AriaRoles } from '@lvce-editor/virtual-dom-worker'
import type { TitleBarButton } from '../src/parts/TitleBarButton/TitleBarButton.ts'
import * as GetTitleBarButtonsVirtualDom from '../src/parts/GetTitleBarButtonsVirtualDom/GetTitleBarButtonsVirtualDom.ts'

test('getTitleBarButtonsVirtualDom - buttonsEnabled false', () => {
  const buttons: readonly TitleBarButton[] = [
    {
      icon: 'Close',
      id: 'Close',
      label: 'Close',
      onClick: 'close',
    },
  ]
  const result = GetTitleBarButtonsVirtualDom.getTitleBarButtonsVirtualDom(false, buttons)
  expect(result).toEqual([])
})

test('getTitleBarButtonsVirtualDom - buttonsEnabled true with empty buttons', () => {
  const buttons: readonly TitleBarButton[] = []
  const result = GetTitleBarButtonsVirtualDom.getTitleBarButtonsVirtualDom(true, buttons)
  expect(result).toEqual([
    {
      childCount: 0,
      className: 'Viewlet TitleBarButtons',
      type: VirtualDomElements.Div,
    },
  ])
})

test('getTitleBarButtonsVirtualDom - buttonsEnabled true with single button', () => {
  const buttons: readonly TitleBarButton[] = [
    {
      icon: 'Close',
      id: 'Close',
      label: 'Close',
      onClick: 'close',
    },
  ]
  const result = GetTitleBarButtonsVirtualDom.getTitleBarButtonsVirtualDom(true, buttons)
  expect(result).toHaveLength(3)
  expect(result[0]).toEqual({
    childCount: 1,
    className: 'Viewlet TitleBarButtons',
    type: VirtualDomElements.Div,
  })
  expect(result[1]).toEqual({
    ariaLabel: 'Close',
    childCount: 1,
    className: 'TitleBarButton TitleBarButtonClose',
    onClick: 'close',
    type: VirtualDomElements.Button,
  })
  expect(result[2]).toEqual({
    childCount: 0,
    className: 'MaskIcon MaskIconClose',
    role: AriaRoles.None,
    type: VirtualDomElements.I,
  })
})

test('getTitleBarButtonsVirtualDom - buttonsEnabled true with multiple buttons', () => {
  const buttons: readonly TitleBarButton[] = [
    {
      icon: 'Minimize',
      id: 'Minimize',
      label: 'Minimize',
      onClick: 'minimize',
    },
    {
      icon: 'Maximize',
      id: 'Maximize',
      label: 'Maximize',
      onClick: 'maximize',
    },
    {
      icon: 'Close',
      id: 'Close',
      label: 'Close',
      onClick: 'close',
    },
  ]
  const result = GetTitleBarButtonsVirtualDom.getTitleBarButtonsVirtualDom(true, buttons)
  expect(result).toHaveLength(7)
  expect(result[0]).toEqual({
    childCount: 3,
    className: 'Viewlet TitleBarButtons',
    type: VirtualDomElements.Div,
  })
  expect(result[1]).toEqual({
    ariaLabel: 'Minimize',
    childCount: 1,
    className: 'TitleBarButton TitleBarButtonMinimize',
    onClick: 'minimize',
    type: VirtualDomElements.Button,
  })
  expect(result[3]).toEqual({
    ariaLabel: 'Maximize',
    childCount: 1,
    className: 'TitleBarButton TitleBarButtonMaximize',
    onClick: 'maximize',
    type: VirtualDomElements.Button,
  })
  expect(result[5]).toEqual({
    ariaLabel: 'Close',
    childCount: 1,
    className: 'TitleBarButton TitleBarButtonClose',
    onClick: 'close',
    type: VirtualDomElements.Button,
  })
})
