import * as I18nString from '../I18NString/I18NString.ts'

/**
 * @enum {string}
 */
const UiStrings = {
  About: 'About',
  CheckForUpdates: 'Check For Updates',
  ColorTheme: 'Color Theme',
  CommandPalette: 'Command Palette',
  KeyboardShortcuts: 'Keyboard Shortcuts',
  OpenProcessExplorer: 'Open Process Explorer',
  Settings: 'Settings',
  ToggleDeveloperTools: 'Toggle Developer Tools',
}

export const toggleDeveloperTools = (): string => {
  return I18nString.i18nString(UiStrings.ToggleDeveloperTools)
}

export const openProcessExplorer = (): string => {
  return I18nString.i18nString(UiStrings.OpenProcessExplorer)
}

export const checkForUpdates = (): string => {
  return I18nString.i18nString(UiStrings.CheckForUpdates)
}

export const about = (): string => {
  return I18nString.i18nString(UiStrings.About)
}
