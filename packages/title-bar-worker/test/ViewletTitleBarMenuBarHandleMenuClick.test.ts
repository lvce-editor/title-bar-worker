import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'
import * as ViewletTitleBarMenuBarHandleMenuClick from '../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarHandleMenuClick.ts'

test('handleMenuClick executes checked menu item command', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Dialog.showMessage'() {},
  })

  const state = {
    ...createDefaultState(),
    isMenuOpen: true,
    menus: [
      {
        focusedIndex: 0,
        items: [
          {
            args: [{ message: 'not implemented' }],
            command: 'Dialog.showMessage',
            flags: MenuItemFlags.Checked,
            id: 'menuBar',
            label: 'Menu Bar',
          },
        ],
        level: 1,
        x: 0,
        y: 0,
      },
    ],
  }

  const result = await ViewletTitleBarMenuBarHandleMenuClick.handleMenuClick(state, 0, 0)

  expect(result.menus).toEqual([])
  expect(result.isMenuOpen).toBe(false)
  expect(mockRpc.invocations).toEqual([['Dialog.showMessage', { message: 'not implemented' }]])
})
