import { expect, test } from '@jest/globals'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { getMenuEntriesTitleBarContextMenu } from '../src/parts/GetMenuEntriesTitleBarContextMenu/GetMenuEntriesTitleBarContextMenu.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'
import * as TitleBarStrings from '../src/parts/TitleBarStrings/TitleBarStrings.ts'

test('getMenuEntriesTitleBarContextMenu - both enabled', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    commandCenterEnabled: true,
    titleBarMenuBarEnabled: true,
  }
  const result = await getMenuEntriesTitleBarContextMenu(state)
  expect(result).toEqual([
    {
      args: [1, 'hideMenuBar'],
      command: 'Viewlet.executeViewletCommand',
      flags: MenuItemFlags.Checked,
      id: 'MenuBar',
      label: TitleBarStrings.menuBar(),
    },
    {
      args: [1, 'hideCommandCenter'],
      command: 'Viewlet.executeViewletCommand',
      flags: MenuItemFlags.Checked,
      id: 'Command center',
      label: TitleBarStrings.commandCenter(),
    },
    {
      command: '',
      flags: MenuItemFlags.Checked,
      id: 'layout controls',
      label: TitleBarStrings.layoutControls(),
    },
  ])
})

test('getMenuEntriesTitleBarContextMenu - both disabled', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    commandCenterEnabled: false,
    titleBarMenuBarEnabled: false,
  }
  const result = await getMenuEntriesTitleBarContextMenu(state)
  expect(result).toEqual([
    {
      args: [1, 'showMenuBar'],
      command: 'Viewlet.executeViewletCommand',
      flags: MenuItemFlags.Unchecked,
      id: 'MenuBar',
      label: TitleBarStrings.menuBar(),
    },
    {
      args: [1, 'showCommandCenter'],
      command: 'Viewlet.executeViewletCommand',
      flags: MenuItemFlags.Unchecked,
      id: 'Command center',
      label: TitleBarStrings.commandCenter(),
    },
    {
      command: '',
      flags: MenuItemFlags.Checked,
      id: 'layout controls',
      label: TitleBarStrings.layoutControls(),
    },
  ])
})

test('getMenuEntriesTitleBarContextMenu - menuBar enabled, commandCenter disabled', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    commandCenterEnabled: false,
    titleBarMenuBarEnabled: true,
  }
  const result = await getMenuEntriesTitleBarContextMenu(state)
  expect(result).toEqual([
    {
      args: [1, 'hideMenuBar'],
      command: 'Viewlet.executeViewletCommand',
      flags: MenuItemFlags.Checked,
      id: 'MenuBar',
      label: TitleBarStrings.menuBar(),
    },
    {
      args: [1, 'showCommandCenter'],
      command: 'Viewlet.executeViewletCommand',
      flags: MenuItemFlags.Unchecked,
      id: 'Command center',
      label: TitleBarStrings.commandCenter(),
    },
    {
      command: '',
      flags: MenuItemFlags.Checked,
      id: 'layout controls',
      label: TitleBarStrings.layoutControls(),
    },
  ])
})

test('getMenuEntriesTitleBarContextMenu - menuBar disabled, commandCenter enabled', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    commandCenterEnabled: true,
    titleBarMenuBarEnabled: false,
  }
  const result = await getMenuEntriesTitleBarContextMenu(state)
  expect(result).toEqual([
    {
      args: [1, 'showMenuBar'],
      command: 'Viewlet.executeViewletCommand',
      flags: MenuItemFlags.Unchecked,
      id: 'MenuBar',
      label: TitleBarStrings.menuBar(),
    },
    {
      args: [1, 'hideCommandCenter'],
      command: 'Viewlet.executeViewletCommand',
      flags: MenuItemFlags.Checked,
      id: 'Command center',
      label: TitleBarStrings.commandCenter(),
    },
    {
      command: '',
      flags: MenuItemFlags.Checked,
      id: 'layout controls',
      label: TitleBarStrings.layoutControls(),
    },
  ])
})
