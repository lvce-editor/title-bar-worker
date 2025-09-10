import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as GetTitleVirtualDom from '../src/parts/GetTitleVirtualDom/GetTitleVirtualDom.ts'

test('getTitleVirtualDom', () => {
  expect(GetTitleVirtualDom.getTitleVirtualDom('Test Title')).toEqual([
    {
      type: VirtualDomElements.Text,
      text: 'Test Title',
      childCount: 0,
    },
  ])
})
