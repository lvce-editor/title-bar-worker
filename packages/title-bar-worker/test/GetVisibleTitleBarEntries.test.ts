import { expect, test } from '@jest/globals'
import * as GetVisibleTitleBarEntries from '../src/parts/GetVisibleTitleBarEntries/GetVisibleTitleBarEntries.ts'
import * as Icon from '../src/parts/Icon/Icon.ts'
import * as TitleBarMenuBarStrings from '../src/parts/TitleBarMenuBarStrings/TitleBarMenuBarStrings.ts'

const createEntry = (label: string, width: number): any => ({
  label,
  width,
})

test('getVisibleTitleBarEntries - should return empty array for empty entries', () => {
  const entries: any[] = []
  const result = GetVisibleTitleBarEntries.getVisibleTitleBarEntries(entries, 100, 0, false)
  expect(result).toEqual([])
})

test('getVisibleTitleBarEntries - should return all entries when they fit within width', () => {
  const entries = [createEntry('File', 30), createEntry('Edit', 30), createEntry('View', 30)]
  const result = GetVisibleTitleBarEntries.getVisibleTitleBarEntries(entries, 100, 0, false)

  expect(result).toHaveLength(3)
  expect(result[0]).toEqual({ isFocused: true, isOpen: false, label: 'File', width: 30 })
  expect(result[1]).toEqual({ isFocused: false, isOpen: false, label: 'Edit', width: 30 })
  expect(result[2]).toEqual({ isFocused: false, isOpen: false, label: 'View', width: 30 })
})

test('getVisibleTitleBarEntries - should stop when total width exceeds available width', () => {
  const entries = [createEntry('File', 30), createEntry('Edit', 30), createEntry('View', 50)]
  const result = GetVisibleTitleBarEntries.getVisibleTitleBarEntries(entries, 60, 0, false)

  expect(result).toHaveLength(1)
  expect(result[0]).toEqual({
    ariaLabel: TitleBarMenuBarStrings.moreDot(),
    icon: Icon.Ellipsis,
    label: '',
    width: 38,
  })
})

test('getVisibleTitleBarEntries - should add isFocused property correctly', () => {
  const entries = [createEntry('File', 30), createEntry('Edit', 30), createEntry('View', 30)]
  const result = GetVisibleTitleBarEntries.getVisibleTitleBarEntries(entries, 100, 1, false)

  expect(result[0].isFocused).toBe(false)
  expect(result[1].isFocused).toBe(true)
  expect(result[2].isFocused).toBe(false)
})

test('getVisibleTitleBarEntries - should add isOpen property when menu is open and index matches', () => {
  const entries = [createEntry('File', 30), createEntry('Edit', 30), createEntry('View', 30)]
  const result = GetVisibleTitleBarEntries.getVisibleTitleBarEntries(entries, 100, 1, true)

  expect(result[0].isOpen).toBe(false)
  expect(result[1].isOpen).toBe(true)
  expect(result[2].isOpen).toBe(false)
})

test('getVisibleTitleBarEntries - should not set isOpen when menu is closed', () => {
  const entries = [createEntry('File', 30), createEntry('Edit', 30), createEntry('View', 30)]
  const result = GetVisibleTitleBarEntries.getVisibleTitleBarEntries(entries, 100, 1, false)

  expect(result[0].isOpen).toBe(false)
  expect(result[1].isOpen).toBe(false)
  expect(result[2].isOpen).toBe(false)
})

test('getVisibleTitleBarEntries - should add more icon when entries overflow', () => {
  const entries = [createEntry('File', 30), createEntry('Edit', 30), createEntry('View', 30), createEntry('Help', 30)]
  const result = GetVisibleTitleBarEntries.getVisibleTitleBarEntries(entries, 100, 0, false)

  expect(result).toHaveLength(3)
  expect(result[0]).toEqual({ isFocused: true, isOpen: false, label: 'File', width: 30 })
  expect(result[1]).toEqual({ isFocused: false, isOpen: false, label: 'Edit', width: 30 })
  expect(result[2]).toEqual({
    ariaLabel: TitleBarMenuBarStrings.moreDot(),
    icon: Icon.Ellipsis,
    label: '',
    width: 38,
  })
})

test('getVisibleTitleBarEntries - should remove last entry if more icon still causes overflow', () => {
  const entries = [createEntry('File', 30), createEntry('Edit', 30), createEntry('View', 30), createEntry('Help', 30)]
  const result = GetVisibleTitleBarEntries.getVisibleTitleBarEntries(entries, 65, 0, false)

  expect(result).toHaveLength(2)
  expect(result[0]).toEqual({ isFocused: true, isOpen: false, label: 'File', width: 30 })
  expect(result[1]).toEqual({
    ariaLabel: TitleBarMenuBarStrings.moreDot(),
    icon: Icon.Ellipsis,
    label: '',
    width: 38,
  })
})

test('getVisibleTitleBarEntries - should handle single entry that fits', () => {
  const entries = [createEntry('File', 30)]
  const result = GetVisibleTitleBarEntries.getVisibleTitleBarEntries(entries, 100, 0, false)

  expect(result).toHaveLength(1)
  expect(result[0]).toEqual({ isFocused: true, isOpen: false, label: 'File', width: 30 })
})

test('getVisibleTitleBarEntries - should handle single entry that exceeds width', () => {
  const entries = [createEntry('File', 100)]
  const result = GetVisibleTitleBarEntries.getVisibleTitleBarEntries(entries, 50, 0, false)

  expect(result).toHaveLength(1)
  expect(result[0]).toEqual({
    ariaLabel: TitleBarMenuBarStrings.moreDot(),
    icon: Icon.Ellipsis,
    label: '',
    width: 38,
  })
})

test('getVisibleTitleBarEntries - should handle focusedIndex out of bounds', () => {
  const entries = [createEntry('File', 30), createEntry('Edit', 30)]
  const result = GetVisibleTitleBarEntries.getVisibleTitleBarEntries(entries, 100, 5, false)

  expect(result).toHaveLength(2)
  expect(result[0].isFocused).toBe(false)
  expect(result[1].isFocused).toBe(false)
})

test('getVisibleTitleBarEntries - should handle negative focusedIndex', () => {
  const entries = [createEntry('File', 30), createEntry('Edit', 30)]
  const result = GetVisibleTitleBarEntries.getVisibleTitleBarEntries(entries, 100, -1, false)

  expect(result).toHaveLength(2)
  expect(result[0].isFocused).toBe(false)
  expect(result[1].isFocused).toBe(false)
})

test('getVisibleTitleBarEntries - should preserve all original entry properties', () => {
  const entries = [
    { ariaLabel: 'File menu', icon: 'file-icon', label: 'File', width: 30 },
    { ariaLabel: 'Edit menu', icon: 'edit-icon', label: 'Edit', width: 30 },
  ]
  const result = GetVisibleTitleBarEntries.getVisibleTitleBarEntries(entries, 100, 0, false)

  expect(result[0]).toEqual({
    ariaLabel: 'File menu',
    icon: 'file-icon',
    isFocused: true,
    isOpen: false,
    label: 'File',
    width: 30,
  })
  expect(result[1]).toEqual({
    ariaLabel: 'Edit menu',
    icon: 'edit-icon',
    isFocused: false,
    isOpen: false,
    label: 'Edit',
    width: 30,
  })
})

test('getVisibleTitleBarEntries - should handle exact width match', () => {
  const entries = [createEntry('File', 30), createEntry('Edit', 30)]
  const result = GetVisibleTitleBarEntries.getVisibleTitleBarEntries(entries, 60, 0, false)

  expect(result).toHaveLength(1)
  expect(result[0]).toEqual({
    ariaLabel: TitleBarMenuBarStrings.moreDot(),
    icon: Icon.Ellipsis,
    label: '',
    width: 38,
  })
})

test('getVisibleTitleBarEntries - should handle width just below threshold for more icon', () => {
  const entries = [createEntry('File', 30), createEntry('Edit', 30), createEntry('View', 30)]
  const result = GetVisibleTitleBarEntries.getVisibleTitleBarEntries(entries, 60, 0, false)

  expect(result).toHaveLength(1)
  expect(result[0]).toEqual({
    ariaLabel: TitleBarMenuBarStrings.moreDot(),
    icon: Icon.Ellipsis,
    label: '',
    width: 38,
  })
})

test('getVisibleTitleBarEntries - should show entry with more icon when there is space', () => {
  const entries = [createEntry('File', 30), createEntry('Edit', 30), createEntry('View', 30)]
  const result = GetVisibleTitleBarEntries.getVisibleTitleBarEntries(entries, 70, 0, false)

  expect(result).toHaveLength(2)
  expect(result[0]).toEqual({ isFocused: true, isOpen: false, label: 'File', width: 30 })
  expect(result[1]).toEqual({
    ariaLabel: TitleBarMenuBarStrings.moreDot(),
    icon: Icon.Ellipsis,
    label: '',
    width: 38,
  })
})

test('getVisibleTitleBarEntries - should calculate more icon width correctly', () => {
  const entries = [createEntry('File', 30), createEntry('Edit', 30), createEntry('View', 30)]
  const result = GetVisibleTitleBarEntries.getVisibleTitleBarEntries(entries, 60, 0, false)

  const moreIcon = result[result.length - 1]
  expect(moreIcon.icon).toBe(Icon.Ellipsis)
  expect(moreIcon.width).toBe(38)
})

test('getVisibleTitleBarEntries - should handle multiple entries with overflow', () => {
  const entries = [createEntry('File', 30), createEntry('Edit', 30), createEntry('View', 30), createEntry('Help', 30), createEntry('About', 30)]
  const result = GetVisibleTitleBarEntries.getVisibleTitleBarEntries(entries, 60, 0, false)

  expect(result.length).toBeGreaterThan(0)
  const lastEntry = result[result.length - 1]
  expect(lastEntry.icon).toBe(Icon.Ellipsis)
})

test('getVisibleTitleBarEntries - should handle isOpen true with matching focusedIndex', () => {
  const entries = [createEntry('File', 30), createEntry('Edit', 30), createEntry('View', 30)]
  const result = GetVisibleTitleBarEntries.getVisibleTitleBarEntries(entries, 100, 2, true)

  expect(result[0].isOpen).toBe(false)
  expect(result[1].isOpen).toBe(false)
  expect(result[2].isOpen).toBe(true)
  expect(result[2].isFocused).toBe(true)
})
