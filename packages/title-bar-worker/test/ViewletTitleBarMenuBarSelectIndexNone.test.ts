import { expect, test } from '@jest/globals'
import { createMockRpc } from '@lvce-editor/rpc'
import { remove as removeRpc, RpcId, RendererWorker, set as setRpc } from '@lvce-editor/rpc-registry'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as ViewletTitleBarMenuBarSelectIndexNone from '../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarSelectIndexNone.ts'
import * as TitleBarMenuBarStates from '../src/parts/TitleBarMenuBarStates/TitleBarMenuBarStates.ts'

const registerRendererProcessMockRpc = (
  commandMap: Record<string, (...args: any[]) => any>,
): ReturnType<typeof createMockRpc> & { [Symbol.dispose]: () => void } => {
  const mockRpc = createMockRpc({ commandMap })
  setRpc(RpcId.RendererProcess, mockRpc)
  return Object.assign(mockRpc, {
    [Symbol.dispose]() {
      removeRpc(RpcId.RendererProcess)
    },
  })
}

test('selectIndexNone executes command and closes menu', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.cut'() {},
  })

  const state: TitleBarMenuBarState = createDefaultState()
  const item = {
    command: 'Editor.cut',
    flags: 0,
    isExpanded: false,
    isFocused: false,
    key: 1,
    label: 'Test Item',
    level: 0,
  }
  const result = await ViewletTitleBarMenuBarSelectIndexNone.selectIndexNone(state, item)
  expect(result.menus).toEqual([])
  expect(result.isMenuOpen).toBe(false)
  expect(result.focusedIndex).toBe(-1)
  expect(mockRpc.invocations).toEqual([['Editor.cut']])
})

test('selectIndexNone closes the latest state after a workspace change', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    isMenuOpen: true,
    title: 'titlebar-beta',
    workspaceUri: '/tmp/titlebar-beta',
  }
  TitleBarMenuBarStates.set(state.uid, state, state)
  using mockRpc = RendererWorker.registerMockRpc({
    'Workspace.setPath'() {
      const newWorkspaceState = {
        ...state,
        title: 'titlebar-alpha',
        workspaceUri: '/tmp/titlebar-alpha',
      }
      TitleBarMenuBarStates.set(state.uid, state, newWorkspaceState)
    },
  })
  const item = {
    args: ['/tmp/titlebar-alpha'],
    command: 'Workspace.setPath',
    flags: 0,
    label: 'titlebar-alpha',
  }

  const result = await ViewletTitleBarMenuBarSelectIndexNone.selectIndexNone(state, item)

  expect(result.isMenuOpen).toBe(false)
  expect(result.menus).toEqual([])
  expect(result.title).toBe('titlebar-alpha')
  expect(result.workspaceUri).toBe('/tmp/titlebar-alpha')
  expect(TitleBarMenuBarStates.get(state.uid).newState).toMatchObject({
    focusedIndex: -1,
    isMenuOpen: false,
    menus: [],
    title: 'titlebar-alpha',
    workspaceUri: '/tmp/titlebar-alpha',
  })
  expect(mockRpc.invocations).toEqual([['Workspace.setPath', '/tmp/titlebar-alpha']])
})

test('selectIndexNone renders the closed menu before awaiting the selected command', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    focusedIndex: 0,
    isMenuOpen: true,
    menus: [
      {
        expanded: true,
        focusedIndex: 0,
        items: [],
        level: 0,
      } as any,
    ],
    titleBarEntries: [{ label: 'Help', width: 100 }],
  }
  TitleBarMenuBarStates.set(state.uid, state, state)
  const order: string[] = []
  let finished = false
  const { promise: command, resolve: resolveCommand } = Promise.withResolvers<void>()
  const { promise: commandStarted, resolve: resolveStarted } = Promise.withResolvers<void>()
  using mockRendererProcessRpc = registerRendererProcessMockRpc({
    'Viewlet.send'() {
      order.push('render')
    },
    'Viewlet.setDom2'() {
      order.push('render entries')
    },
  })
  using mockRpc = RendererWorker.registerMockRpc({
    'About.showAbout'() {
      order.push('about')
      resolveStarted()
      return command
    },
  })
  const item = {
    command: 'About.showAbout',
    flags: 0,
    label: 'About',
  }

  const resultPromise = ViewletTitleBarMenuBarSelectIndexNone.selectIndexNone(state, item)
  void resultPromise.then(() => {
    finished = true
  })
  await commandStarted

  expect(order).toEqual(['render', 'render entries', 'about'])
  expect(TitleBarMenuBarStates.get(state.uid).newState).toMatchObject({
    focusedIndex: -1,
    isMenuOpen: false,
    menus: [],
  })
  expect(finished).toBe(false)
  resolveCommand()
  const result = await resultPromise
  expect(result.menus).toEqual([])
  expect(mockRendererProcessRpc.invocations).toHaveLength(2)
  expect(mockRendererProcessRpc.invocations[0]).toEqual(['Viewlet.send', state.uid, 'setMenus', [['closeMenus', 0]], state.uid])
  const [renderCommand, renderUid, renderedDom] = mockRendererProcessRpc.invocations[1]
  expect(renderCommand).toBe('Viewlet.setDom2')
  expect(renderUid).toBe(state.uid)
  const menuBar = renderedDom.find((node: any) => node.className?.includes('TitleBarMenuBar'))
  expect(menuBar?.ariaActivedescendant).toBe('')
  expect(renderedDom.find((node: any) => node.id === 'TitleBarEntryActive')).toBeUndefined()
  expect(mockRpc.invocations).toEqual([['About.showAbout']])
})
