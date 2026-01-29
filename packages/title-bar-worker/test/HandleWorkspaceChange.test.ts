import { expect, test } from '@jest/globals'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as HandleWorkspaceChange from '../src/parts/HandleWorkspaceChange/HandleWorkspaceChange.ts'

const createMockState = (overrides?: Partial<TitleBarMenuBarState>): TitleBarMenuBarState => {
  const defaults: TitleBarMenuBarState = {
    assetDir: '/assets',
    buttons: [],
    commandCenterEnabled: false,
    commandMap: {},
    controlsOverlayEnabled: false,
    focused: false,
    focusedIndex: 0,
    height: 0,
    iconWidth: 0,
    isMenuOpen: false,
    labelFontFamily: 'Arial',
    labelFontSize: 12,
    labelFontWeight: 400,
    labelLetterSpacing: 0,
    labelPadding: 0,
    layoutControlsEnabled: false,
    menus: [],
    platform: 0,
    title: 'Old Title',
    titleBarButtons: [],
    titleBarButtonsEnabled: false,
    titleBarButtonsWidth: 0,
    titleBarEntries: [],
    titleBarHeight: 30,
    titleBarIconEnabled: false,
    titleBarIconWidth: 0,
    titleBarMenuBarEnabled: false,
    titleBarStyleCustom: false,
    titleBarTitleEnabled: false,
    titleTemplate: '${folderName}',
    uid: 0,
    width: 0,
    workspaceUri: '/old/workspace',
    x: 0,
    y: 0,
  }
  return { ...defaults, ...overrides }
}

test('handleWorkspaceChange - should update workspaceUri and title with folder name template', async () => {
  const initialState = createMockState({
    titleTemplate: '${folderName}',
  })

  const result = await HandleWorkspaceChange.handleWorkspaceChange(initialState, '/home/user/my-project')

  expect(result.workspaceUri).toBe('/home/user/my-project')
  expect(result.title).toBe('my-project')
})

test('handleWorkspaceChange - should preserve other state properties', async () => {
  const initialState = createMockState({
    commandMap: { 'some-command': 'value' },
    focused: true,
    height: 1080,
    isMenuOpen: true,
    titleTemplate: '${folderName}',
  })

  const result = await HandleWorkspaceChange.handleWorkspaceChange(initialState, '/home/user/project')

  expect(result.focused).toBe(true)
  expect(result.isMenuOpen).toBe(true)
  expect(result.height).toBe(1080)
  expect(result.commandMap).toEqual({ 'some-command': 'value' })
})

test('handleWorkspaceChange - should handle file protocol URIs', async () => {
  const initialState = createMockState({
    titleTemplate: '${folderName}',
  })

  const result = await HandleWorkspaceChange.handleWorkspaceChange(initialState, 'file:///path/to/workspace')

  expect(result.workspaceUri).toBe('file:///path/to/workspace')
  expect(result.title).toBe('workspace')
})

test('handleWorkspaceChange - should handle titleTemplate with appName', async () => {
  const initialState = createMockState({
    titleTemplate: '${appName} - ${folderName}',
  })

  const result = await HandleWorkspaceChange.handleWorkspaceChange(initialState, '/home/user/my-app')

  expect(result.workspaceUri).toBe('/home/user/my-app')
  expect(result.title).toBe('Lvce Editor - my-app')
})

test('handleWorkspaceChange - should handle empty titleTemplate', async () => {
  const initialState = createMockState({
    titleTemplate: '',
  })

  const result = await HandleWorkspaceChange.handleWorkspaceChange(initialState, '/home/user/project')

  expect(result.workspaceUri).toBe('/home/user/project')
  expect(result.title).toBe('project')
})

test('handleWorkspaceChange - should handle custom titleTemplate without variables', async () => {
  const initialState = createMockState({
    titleTemplate: 'My Custom Title',
  })

  const result = await HandleWorkspaceChange.handleWorkspaceChange(initialState, '/home/user/project')

  expect(result.workspaceUri).toBe('/home/user/project')
  expect(result.title).toBe('My Custom Title')
})

test('handleWorkspaceChange - should handle empty workspace URI', async () => {
  const initialState = createMockState({
    titleTemplate: '${folderName}',
  })

  const result = await HandleWorkspaceChange.handleWorkspaceChange(initialState, '')

  expect(result.workspaceUri).toBe('')
  expect(result.title).toBe('')
})

test('handleWorkspaceChange - should handle workspace URI with trailing slash', async () => {
  const initialState = createMockState({
    titleTemplate: '${folderName}',
  })

  const result = await HandleWorkspaceChange.handleWorkspaceChange(initialState, '/home/user/project/')

  expect(result.workspaceUri).toBe('/home/user/project/')
  expect(result.title).toBe('')
})

test('handleWorkspaceChange - should handle root path', async () => {
  const initialState = createMockState({
    titleTemplate: '${folderName}',
  })

  const result = await HandleWorkspaceChange.handleWorkspaceChange(initialState, '/')

  expect(result.workspaceUri).toBe('/')
  expect(result.title).toBe('')
})

test('handleWorkspaceChange - should not mutate original state', async () => {
  const initialState = createMockState({
    title: 'Old Title',
    titleTemplate: '${folderName}',
    workspaceUri: '/old/path',
  })

  const originalTitle = initialState.title
  const originalUri = initialState.workspaceUri

  await HandleWorkspaceChange.handleWorkspaceChange(initialState, '/new/workspace')

  expect(initialState.title).toBe(originalTitle)
  expect(initialState.workspaceUri).toBe(originalUri)
})

test('handleWorkspaceChange - should handle nested directory paths', async () => {
  const initialState = createMockState({
    titleTemplate: '${folderName}',
  })

  const result = await HandleWorkspaceChange.handleWorkspaceChange(initialState, '/home/user/workspace/sub/project')

  expect(result.workspaceUri).toBe('/home/user/workspace/sub/project')
  expect(result.title).toBe('project')
})

test('handleWorkspaceChange - should handle titleTemplate with multiple variables', async () => {
  const initialState = createMockState({
    titleTemplate: '${appName} - ${folderName} - Project',
  })

  const result = await HandleWorkspaceChange.handleWorkspaceChange(initialState, '/home/user/my-workspace')

  expect(result.workspaceUri).toBe('/home/user/my-workspace')
  expect(result.title).toBe('Lvce Editor - my-workspace - Project')
})

test('handleWorkspaceChange - should handle single segment path', async () => {
  const initialState = createMockState({
    titleTemplate: '${folderName}',
  })

  const result = await HandleWorkspaceChange.handleWorkspaceChange(initialState, 'workspace')

  expect(result.workspaceUri).toBe('workspace')
  expect(result.title).toBe('')
})
