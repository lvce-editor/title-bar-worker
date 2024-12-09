import * as I18nString from '../I18NString/I18NString.ts'

/**
 * @enum {string}
 */
const UiStrings = {
  NewFile: 'New File',
  NewWindow: 'New Window',
  Separator: 'Separator',
  OpenFile: 'Open File',
  OpenFolder: 'Open Folder',
  OpenRecent: 'Open Recent',
  Exit: 'Exit',
  Save: 'Save',
  SaveAll: 'Save All',
}

export const newFile = (): string => {
  return I18nString.i18nString(UiStrings.NewFile)
}

export const newWindow = (): string => {
  return I18nString.i18nString(UiStrings.NewWindow)
}

export const openFile = (): string => {
  return I18nString.i18nString(UiStrings.OpenFile)
}

export const openFolder = (): string => {
  return I18nString.i18nString(UiStrings.OpenFolder)
}

export const openRecent = (): string => {
  return I18nString.i18nString(UiStrings.OpenRecent)
}

export const save = (): string => {
  return I18nString.i18nString(UiStrings.Save)
}

export const saveAll = (): string => {
  return I18nString.i18nString(UiStrings.SaveAll)
}

export const exit = (): string => {
  return I18nString.i18nString(UiStrings.Exit)
}
