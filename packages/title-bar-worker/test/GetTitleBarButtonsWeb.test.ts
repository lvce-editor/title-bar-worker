import { expect, test } from '@jest/globals'
import * as GetTitleBarButtonsWeb from '../src/parts/GetTitleBarButtonsWeb/GetTitleBarButtonsWeb.ts'

test('getTitleBarButtonsWeb', () => {
  expect(GetTitleBarButtonsWeb.getTitleBarButtonsWeb()).toEqual([])
})
