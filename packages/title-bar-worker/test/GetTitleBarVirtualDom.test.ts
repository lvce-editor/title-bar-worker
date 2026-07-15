import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { getTitleBarVirtualDom } from '../src/parts/GetTitleBarVirtualDom/GetTitleBarVirtualDom.ts'

test('getTitleBarVirtualDom - excludes disabled menu bar from children', () => {
  const state = {
    ...createDefaultState(),
    titleBarMenuBarEnabled: false,
  }

  const dom = getTitleBarVirtualDom(state)

  expect(dom[0].childCount).toBe(3)
  expect(dom).not.toContainEqual(expect.objectContaining({ className: expect.stringContaining('TitleBarMenuBar') }))
})
