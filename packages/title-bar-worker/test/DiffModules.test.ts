import { expect, test } from '@jest/globals'
import * as DiffModules from '../src/parts/DiffModules/DiffModules.ts'
import * as DiffEntries from '../src/parts/DiffEntries/DiffEntries.ts'
import * as DiffFocusedIndex from '../src/parts/DiffFocusedIndex/DiffFocusedIndex.ts'
import * as DiffMenus from '../src/parts/DiffMenus/DiffMenus.ts'

test('modules - should export array with correct modules', () => {
  expect(DiffModules.modules).toEqual([DiffEntries, DiffFocusedIndex, DiffMenus])
})

test('modules - each module should have diffType and isEqual', () => {
  for (const module of DiffModules.modules) {
    expect(typeof module.diffType).toBe('number')
    expect(typeof module.isEqual).toBe('function')
  }
})
