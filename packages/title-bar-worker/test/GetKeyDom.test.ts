import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getKeyDom } from '../src/parts/GetKeyDom/GetKeyDom.ts'

test('getKeyDom - basic key', () => {
  const result = getKeyDom(29) // 'A' key
  expect(result).toHaveLength(2)
  expect(result[0]).toEqual({
    childCount: 1,
    className: ClassNames.MenuItemKeyBinding,
    type: VirtualDomElements.Span,
  })
  expect(result[1]).toEqual({
    childCount: 0,
    text: 'A',
    type: VirtualDomElements.Text,
  })
})

test('getKeyDom - ctrl key', () => {
  const result = getKeyDom(2048 + 29) // Ctrl+A (2048 is CtrlCmd, 29 is KeyA)
  expect(result).toHaveLength(2)
  expect(result[0]).toEqual({
    childCount: 1,
    className: ClassNames.MenuItemKeyBinding,
    type: VirtualDomElements.Span,
  })
  expect(result[1]).toEqual({
    childCount: 0,
    text: 'Ctrl+A',
    type: VirtualDomElements.Text,
  })
})

test('getKeyDom - ctrl+shift key', () => {
  const result = getKeyDom(2048 + 1024 + 29) // Ctrl+Shift+A (2048 is CtrlCmd, 1024 is Shift, 29 is KeyA)
  expect(result).toHaveLength(2)
  expect(result[0]).toEqual({
    childCount: 1,
    className: ClassNames.MenuItemKeyBinding,
    type: VirtualDomElements.Span,
  })
  expect(result[1]).toEqual({
    childCount: 0,
    text: 'Ctrl+Shift+A',
    type: VirtualDomElements.Text,
  })
})

test('getKeyDom - shift key', () => {
  const result = getKeyDom(1024 + 29) // Shift+A (1024 is Shift, 29 is KeyA)
  expect(result).toHaveLength(2)
  expect(result[0]).toEqual({
    childCount: 1,
    className: ClassNames.MenuItemKeyBinding,
    type: VirtualDomElements.Span,
  })
  expect(result[1]).toEqual({
    childCount: 0,
    text: 'Shift+A',
    type: VirtualDomElements.Text,
  })
})
