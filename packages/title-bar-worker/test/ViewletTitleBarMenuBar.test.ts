import { expect, test } from '@jest/globals'
import * as ViewletTitleBarMenuBar from '../src/parts/TitleBarMenuBar/TitleBarMenuBar.ts'

test('create', () => {
  // @ts-ignore
  const state = ViewletTitleBarMenuBar.create()
  expect(state).toBeDefined()
})
