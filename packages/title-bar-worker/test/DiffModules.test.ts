import { expect, test } from '@jest/globals'
import * as DiffModules from '../src/parts/DiffModules/DiffModules.ts'

test('modules - should export array with correct modules', () => {
  expect(DiffModules.modules).toBeDefined()
})

test('modules - each module should have isEqual', () => {
  for (const module of DiffModules.modules) {
    expect(typeof module).toBe('function')
  }
})
