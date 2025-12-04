import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as GetTitleBarIconVirtualDom from '../src/parts/GetTitleBarIconVirtualDom/GetTitleBarIconVirtualDom.ts'

test('getTitleBarIconVirtualDom', () => {
  expect(GetTitleBarIconVirtualDom.getTitleBarIconVirtualDom('test-icon.png')).toEqual([
    {
      childCount: 1,
      className: 'Viewlet TitleBarIcon',
      type: VirtualDomElements.Div,
    },
    {
      alt: '',
      childCount: 0,
      className: 'TitleBarIconIcon',
      src: 'test-icon.png',
      type: VirtualDomElements.Img,
    },
  ])
})
