import { expect, test } from '@jest/globals'
import * as GetMenuEntryMap from '../src/parts/GetMenuEntryMap/GetMenuEntryMap.ts'

test('getEntryMap - should return empty map for empty modules array', async () => {
  const modules: any[] = []
  const result = await GetMenuEntryMap.getEntryMap(modules)
  expect(result).toEqual({})
})

test('getEntryMap - should return map with single module entry', async () => {
  const entries = [{ label: 'File' }, { label: 'Edit' }]
  const module = {
    id: 'module1',
    getMenuEntries: async () => entries,
  }
  const modules = [module]
  const result = await GetMenuEntryMap.getEntryMap(modules)
  expect(result).toEqual({
    module1: entries,
  })
})

test('getEntryMap - should return map with multiple module entries', async () => {
  const entries1 = [{ label: 'File' }]
  const entries2 = [{ label: 'Edit' }, { label: 'View' }]
  const module1 = {
    id: 'module1',
    getMenuEntries: async () => entries1,
  }
  const module2 = {
    id: 'module2',
    getMenuEntries: async () => entries2,
  }
  const modules = [module1, module2]
  const result = await GetMenuEntryMap.getEntryMap(modules)
  expect(result).toEqual({
    module1: entries1,
    module2: entries2,
  })
})

test('getEntryMap - should handle modules with different IDs', async () => {
  const entries1 = [{ label: 'File' }]
  const entries2 = [{ label: 'Edit' }]
  const entries3 = [{ label: 'View' }]
  const module1 = {
    id: 'fileModule',
    getMenuEntries: async () => entries1,
  }
  const module2 = {
    id: 'editModule',
    getMenuEntries: async () => entries2,
  }
  const module3 = {
    id: 'viewModule',
    getMenuEntries: async () => entries3,
  }
  const modules = [module1, module2, module3]
  const result = await GetMenuEntryMap.getEntryMap(modules)
  expect(result).toEqual({
    fileModule: entries1,
    editModule: entries2,
    viewModule: entries3,
  })
})

test('getEntryMap - should handle empty entries arrays', async () => {
  const module1 = {
    id: 'module1',
    getMenuEntries: async () => [],
  }
  const module2 = {
    id: 'module2',
    getMenuEntries: async () => [{ label: 'File' }],
  }
  const modules = [module1, module2]
  const result = await GetMenuEntryMap.getEntryMap(modules)
  expect(result).toEqual({
    module1: [],
    module2: [{ label: 'File' }],
  })
})

test('getEntryMap - should handle modules with complex entries', async () => {
  const entries = [
    { label: 'File', command: 'file.open' },
    { label: 'Edit', command: 'edit.copy', flags: 1 },
    { label: 'View', command: 'view.zoom' },
  ]
  const module = {
    id: 'complexModule',
    getMenuEntries: async () => entries,
  }
  const modules = [module]
  const result = await GetMenuEntryMap.getEntryMap(modules)
  expect(result).toEqual({
    complexModule: entries,
  })
})

test('getEntryMap - should handle async getMenuEntries correctly', async () => {
  const entries = [{ label: 'File' }]
  let callCount = 0
  const module = {
    id: 'module1',
    getMenuEntries: async () => {
      callCount++
      return entries
    },
  }
  const modules = [module]
  const result = await GetMenuEntryMap.getEntryMap(modules)
  expect(callCount).toBe(1)
  expect(result).toEqual({
    module1: entries,
  })
})
