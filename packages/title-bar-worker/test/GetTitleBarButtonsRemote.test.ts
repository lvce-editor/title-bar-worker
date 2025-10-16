import { expect, test } from '@jest/globals'
import * as GetTitleBarButtonsRemote from '../src/parts/GetTitleBarButtonsRemote/GetTitleBarButtonsRemote.ts'

test('getTitleBarButtonsRemote', () => {
  expect(GetTitleBarButtonsRemote.getTitleBarButtonsRemote()).toEqual([])
})
