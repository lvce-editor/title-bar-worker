import { expect, test } from '@jest/globals'
import * as DiffEntries from '../src/parts/DiffEntries/DiffEntries.ts'
import * as DiffFocusedIndex from '../src/parts/DiffFocusedIndex/DiffFocusedIndex.ts'
import * as DiffMenus from '../src/parts/DiffMenus/DiffMenus.ts'
import * as DiffModules from '../src/parts/DiffModules/DiffModules.ts'

test('modules - should export array with correct modules', () => {
  expect(DiffModules.modules).toEqual([DiffEntries.isEqual, DiffFocusedIndex.isEqual, DiffMenus.isEqual])
})

test('modules - each module should have isEqual', () => {
  for (const module of DiffModules.modules) {
    expect(typeof module).toBe('function')
  }
})
