import { expect, test } from '@jest/globals'
import * as TitleBarMenuBarStrings from '../src/parts/TitleBarMenuBarStrings/TitleBarMenuBarStrings.ts'

test('moreDot', () => {
  expect(TitleBarMenuBarStrings.moreDot()).toBe('More ...')
})
