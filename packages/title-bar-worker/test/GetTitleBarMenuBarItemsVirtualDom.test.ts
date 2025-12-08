import { expect, test } from '@jest/globals'
import { AriaRoles, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VisibleMenuItem } from '../src/parts/VisibleMenuItem/VisibleMenuItem.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetTitleBarMenuBarItemsVirtualDom from '../src/parts/GetTitleBarMenuBarItemsVirtualDom/GetTitleBarMenuBarItemsVirtualDom.ts'

const createMenuItem = (
  overrides: Readonly<Partial<VisibleMenuItem & { isOpen?: boolean; keyboardShortCut?: string; icon?: string }>> = {},
): VisibleMenuItem & { isOpen?: boolean; keyboardShortCut?: string; icon?: string } => ({
  flags: 0,
  icon: undefined,
  isExpanded: false,
  isFocused: false,
  isOpen: false,
  key: 0,
  keyboardShortCut: undefined,
  label: 'File',
  level: 0,
  ...overrides,
})

test('getTitleBarMenuBarItemsVirtualDom - empty array', () => {
  const result = GetTitleBarMenuBarItemsVirtualDom.getTitleBarMenuBarItemsVirtualDom([])
  expect(result).toEqual([])
})

test('getTitleBarMenuBarItemsVirtualDom - single item without focus or open', () => {
  const item = createMenuItem()
  const result = GetTitleBarMenuBarItemsVirtualDom.getTitleBarMenuBarItemsVirtualDom([item])

  expect(result).toEqual([
    {
      ariaExpanded: false,
      ariaHasPopup: true,
      ariaKeyShortcuts: undefined,
      ariaOwns: undefined,
      childCount: 1,
      className: ClassNames.TitleBarTopLevelEntry,
      id: undefined,
      name: 'File',
      role: AriaRoles.MenuItem,
      type: VirtualDomElements.Button,
    },
    {
      childCount: 0,
      text: 'File',
      type: VirtualDomElements.Text,
    },
  ])
})

test('getTitleBarMenuBarItemsVirtualDom - single item with isFocused', () => {
  const item = createMenuItem({ isFocused: true })
  const result = GetTitleBarMenuBarItemsVirtualDom.getTitleBarMenuBarItemsVirtualDom([item])

  expect(result).toEqual([
    {
      ariaExpanded: false,
      ariaHasPopup: true,
      ariaKeyShortcuts: undefined,
      ariaOwns: undefined,
      childCount: 1,
      className: `${ClassNames.TitleBarTopLevelEntry} ${ClassNames.TitleBarEntryActive}`,
      id: 'TitleBarEntryActive',
      name: 'File',
      role: AriaRoles.MenuItem,
      type: VirtualDomElements.Button,
    },
    {
      childCount: 1,
      className: ClassNames.TitleBarTopLevelEntryLabel,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: 'File',
      type: VirtualDomElements.Text,
    },
  ])
})

test('getTitleBarMenuBarItemsVirtualDom - single item with isOpen', () => {
  const item = createMenuItem({ isOpen: true })
  const result = GetTitleBarMenuBarItemsVirtualDom.getTitleBarMenuBarItemsVirtualDom([item])

  expect(result).toEqual([
    {
      ariaExpanded: true,
      ariaHasPopup: true,
      ariaKeyShortcuts: undefined,
      ariaOwns: 'Menu-0',
      childCount: 1,
      className: ClassNames.TitleBarTopLevelEntry,
      id: undefined,
      name: 'File',
      role: AriaRoles.MenuItem,
      type: VirtualDomElements.Button,
    },
    {
      childCount: 0,
      text: 'File',
      type: VirtualDomElements.Text,
    },
  ])
})

test('getTitleBarMenuBarItemsVirtualDom - single item with isFocused and isOpen', () => {
  const item = createMenuItem({ isFocused: true, isOpen: true })
  const result = GetTitleBarMenuBarItemsVirtualDom.getTitleBarMenuBarItemsVirtualDom([item])

  expect(result).toEqual([
    {
      ariaExpanded: true,
      ariaHasPopup: true,
      ariaKeyShortcuts: undefined,
      ariaOwns: 'Menu-0',
      childCount: 1,
      className: `${ClassNames.TitleBarTopLevelEntry} ${ClassNames.TitleBarEntryActive}`,
      id: 'TitleBarEntryActive',
      name: 'File',
      role: AriaRoles.MenuItem,
      type: VirtualDomElements.Button,
    },
    {
      childCount: 1,
      className: ClassNames.TitleBarTopLevelEntryLabel,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: 'File',
      type: VirtualDomElements.Text,
    },
  ])
})

test('getTitleBarMenuBarItemsVirtualDom - single item with keyboardShortCut', () => {
  const item = createMenuItem({ keyboardShortCut: 'Alt+F' })
  const result = GetTitleBarMenuBarItemsVirtualDom.getTitleBarMenuBarItemsVirtualDom([item])

  expect(result).toEqual([
    {
      ariaExpanded: false,
      ariaHasPopup: true,
      ariaKeyShortcuts: 'Alt+F',
      ariaOwns: undefined,
      childCount: 1,
      className: ClassNames.TitleBarTopLevelEntry,
      id: undefined,
      name: 'File',
      role: AriaRoles.MenuItem,
      type: VirtualDomElements.Button,
    },
    {
      childCount: 0,
      text: 'File',
      type: VirtualDomElements.Text,
    },
  ])
})

test('getTitleBarMenuBarItemsVirtualDom - multiple items', () => {
  const items = [
    createMenuItem({ label: 'File' }),
    createMenuItem({ isFocused: true, label: 'Edit' }),
    createMenuItem({ isOpen: true, label: 'View' }),
  ]
  const result = GetTitleBarMenuBarItemsVirtualDom.getTitleBarMenuBarItemsVirtualDom(items)

  expect(result).toEqual([
    {
      ariaExpanded: false,
      ariaHasPopup: true,
      ariaKeyShortcuts: undefined,
      ariaOwns: undefined,
      childCount: 1,
      className: ClassNames.TitleBarTopLevelEntry,
      id: undefined,
      name: 'File',
      role: AriaRoles.MenuItem,
      type: VirtualDomElements.Button,
    },
    {
      childCount: 0,
      text: 'File',
      type: VirtualDomElements.Text,
    },
    {
      ariaExpanded: false,
      ariaHasPopup: true,
      ariaKeyShortcuts: undefined,
      ariaOwns: undefined,
      childCount: 1,
      className: `${ClassNames.TitleBarTopLevelEntry} ${ClassNames.TitleBarEntryActive}`,
      id: 'TitleBarEntryActive',
      name: 'Edit',
      role: AriaRoles.MenuItem,
      type: VirtualDomElements.Button,
    },
    {
      childCount: 1,
      className: ClassNames.TitleBarTopLevelEntryLabel,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: 'Edit',
      type: VirtualDomElements.Text,
    },
    {
      ariaExpanded: true,
      ariaHasPopup: true,
      ariaKeyShortcuts: undefined,
      ariaOwns: 'Menu-0',
      childCount: 1,
      className: ClassNames.TitleBarTopLevelEntry,
      id: undefined,
      name: 'View',
      role: AriaRoles.MenuItem,
      type: VirtualDomElements.Button,
    },
    {
      childCount: 0,
      text: 'View',
      type: VirtualDomElements.Text,
    },
  ])
})

test('getTitleBarMenuBarItemsVirtualDom - item with all properties', () => {
  const item = createMenuItem({
    icon: 'help-icon.png',
    isFocused: true,
    isOpen: true,
    keyboardShortCut: 'Alt+H',
    label: 'Help',
  })
  const result = GetTitleBarMenuBarItemsVirtualDom.getTitleBarMenuBarItemsVirtualDom([item])

  expect(result).toEqual([
    {
      ariaExpanded: true,
      ariaHasPopup: true,
      ariaKeyShortcuts: 'Alt+H',
      ariaOwns: 'Menu-0',
      childCount: 1,
      className: `${ClassNames.TitleBarTopLevelEntry} ${ClassNames.TitleBarEntryActive}`,
      id: 'TitleBarEntryActive',
      name: 'Help',
      role: AriaRoles.MenuItem,
      type: VirtualDomElements.Button,
    },
    {
      childCount: 1,
      className: ClassNames.TitleBarTopLevelEntryLabel,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: 'Help',
      type: VirtualDomElements.Text,
    },
  ])
})
