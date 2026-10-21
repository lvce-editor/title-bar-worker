import { expect, jest, test } from '@jest/globals'
import { createMockRpc } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as RendererProcess from '../src/parts/RendererProcess/RendererProcess.ts'
import * as ViewletTitleBarMenuBarSelectIndexNone from '../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarSelectIndexNone.ts'
import * as TitleBarMenuBarStates from '../src/parts/TitleBarMenuBarStates/TitleBarMenuBarStates.ts'

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

test('selectIndexNone commits closed menu and title bar before the selected command', async () => {
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
    menuUid: 202,
    titleBarEntries: [{ label: 'Help', width: 100 }],
  }
  TitleBarMenuBarStates.set(state.uid, state, state)
  const order: string[] = []
  let finished = false
  const { promise: command, resolve: resolveCommand } = Promise.withResolvers<void>()
  const { promise: commandStarted, resolve: resolveStarted } = Promise.withResolvers<void>()
  const queueCommands = jest.fn((_uid: number, _commands: readonly unknown[]) => {
    order.push('queue')
    return 7
  })
  const mockRendererProcessRpc = createMockRpc({ commandMap: { 'Viewlet.queueCommands': queueCommands } })
  RendererProcess.set(mockRendererProcessRpc)
  using mockRpc = RendererWorker.registerMockRpc({
    'About.showAbout'() {
      order.push('about')
      resolveStarted()
      return command
    },
    'Viewlet.applyCommands'(commands: readonly unknown[]) {
      expect(commands).toEqual([['Viewlet.commitPending', state.uid, 7]])
      order.push('render')
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

  expect(order).toEqual(['queue', 'render', 'about'])
  expect(TitleBarMenuBarStates.get(state.uid).newState).toMatchObject({
    focusedIndex: -1,
    isMenuOpen: false,
    menus: [],
  })
  expect(finished).toBe(false)
  resolveCommand()
  const result = await resultPromise
  expect(result.menus).toEqual([])
  expect(mockRendererProcessRpc.invocations).toHaveLength(1)
  expect(mockRendererProcessRpc.invocations[0][0]).toBe('Viewlet.queueCommands')
  const [, renderUid, queuedCommands] = mockRendererProcessRpc.invocations[0]
  expect(renderUid).toBe(state.uid)
  const widgetCommands = queuedCommands as readonly any[]
  expect(widgetCommands).toContainEqual(['Viewlet.setWidgets', state.uid, 1, []])
  const [, domUid, renderedDom] = widgetCommands.find((entry) => entry[0] === 'Viewlet.setDom2')
  expect(domUid).toBe(state.uid)
  const menuBar = renderedDom.find((node: any) => node.className?.includes('TitleBarMenuBar'))
  expect(menuBar?.ariaActivedescendant).toBe('')
  expect(renderedDom.find((node: any) => node.id === 'TitleBarEntryActive')).toBeUndefined()
  expect(mockRpc.invocations).toEqual([['Viewlet.applyCommands', [['Viewlet.commitPending', state.uid, 7]]], ['About.showAbout']])
})
