/* eslint-disable jest/no-restricted-jest-methods */
import { expect, jest, test } from '@jest/globals'
import { PlatformType } from '@lvce-editor/constants'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as TitleBarMenuBarStates from '../src/parts/TitleBarMenuBarStates/TitleBarMenuBarStates.ts'

const mockLoadContent2 = jest.fn<(state: TitleBarMenuBarState) => Promise<TitleBarMenuBarState>>()

await jest.unstable_mockModule('../src/parts/LoadContent2/LoadContent2.ts', () => ({
  loadContent2: mockLoadContent2,
}))

const { loadContent2Command } = await import('../src/parts/LoadContent2Command/LoadContent2Command.ts')

const closeButton = {
  icon: 'ChromeClose',
  id: 'Close',
  label: 'Close',
  onClick: 1,
}

const createMockState = (overrides: Partial<TitleBarMenuBarState> = {}): TitleBarMenuBarState => ({
  appName: 'Lvce Editor',
  assetDir: '/assets',
  buttons: [],
  commandCenterEnabled: false,
  commandMap: {},
  controlsOverlayEnabled: false,
  focused: false,
  focusedIndex: -1,
  height: 100,
  iconWidth: 30,
  isMenuOpen: false,
  labelFontFamily: 'Arial',
  labelFontSize: 14,
  labelFontWeight: 400,
  labelLetterSpacing: 0,
  labelPadding: 10,
  layoutControlsEnabled: false,
  menus: [],
  platform: PlatformType.Web,
  title: '',
  titleBarButtons: [],
  titleBarButtonsEnabled: true,
  titleBarButtonsWidth: 0,
  titleBarEntries: [],
  titleBarHeight: 30,
  titleBarIconEnabled: true,
  titleBarIconWidth: 16,
  titleBarMenuBarEnabled: true,
  titleBarStyleCustom: true,
  titleBarTitleEnabled: true,
  titleTemplate: '${folderName}',
  titleWidth: 0,
  uid: 1,
  width: 800,
  workspaceUri: '',
  x: 0,
  y: 0,
  ...overrides,
})

const createPendingLoadContent = (): {
  readonly promise: Promise<TitleBarMenuBarState>
  readonly resolveLoadContent: (state: TitleBarMenuBarState) => void
} => {
  const { promise, resolve } = Promise.withResolvers<TitleBarMenuBarState>()
  return { promise, resolveLoadContent: resolve }
}

test('loadContent2Command - keeps newer workspace title when load finishes late', async () => {
  const uid = 1
  const oldState = createMockState({
    title: 'old-workspace',
    titleWidth: 130,
    workspaceUri: '/tmp/old-workspace',
  })
  const newWorkspaceState = createMockState({
    title: 'new-workspace',
    titleBarEntries: [],
    titleWidth: 130,
    workspaceUri: '/tmp/new-workspace',
  })
  const loadedState = createMockState({
    buttons: [closeButton],
    title: 'old-workspace',
    titleBarButtons: [closeButton],
    titleBarEntries: [{ id: 'File', label: 'File', width: 100 }],
    titleWidth: 130,
    workspaceUri: '/tmp/old-workspace',
  })
  const { promise: loadContentPromise, resolveLoadContent } = createPendingLoadContent()
  mockLoadContent2.mockReturnValueOnce(loadContentPromise)
  TitleBarMenuBarStates.set(uid, oldState, oldState)

  const promise = loadContent2Command(uid)
  TitleBarMenuBarStates.set(uid, oldState, newWorkspaceState)
  resolveLoadContent(loadedState)
  await promise

  const { newState } = TitleBarMenuBarStates.get(uid)
  expect(newState.title).toBe('new-workspace')
  expect(newState.workspaceUri).toBe('/tmp/new-workspace')
  expect(newState.titleBarEntries).toEqual([{ id: 'File', label: 'File', width: 100 }])
  expect(newState.titleBarButtons).toEqual([closeButton])
})

test('loadContent2Command - applies title from load when workspace has not changed', async () => {
  const uid = 2
  const oldState = createMockState({
    workspaceUri: '/tmp/workspace',
  })
  const loadedState = createMockState({
    title: 'workspace',
    titleWidth: 90,
    workspaceUri: '/tmp/workspace',
  })
  mockLoadContent2.mockResolvedValueOnce(loadedState)
  TitleBarMenuBarStates.set(uid, oldState, oldState)

  await loadContent2Command(uid)

  const { newState } = TitleBarMenuBarStates.get(uid)
  expect(newState.title).toBe('workspace')
  expect(newState.workspaceUri).toBe('/tmp/workspace')
  expect(newState.titleWidth).toBe(90)
})
