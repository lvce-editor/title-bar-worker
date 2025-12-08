import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { MenuIdTitleBarContextMenu } from '../src/parts/GetMenuIds/GetMenuIds.ts'
import * as HandleContextMenu from '../src/parts/HandleContextMenu/HandleContextMenu.ts'

test('handleContextMenu - calls ContextMenu.show2 with correct parameters', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2'() {},
  })

  const state: TitleBarMenuBarState = createDefaultState()
  const button = 2
  const eventX = 100
  const eventY = 50

  const result = await HandleContextMenu.handleContextMenu(state, button, eventX, eventY)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([
    [
      'ContextMenu.show2',
      state.uid,
      MenuIdTitleBarContextMenu,
      eventX,
      eventY,
      {
        menuId: MenuIdTitleBarContextMenu,
      },
    ],
  ])
})

test('handleContextMenu - returns same state', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2'() {},
  })

  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    height: 800,
    uid: 5,
    width: 1200,
  }
  const button = 1
  const eventX = 200
  const eventY = 75

  const result = await HandleContextMenu.handleContextMenu(state, button, eventX, eventY)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toHaveLength(1)
})
