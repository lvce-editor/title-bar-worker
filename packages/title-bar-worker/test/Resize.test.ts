import { expect, test } from '@jest/globals'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as Resize from '../src/parts/Resize/Resize.ts'

test('resize - basic resize with default state', async () => {
  const state: TitleBarMenuBarState = createDefaultState()
  const dimensions = {
    height: 40,
    width: 1000,
    x: 50,
    y: 10,
  }

  const result = await Resize.resize(state, dimensions)

  expect(result.height).toBe(40)
  expect(result.width).toBe(860) // 1000 - 50 - 90
  expect(result.x).toBe(50)
  expect(result.y).toBe(10)
  expect(result.titleBarButtonsWidth).toBe(state.titleBarButtonsWidth)
})

test('resize - preserves other state properties', async () => {
  const state: TitleBarMenuBarState = createDefaultState()
  const dimensions = {
    height: 50,
    width: 1200,
    x: 100,
    y: 20,
  }

  const result = await Resize.resize(state, dimensions)

  expect(result.uid).toBe(state.uid)
  expect(result.menus).toBe(state.menus)
  expect(result.titleBarButtonsWidth).toBe(state.titleBarButtonsWidth)
  expect(result.focusedIndex).toBe(state.focusedIndex)
  expect(result.isMenuOpen).toBe(state.isMenuOpen)
})

test('resize - with different titleBarButtonsWidth', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    titleBarButtonsWidth: 120,
  }
  const dimensions = {
    height: 30,
    width: 800,
    x: 0,
    y: 0,
  }

  const result = await Resize.resize(state, dimensions)

  expect(result.width).toBe(680) // 800 - 0 - 120
  expect(result.titleBarButtonsWidth).toBe(120)
})

test('resize - with zero x position', async () => {
  const state: TitleBarMenuBarState = createDefaultState()
  const dimensions = {
    height: 30,
    width: 500,
    x: 0,
    y: 0,
  }

  const result = await Resize.resize(state, dimensions)

  expect(result.width).toBe(410) // 500 - 0 - 90
  expect(result.x).toBe(0)
})

test('resize - with large x position', async () => {
  const state: TitleBarMenuBarState = createDefaultState()
  const dimensions = {
    height: 30,
    width: 2000,
    x: 500,
    y: 0,
  }

  const result = await Resize.resize(state, dimensions)

  expect(result.width).toBe(1410) // 2000 - 500 - 90
  expect(result.x).toBe(500)
})

test('resize - with different height', async () => {
  const state: TitleBarMenuBarState = createDefaultState()
  const dimensions = {
    height: 60,
    width: 800,
    x: 0,
    y: 0,
  }

  const result = await Resize.resize(state, dimensions)

  expect(result.height).toBe(60)
})

test('resize - with different y position', async () => {
  const state: TitleBarMenuBarState = createDefaultState()
  const dimensions = {
    height: 30,
    width: 800,
    x: 0,
    y: 25,
  }

  const result = await Resize.resize(state, dimensions)

  expect(result.y).toBe(25)
})

test('resize - with all dimensions changed', async () => {
  const state: TitleBarMenuBarState = createDefaultState()
  const dimensions = {
    height: 45,
    width: 1500,
    x: 200,
    y: 15,
  }

  const result = await Resize.resize(state, dimensions)

  expect(result.height).toBe(45)
  expect(result.width).toBe(1210) // 1500 - 200 - 90
  expect(result.x).toBe(200)
  expect(result.y).toBe(15)
})

test('resize - with zero width', async () => {
  const state: TitleBarMenuBarState = createDefaultState()
  const dimensions = {
    height: 30,
    width: 0,
    x: 0,
    y: 0,
  }

  const result = await Resize.resize(state, dimensions)

  expect(result.width).toBe(-90) // 0 - 0 - 90
})

test('resize - with width smaller than x and titleBarButtonsWidth', async () => {
  const state: TitleBarMenuBarState = createDefaultState()
  const dimensions = {
    height: 30,
    width: 100,
    x: 50,
    y: 0,
  }

  const result = await Resize.resize(state, dimensions)

  expect(result.width).toBe(-40) // 100 - 50 - 90
})
