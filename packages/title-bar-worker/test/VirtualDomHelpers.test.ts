import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as VirtualDomHelpers from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'

test('text - creates text node with correct properties', () => {
  expect(VirtualDomHelpers.text('Hello World')).toEqual({
    type: VirtualDomElements.Text,
    text: 'Hello World',
    childCount: 0,
  })
})

test('text - handles empty string', () => {
  expect(VirtualDomHelpers.text('')).toEqual({
    type: VirtualDomElements.Text,
    text: '',
    childCount: 0,
  })
})

test('text - handles special characters', () => {
  expect(VirtualDomHelpers.text('Hello\nWorld!')).toEqual({
    type: VirtualDomElements.Text,
    text: 'Hello\nWorld!',
    childCount: 0,
  })
})
