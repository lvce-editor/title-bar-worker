import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

const focusTopLevelMenu = async ({ TitleBarMenuBar }: TestApi, menuOffset: number): Promise<void> => {
  await TitleBarMenuBar.focus()
  for (let i = 0; i < menuOffset; i++) {
    await TitleBarMenuBar.handleKeyArrowRight()
  }
}

const openMenu = async ({ TitleBarMenuBar }: TestApi, menuOffset: number): Promise<void> => {
  await TitleBarMenuBar.focus()
  for (let i = 0; i < menuOffset; i++) {
    await TitleBarMenuBar.handleKeyArrowRight()
  }
  await TitleBarMenuBar.handleKeyArrowDown()
}

const expectMenuItem = async (api: TestApi, menuSelector: string, label: string): Promise<void> => {
  const menu = api.Locator(menuSelector)
  await api.expect(menu).toBeVisible()

  const item = api.Locator(`${menuSelector} .MenuItem`, { hasText: label })
  await api.expect(item).toBeVisible()
  await api.expect(item).toHaveAttribute('role', 'menuitem')
}

const expectIndexedMenuItem = async (api: TestApi, menuSelector: string, itemIndex: number, label: string, role: string): Promise<void> => {
  const menu = api.Locator(menuSelector)
  await api.expect(menu).toBeVisible()

  const item = menu.locator('.MenuItem').nth(itemIndex)
  await api.expect(item).toBeVisible()
  await api.expect(item).toContainText(label)
  await api.expect(item).toHaveAttribute('role', role)
}

export const createMenuItemTest = (menuOffset: number, itemIndex: number, label: string, role = 'menuitem'): Test => {
  return async (api) => {
    await openMenu(api, menuOffset)
    await expectIndexedMenuItem(api, '#Menu-0', itemIndex, label, role)
  }
}

export const createMenuItemLabelTest = (menuOffset: number, label: string): Test => {
  return async (api) => {
    await openMenu(api, menuOffset)
    await expectMenuItem(api, '#Menu-0', label)
  }
}

export const createSubmenuItemTest = (menuOffset: number, submenuIndex: number, itemIndex: number, label: string): Test => {
  return async (api) => {
    await openMenu(api, menuOffset)
    await api.Command.execute('TitleBar.handleMenuClick', 0, submenuIndex)
    await expectIndexedMenuItem(api, '#Menu-1', itemIndex, label, 'menuitem')
  }
}

export const createSubmenuItemLabelTest = (menuOffset: number, submenuIndex: number, label: string): Test => {
  return async (api) => {
    await openMenu(api, menuOffset)
    await api.Command.execute('TitleBar.handleMenuClick', 0, submenuIndex)
    await expectMenuItem(api, '#Menu-1', label)
  }
}

export const createTopLevelMenuItemTest = (menuOffset: number, label: string): Test => {
  return async (api) => {
    await api.TitleBarMenuBar.focus()
    for (let i = 0; i < menuOffset; i++) {
      await api.TitleBarMenuBar.handleKeyArrowRight()
    }

    const item = api.Locator('.TitleBarTopLevelEntry', { hasText: label })
    await api.expect(item).toHaveAttribute('id', 'TitleBarEntryActive')
    await api.expect(item).toHaveAttribute('role', 'menuitem')
    await api.expect(item).toHaveAttribute('aria-haspopup', 'true')
    await api.expect(item).toHaveAttribute('aria-expanded', 'false')
  }
}

const expectTopLevelMenuOpen = async (api: TestApi, label: string): Promise<void> => {
  const item = api.Locator('.TitleBarTopLevelEntry', { hasText: label })
  await api.expect(item).toHaveAttribute('aria-expanded', 'true')
  await api.expect(item).toHaveAttribute('aria-owns', 'Menu-0')
  await api.expect(api.Locator('#Menu-0')).toBeVisible()
}

const expectTopLevelMenuClosed = async (api: TestApi, label: string): Promise<void> => {
  const item = api.Locator('.TitleBarTopLevelEntry', { hasText: label })
  await api.expect(item).toHaveAttribute('id', 'TitleBarEntryActive')
  await api.expect(item).toHaveAttribute('aria-expanded', 'false')
  await api.expect(api.Locator('#Menu-0')).toBeHidden()
}

const expectTopLevelMenuFocused = async (api: TestApi, label: string): Promise<void> => {
  const item = api.Locator('.TitleBarTopLevelEntry', { hasText: label })
  await api.expect(item).toHaveAttribute('id', 'TitleBarEntryActive')
  await api.expect(item).toHaveAttribute('aria-expanded', 'false')
}

export const createEnterOpensMenuTest = (menuOffset: number, label: string): Test => {
  return async (api) => {
    await focusTopLevelMenu(api, menuOffset)
    await api.Command.execute('TitleBar.handleKeyEnter')
    await expectTopLevelMenuOpen(api, label)
  }
}

export const createArrowDownOpensMenuTest = (menuOffset: number, label: string): Test => {
  return async (api) => {
    await focusTopLevelMenu(api, menuOffset)
    await api.TitleBarMenuBar.handleKeyArrowDown()
    await expectTopLevelMenuOpen(api, label)
  }
}

export const createClickTogglesMenuTest = (menuOffset: number, label: string): Test => {
  return async (api) => {
    await api.Command.execute('TitleBar.handleClick', 0, menuOffset)
    await expectTopLevelMenuOpen(api, label)
    await api.Command.execute('TitleBar.handleClick', 0, menuOffset)
    await expectTopLevelMenuClosed(api, label)
  }
}

export const createArrowLeftFocusesMenuTest = (menuOffset: number, expectedLabel: string): Test => {
  return async (api) => {
    await focusTopLevelMenu(api, menuOffset)
    await api.TitleBarMenuBar.handleKeyArrowLeft()
    await expectTopLevelMenuFocused(api, expectedLabel)
  }
}

export const createArrowRightFocusesMenuTest = (menuOffset: number, expectedLabel: string): Test => {
  return async (api) => {
    await focusTopLevelMenu(api, menuOffset)
    await api.TitleBarMenuBar.handleKeyArrowRight()
    await expectTopLevelMenuFocused(api, expectedLabel)
  }
}

export const createSpaceOpensMenuTest = (menuOffset: number, label: string): Test => {
  return async (api) => {
    await focusTopLevelMenu(api, menuOffset)
    await api.TitleBarMenuBar.handleKeySpace()
    await expectTopLevelMenuOpen(api, label)
  }
}

export const createEscapeClosesMenuTest = (menuOffset: number, label: string): Test => {
  return async (api) => {
    await focusTopLevelMenu(api, menuOffset)
    await api.TitleBarMenuBar.handleKeySpace()
    await expectTopLevelMenuOpen(api, label)
    await api.TitleBarMenuBar.handleKeyEscape()
    await expectTopLevelMenuClosed(api, label)
  }
}

export const createIndexToggleMenuTest = (menuOffset: number, label: string): Test => {
  return async (api) => {
    await api.TitleBarMenuBar.toggleIndex(menuOffset)
    await expectTopLevelMenuOpen(api, label)
    await api.TitleBarMenuBar.toggleIndex(menuOffset)
    await expectTopLevelMenuClosed(api, label)
  }
}

export const createFocusedToggleMenuTest = (menuOffset: number, label: string): Test => {
  return async (api) => {
    await focusTopLevelMenu(api, menuOffset)
    await api.TitleBarMenuBar.toggleMenu()
    await expectTopLevelMenuOpen(api, label)
    await api.TitleBarMenuBar.toggleMenu()
    await expectTopLevelMenuClosed(api, label)
  }
}

export const createMouseOverFocusesMenuTest = (menuOffset: number, label: string): Test => {
  return async (api) => {
    await api.TitleBarMenuBar.focus()
    await api.Command.execute('TitleBar.handleMouseOver', menuOffset)
    await expectTopLevelMenuFocused(api, label)
  }
}

export const createMouseOverSwitchesOpenMenuTest = (menuOffset: number, label: string): Test => {
  return async (api) => {
    const initialMenuOffset = menuOffset === 0 ? 1 : 0
    await openMenu(api, initialMenuOffset)
    await api.Command.execute('TitleBar.handleMouseOver', menuOffset)
    await expectTopLevelMenuOpen(api, label)
  }
}

export const createArrowRightSwitchesOpenMenuTest = (menuOffset: number, expectedLabel: string): Test => {
  return async (api) => {
    await openMenu(api, menuOffset)
    await api.TitleBarMenuBar.handleKeyArrowRight()
    await expectTopLevelMenuOpen(api, expectedLabel)
  }
}

export const createArrowLeftSwitchesOpenMenuTest = (menuOffset: number, expectedLabel: string): Test => {
  return async (api) => {
    await openMenu(api, menuOffset)
    await api.TitleBarMenuBar.handleKeyArrowLeft()
    await expectTopLevelMenuOpen(api, expectedLabel)
  }
}

const getEnabledMenuItems = (api: TestApi): ReturnType<TestApi['Locator']> => {
  return api.Locator('#Menu-0 .MenuItem:not([disabled])')
}

export const createHomeFocusesFirstMenuItemTest = (menuOffset: number): Test => {
  return async (api) => {
    await openMenu(api, menuOffset)
    await api.TitleBarMenuBar.handleKeyEnd()
    await api.TitleBarMenuBar.handleKeyHome()
    await api.expect(getEnabledMenuItems(api).nth(0)).toBeFocused()
  }
}

export const createEndFocusesLastMenuItemTest = (menuOffset: number): Test => {
  return async (api) => {
    await openMenu(api, menuOffset)
    await api.TitleBarMenuBar.handleKeyEnd()
    await api.expect(getEnabledMenuItems(api).nth(-1)).toBeFocused()
  }
}

export const createArrowDownWrapsMenuTest = (menuOffset: number): Test => {
  return async (api) => {
    await openMenu(api, menuOffset)
    await api.TitleBarMenuBar.handleKeyEnd()
    await api.TitleBarMenuBar.handleKeyArrowDown()
    await api.expect(getEnabledMenuItems(api).nth(0)).toBeFocused()
  }
}

export const createArrowUpWrapsMenuTest = (menuOffset: number): Test => {
  return async (api) => {
    await openMenu(api, menuOffset)
    await api.TitleBarMenuBar.handleKeyHome()
    await api.TitleBarMenuBar.handleKeyArrowUp()
    await api.expect(getEnabledMenuItems(api).nth(-1)).toBeFocused()
  }
}
