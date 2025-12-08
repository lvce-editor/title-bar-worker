import { expect, test } from '@jest/globals'
import { VirtualDomElements, AriaRoles } from '@lvce-editor/virtual-dom-worker'
import { getIconVirtualDom } from '../src/parts/GetIconVirtualDom/GetIconVirtualDom.ts'

test('getIconVirtualDom - with default type', () => {
  const result = getIconVirtualDom('TestIcon')
  expect(result).toEqual({
    childCount: 0,
    className: 'MaskIcon MaskIconTestIcon',
    role: AriaRoles.None,
    type: VirtualDomElements.Div,
  })
})

test('getIconVirtualDom - with custom type', () => {
  const result = getIconVirtualDom('CustomIcon', VirtualDomElements.Span)
  expect(result).toEqual({
    childCount: 0,
    className: 'MaskIcon MaskIconCustomIcon',
    role: AriaRoles.None,
    type: VirtualDomElements.Span,
  })
})

test('getIconVirtualDom - with different icon strings', () => {
  const result1 = getIconVirtualDom('Icon1')
  const result2 = getIconVirtualDom('Icon2')

  expect(result1.className).toBe('MaskIcon MaskIconIcon1')
  expect(result2.className).toBe('MaskIcon MaskIconIcon2')
  expect(result1.type).toBe(VirtualDomElements.Div)
  expect(result2.type).toBe(VirtualDomElements.Div)
})

test('getIconVirtualDom - with empty icon string', () => {
  const result = getIconVirtualDom('')
  expect(result).toEqual({
    childCount: 0,
    className: 'MaskIcon MaskIcon',
    role: AriaRoles.None,
    type: VirtualDomElements.Div,
  })
})

test('getIconVirtualDom - with different element types', () => {
  const divResult = getIconVirtualDom('Test', VirtualDomElements.Div)
  const spanResult = getIconVirtualDom('Test', VirtualDomElements.Span)
  const buttonResult = getIconVirtualDom('Test', VirtualDomElements.Button)

  expect(divResult.type).toBe(VirtualDomElements.Div)
  expect(spanResult.type).toBe(VirtualDomElements.Span)
  expect(buttonResult.type).toBe(VirtualDomElements.Button)

  expect(divResult.className).toBe('MaskIcon MaskIconTest')
  expect(spanResult.className).toBe('MaskIcon MaskIconTest')
  expect(buttonResult.className).toBe('MaskIcon MaskIconTest')
})
