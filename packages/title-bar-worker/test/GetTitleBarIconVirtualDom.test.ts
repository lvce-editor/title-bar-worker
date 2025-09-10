import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as GetTitleBarIconVirtualDom from '../src/parts/GetTitleBarIconVirtualDom/GetTitleBarIconVirtualDom.ts'

test('getTitleBarIconVirtualDom', () => {
  expect(GetTitleBarIconVirtualDom.getTitleBarIconVirtualDom('test-icon.png')).toEqual([
    {
      type: VirtualDomElements.Div,
      className: 'Viewlet TitleBarIcon',
      childCount: 1,
    },
    {
      type: VirtualDomElements.Img,
      className: 'TitleBarIconIcon',
      src: 'test-icon.png',
      alt: '',
      childCount: 0,
    },
  ])
})
