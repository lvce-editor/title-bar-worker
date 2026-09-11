import { setupMenuWorker } from '../test-support/MockMenuWorker.ts'

import { expect, test } from '@jest/globals'
import * as ViewletTitleBarMenuBar from '../src/parts/TitleBarMenuBar/TitleBarMenuBar.ts'

setupMenuWorker()

test('create', () => {
  // @ts-ignore
  const state = ViewletTitleBarMenuBar.create()
  expect(state).toBeDefined()
})
