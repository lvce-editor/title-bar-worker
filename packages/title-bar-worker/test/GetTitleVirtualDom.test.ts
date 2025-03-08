import { expect, test } from '@jest/globals'
import * as GetTitleVirtualDom from '../src/parts/GetTitleVirtualDom/GetTitleVirtualDom.ts'
import * as VirtualDomElements from '../src/parts/VirtualDomElements/VirtualDomElements.ts'

test('getTitleVirtualDom', () => {
  expect(GetTitleVirtualDom.getTitleVirtualDom('Test Title')).toEqual([
    {
      type: VirtualDomElements.Text,
      text: 'Test Title',
      childCount: 0,
    },
  ])
})
