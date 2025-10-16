import { expect, test } from '@jest/globals'
import * as IsAutoUpdateSupported from '../src/parts/IsAutoUpdateSupported/IsAutoUpdateSupported.ts'
import * as PlatformType from '../src/parts/PlatformType/PlatformType.ts'

test('isAutoUpdateSupported - should return false for non-Electron platforms', () => {
  const result = IsAutoUpdateSupported.isAutoUpdateSupported(PlatformType.Web)
  expect(result).toBe(false)
})

test('isAutoUpdateSupported - should return false for Electron platform', () => {
  const result = IsAutoUpdateSupported.isAutoUpdateSupported(PlatformType.Electron)
  expect(result).toBe(false)
})

test('isAutoUpdateSupported - should return false for Remote platform', () => {
  const result = IsAutoUpdateSupported.isAutoUpdateSupported(PlatformType.Remote)
  expect(result).toBe(false)
})
