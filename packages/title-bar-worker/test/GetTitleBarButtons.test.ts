import { expect, test } from '@jest/globals'
import * as GetTitleBarButtons from '../src/parts/GetTitleBarButtons/GetTitleBarButtons.ts'
import * as PlatformType from '../src/parts/PlatformType/PlatformType.ts'

test('getTitleBarButtons - Electron platform', () => {
  const result = GetTitleBarButtons.getTitleBarButtons(PlatformType.Electron, false, true)
  expect(Array.isArray(result)).toBe(true)
})

test('getTitleBarButtons - Web platform', () => {
  const result = GetTitleBarButtons.getTitleBarButtons(PlatformType.Web, false, false)
  expect(Array.isArray(result)).toBe(true)
})

test('getTitleBarButtons - Remote platform', () => {
  const result = GetTitleBarButtons.getTitleBarButtons(PlatformType.Remote, false, false)
  expect(Array.isArray(result)).toBe(true)
})

test('getTitleBarButtons - Unknown platform', () => {
  const result = GetTitleBarButtons.getTitleBarButtons(999, false, false)
  expect(result).toEqual([])
})
