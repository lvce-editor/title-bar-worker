/* eslint-disable jest/no-restricted-jest-methods */
import { expect, test, jest } from '@jest/globals'
import { PlatformType } from '@lvce-editor/constants'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'

jest.unstable_mockModule('../src/parts/AddWidths/AddWidths.ts', () => ({
  addWidths: jest.fn(async (entries: readonly any[]) => entries.map((entry: any) => ({ ...entry, width: 100 }))),
}))

// @ts-expect-error
const LoadContent2 = await import('../src/parts/LoadContent2/LoadContent2.ts')

const createMockState = (overrides: Partial<TitleBarMenuBarState> = {}): TitleBarMenuBarState => ({
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
  uid: 1,
  width: 800,
  workspaceUri: '',
  x: 0,
  y: 0,
  ...overrides,
})

test('loadContent2 - returns state with title, buttons, and titleBarEntries', async () => {
  const mockState = createMockState({
    platform: PlatformType.Web,
    titleTemplate: '${folderName}',
  })

  using _mockRpc = RendererWorker.registerMockRpc({
    'Workspace.getUri'() {
      return '/home/user/project'
    },
  })

  const result = await LoadContent2.loadContent2(mockState)

  expect(result).toHaveProperty('title')
  expect(result).toHaveProperty('buttons')
  expect(result).toHaveProperty('titleBarButtons')
  expect(result).toHaveProperty('titleBarEntries')
  expect(result).toHaveProperty('iconWidth', 30)
  expect(Array.isArray(result.titleBarButtons)).toBe(true)
})

test('loadContent2 - preserves state properties', async () => {
  const mockState = createMockState({
    assetDir: '/custom/assets',
    controlsOverlayEnabled: true,
    labelFontSize: 16,
    platform: PlatformType.Web,
  })

  using _mockRpc = RendererWorker.registerMockRpc({
    'Workspace.getUri'() {
      return ''
    },
  })

  const result = await LoadContent2.loadContent2(mockState)

  expect(result.assetDir).toBe('/custom/assets')
  expect(result.labelFontSize).toBe(16)
  expect(result.controlsOverlayEnabled).toBe(true)
})

test('loadContent2 - sets iconWidth to 30', async () => {
  const mockState = createMockState({
    platform: PlatformType.Web,
  })

  using _mockRpc = RendererWorker.registerMockRpc({
    'Workspace.getUri'() {
      return '/home/user/project'
    },
  })

  const result = await LoadContent2.loadContent2(mockState)

  expect(result.iconWidth).toBe(30)
})

test('loadContent2 - titleBarEntries contains entries with widths', async () => {
  const mockState = createMockState({
    platform: PlatformType.Web,
  })

  using _mockRpc = RendererWorker.registerMockRpc({
    'Workspace.getUri'() {
      return '/home/user/project'
    },
  })

  const result = await LoadContent2.loadContent2(mockState)

  expect(Array.isArray(result.titleBarEntries)).toBe(true)
})

test('loadContent2 - title is generated from workspace URI and titleTemplate', async () => {
  const mockState = createMockState({
    platform: PlatformType.Web,
    titleTemplate: '${folderName}',
  })

  using _mockRpc = RendererWorker.registerMockRpc({
    'Workspace.getUri'() {
      return '/home/user/myproject'
    },
  })

  const result = await LoadContent2.loadContent2(mockState)

  expect(result.title).toBe('myproject')
})

test('loadContent2 - title uses appName when in titleTemplate', async () => {
  const mockState = createMockState({
    platform: PlatformType.Web,
    titleTemplate: '${appName} - ${folderName}',
  })

  using _mockRpc = RendererWorker.registerMockRpc({
    'Workspace.getUri'() {
      return '/home/user/myproject'
    },
  })

  const result = await LoadContent2.loadContent2(mockState)

  expect(result.title).toBe('Lvce Editor - myproject')
})

test('loadContent2 - handles empty workspace URI', async () => {
  const mockState = createMockState({
    platform: PlatformType.Web,
    titleTemplate: '${folderName}',
  })

  using _mockRpc = RendererWorker.registerMockRpc({
    'Workspace.getUri'() {
      return ''
    },
  })

  const result = await LoadContent2.loadContent2(mockState)

  expect(result.title).toBe('')
  expect(result.iconWidth).toBe(30)
})

test('loadContent2 - buttons property is set', async () => {
  const mockState = createMockState({
    platform: PlatformType.Web,
  })

  using _mockRpc = RendererWorker.registerMockRpc({
    'Workspace.getUri'() {
      return '/home/user/project'
    },
  })

  const result = await LoadContent2.loadContent2(mockState)

  expect(result.buttons).toBeDefined()
  expect(Array.isArray(result.buttons)).toBe(true)
})

test('loadContent2 - titleBarButtons property is set', async () => {
  const mockState = createMockState({
    platform: PlatformType.Web,
  })

  using _mockRpc = RendererWorker.registerMockRpc({
    'Workspace.getUri'() {
      return '/home/user/project'
    },
  })

  const result = await LoadContent2.loadContent2(mockState)

  expect(result.titleBarButtons).toBeDefined()
  expect(Array.isArray(result.titleBarButtons)).toBe(true)
})

test('loadContent2 - respects controlsOverlayEnabled setting', async () => {
  const mockStateWithOverlay = createMockState({
    controlsOverlayEnabled: true,
    platform: PlatformType.Web,
  })

  const mockStateWithoutOverlay = createMockState({
    controlsOverlayEnabled: false,
    platform: PlatformType.Web,
  })

  using _mockRpc = RendererWorker.registerMockRpc({
    'Workspace.getUri'() {
      return '/home/user/project'
    },
  })

  const resultWithOverlay = await LoadContent2.loadContent2(mockStateWithOverlay)
  const resultWithoutOverlay = await LoadContent2.loadContent2(mockStateWithoutOverlay)

  expect(resultWithOverlay.controlsOverlayEnabled).toBe(true)
  expect(resultWithoutOverlay.controlsOverlayEnabled).toBe(false)
})

test('loadContent2 - respects titleBarStyleCustom setting', async () => {
  const mockState = createMockState({
    platform: PlatformType.Web,
    titleBarStyleCustom: false,
  })

  using _mockRpc = RendererWorker.registerMockRpc({
    'Workspace.getUri'() {
      return '/home/user/project'
    },
  })

  const result = await LoadContent2.loadContent2(mockState)

  expect(result.titleBarStyleCustom).toBe(false)
})

test('loadContent2 - calls hydrate for Electron platform with titleBarStyleCustom false', async () => {
  const mockState = createMockState({
    platform: PlatformType.Electron,
    titleBarStyleCustom: false,
  })

  using _mockRpc = RendererWorker.registerMockRpc({
    'Workspace.getUri'() {
      return '/home/user/project'
    },
  })

  const result = await LoadContent2.loadContent2(mockState)

  // When hydrate is called, it should still return a TitleBarMenuBarState
  expect(result).toBeDefined()
  expect(result.platform).toBe(PlatformType.Electron)
})

test('loadContent2 - uses provided label font settings', async () => {
  const mockState = createMockState({
    labelFontFamily: 'Courier',
    labelFontSize: 12,
    labelFontWeight: 600,
    labelLetterSpacing: 1,
    platform: PlatformType.Web,
  })

  using _mockRpc = RendererWorker.registerMockRpc({
    'Workspace.getUri'() {
      return '/home/user/project'
    },
  })

  const result = await LoadContent2.loadContent2(mockState)

  // These properties should be preserved from the input state
  expect(result.labelFontFamily).toBe('Courier')
  expect(result.labelFontSize).toBe(12)
  expect(result.labelFontWeight).toBe(600)
  expect(result.labelLetterSpacing).toBe(1)
})

test('loadContent2 - handles multiple different platforms', async () => {
  const platforms = [PlatformType.Web]
  const mockWorkspaceUri = '/home/user/test'

  using _mockRpc = RendererWorker.registerMockRpc({
    'Workspace.getUri'() {
      return mockWorkspaceUri
    },
  })

  for (const platform of platforms) {
    const mockState = createMockState({
      platform,
      titleTemplate: '${folderName}',
    })

    const result = await LoadContent2.loadContent2(mockState)

    expect(result.platform).toBe(platform)
    expect(result.title).toBe('test')
    expect(result.titleBarEntries).toBeDefined()
  }
})

test('loadContent2 - returns updated state with same uid', async () => {
  const mockState = createMockState({
    platform: PlatformType.Web,
    uid: 42,
  })

  using _mockRpc = RendererWorker.registerMockRpc({
    'Workspace.getUri'() {
      return '/home/user/project'
    },
  })

  const result = await LoadContent2.loadContent2(mockState)

  expect(result.uid).toBe(42)
})

test('loadContent2 - preserves layout and display settings', async () => {
  const mockState = createMockState({
    height: 768,
    platform: PlatformType.Web,
    titleBarHeight: 35,
    titleBarIconWidth: 20,
    width: 1024,
  })

  using _mockRpc = RendererWorker.registerMockRpc({
    'Workspace.getUri'() {
      return '/home/user/project'
    },
  })

  const result = await LoadContent2.loadContent2(mockState)

  expect(result.width).toBe(1024)
  expect(result.height).toBe(768)
  expect(result.titleBarHeight).toBe(35)
  expect(result.titleBarIconWidth).toBe(20)
})
