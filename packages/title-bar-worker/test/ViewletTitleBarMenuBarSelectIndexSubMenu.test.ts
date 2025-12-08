import { expect, test } from '@jest/globals'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as ViewletTitleBarMenuBarSelectIndexSubMenu from '../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarSelectIndexSubMenu.ts'

test('selectIndexSubMenu creates submenu and updates parent menu', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    menus: [
      {
        focusedIndex: -1,
        items: [{ id: 2 }], // Edit menu ID
        level: 0,
        x: 100,
        y: 50,
      },
    ],
  }
  const menu = state.menus[0]
  const result = await ViewletTitleBarMenuBarSelectIndexSubMenu.selectIndexSubMenu(state, menu, 0)
  expect(result.menus).toHaveLength(2)
  expect(result.menus[0].focusedIndex).toBe(0)
  expect(result.menus[1].level).toBe(1)
  expect(result.menus[1].x).toBe(250) // x + MENU_WIDTH (250)
  expect(result.menus[1].y).toBe(50) // y + index * 25
  expect(result.menus[1].focusedIndex).toBe(-1)
})
