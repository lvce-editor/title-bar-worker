import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { getMenuEntriesTitleBarContextMenu } from '../src/parts/GetMenuEntriesTitleBarContextMenu/GetMenuEntriesTitleBarContextMenu.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'
import * as TitleBarStrings from '../src/parts/TitleBarStrings/TitleBarStrings.ts'

test('getMenuEntriesTitleBarContextMenu - both enabled', async () => {
  const state = {
    ...createDefaultState(),
    commandCenterEnabled: true,
    titleBarMenuBarEnabled: true,
  }
  const result = await getMenuEntriesTitleBarContextMenu(state)
  expect(result).toEqual([
    {
      command: 'TitleBar.hideMenuBar',
      flags: MenuItemFlags.Checked,
      id: 'MenuBar',
      label: TitleBarStrings.menuBar(),
    },
    {
      command: 'TitleBar.hideCommandCenter',
      flags: MenuItemFlags.Checked,
      id: 'Command center',
      label: TitleBarStrings.commandCenter(),
    },
    {
      command: '',
      flags: MenuItemFlags.Checked,
      id: 'layout controls',
      label: 'layout controls',
    },
  ])
})

test('getMenuEntriesTitleBarContextMenu - both disabled', async () => {
  const state = {
    ...createDefaultState(),
    commandCenterEnabled: false,
    titleBarMenuBarEnabled: false,
  }
  const result = await getMenuEntriesTitleBarContextMenu(state)
  expect(result).toEqual([
    {
      command: 'TitleBar.showMenuBar',
      flags: MenuItemFlags.Unchecked,
      id: 'MenuBar',
      label: TitleBarStrings.menuBar(),
    },
    {
      command: 'TitleBar.showCommandCenter',
      flags: MenuItemFlags.Unchecked,
      id: 'Command center',
      label: TitleBarStrings.commandCenter(),
    },
    {
      command: '',
      flags: MenuItemFlags.Checked,
      id: 'layout controls',
      label: 'layout controls',
    },
  ])
})

test('getMenuEntriesTitleBarContextMenu - menuBar enabled, commandCenter disabled', async () => {
  const state = {
    ...createDefaultState(),
    commandCenterEnabled: false,
    titleBarMenuBarEnabled: true,
  }
  const result = await getMenuEntriesTitleBarContextMenu(state)
  expect(result).toEqual([
    {
      command: 'TitleBar.hideMenuBar',
      flags: MenuItemFlags.Checked,
      id: 'MenuBar',
      label: TitleBarStrings.menuBar(),
    },
    {
      command: 'TitleBar.showCommandCenter',
      flags: MenuItemFlags.Unchecked,
      id: 'Command center',
      label: TitleBarStrings.commandCenter(),
    },
    {
      command: '',
      flags: MenuItemFlags.Checked,
      id: 'layout controls',
      label: 'layout controls',
    },
  ])
})

test('getMenuEntriesTitleBarContextMenu - menuBar disabled, commandCenter enabled', async () => {
  const state = {
    ...createDefaultState(),
    commandCenterEnabled: true,
    titleBarMenuBarEnabled: false,
  }
  const result = await getMenuEntriesTitleBarContextMenu(state)
  expect(result).toEqual([
    {
      command: 'TitleBar.showMenuBar',
      flags: MenuItemFlags.Unchecked,
      id: 'MenuBar',
      label: TitleBarStrings.menuBar(),
    },
    {
      command: 'TitleBar.hideCommandCenter',
      flags: MenuItemFlags.Checked,
      id: 'Command center',
      label: TitleBarStrings.commandCenter(),
    },
    {
      command: '',
      flags: MenuItemFlags.Checked,
      id: 'layout controls',
      label: 'layout controls',
    },
  ])
})
