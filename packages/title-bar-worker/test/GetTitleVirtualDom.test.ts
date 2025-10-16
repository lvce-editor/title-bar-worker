import { expect, test } from '@jest/globals'
import * as GetTitleVirtualDom from '../src/parts/GetTitleVirtualDom/GetTitleVirtualDom.ts'

test('getTitleVirtualDom', () => {
  expect(GetTitleVirtualDom.getTitleVirtualDom('Test Title')).toEqual(expect.any(Array))
})
