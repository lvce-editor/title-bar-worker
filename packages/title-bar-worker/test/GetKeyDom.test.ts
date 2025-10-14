import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getKeyDom } from '../src/parts/GetKeyDom/GetKeyDom.ts'

test('getKeyDom - basic key', () => {
  const result = getKeyDom(29) // 'A' key
  expect(result).toHaveLength(2)
  expect(result[0]).toEqual({
    type: VirtualDomElements.Span,
    className: ClassNames.MenuItemKeyBinding,
    childCount: 1,
  })
  expect(result[1]).toEqual({
    type: VirtualDomElements.Text,
    text: 'A',
    childCount: 0,
  })
})

test('getKeyDom - ctrl key', () => {
  const result = getKeyDom(2048 + 29) // Ctrl+A (2048 is CtrlCmd, 29 is KeyA)
  expect(result).toHaveLength(2)
  expect(result[0]).toEqual({
    type: VirtualDomElements.Span,
    className: ClassNames.MenuItemKeyBinding,
    childCount: 1,
  })
  expect(result[1]).toEqual({
    type: VirtualDomElements.Text,
    text: 'Ctrl+A',
    childCount: 0,
  })
})

test('getKeyDom - ctrl+shift key', () => {
  const result = getKeyDom(2048 + 1024 + 29) // Ctrl+Shift+A (2048 is CtrlCmd, 1024 is Shift, 29 is KeyA)
  expect(result).toHaveLength(2)
  expect(result[0]).toEqual({
    type: VirtualDomElements.Span,
    className: ClassNames.MenuItemKeyBinding,
    childCount: 1,
  })
  expect(result[1]).toEqual({
    type: VirtualDomElements.Text,
    text: 'Ctrl+Shift+A',
    childCount: 0,
  })
})

test('getKeyDom - shift key', () => {
  const result = getKeyDom(1024 + 29) // Shift+A (1024 is Shift, 29 is KeyA)
  expect(result).toHaveLength(2)
  expect(result[0]).toEqual({
    type: VirtualDomElements.Span,
    className: ClassNames.MenuItemKeyBinding,
    childCount: 1,
  })
  expect(result[1]).toEqual({
    type: VirtualDomElements.Text,
    text: 'Shift+A',
    childCount: 0,
  })
})
