import * as I18nString from '../I18NString/I18NString.ts'

/**
 * @enum {string}
 */
const UiStrings = {
  Copy: 'Copy',
  CopyLineDown: 'Copy Line Down',
  CopyLineUp: 'Copy Line Up',
  Cut: 'Cut',
  DuplicateSelection: 'Duplicate Selection',
  EditorCloseColorPicker: 'Editor: Close Color Picker',
  EditorCopyLineDown: 'Editor: Copy Line Down',
  EditorCopyLineUp: 'Editor: Copy Line Up',
  EditorFormatDocumentForced: 'Editor: Format Document (forced)',
  EditorGoToDefinition: 'Editor: Go To Definition',
  EditorGoToTypeDefinition: 'Editor: Go To Type Definition',
  EditorIndent: 'Editor: Indent',
  EditorOpenColorPicker: 'Editor: Open Color Picker',
  EditorSelectAllOccurrences: 'Editor: Select All Occurrences',
  EditorSelectDown: 'Editor: Select Down',
  EditorSelectInsideString: 'Editor: Select Inside String',
  EditorSelectNextOccurrence: 'Editor: Select Next Occurrence',
  EditorSelectUp: 'Editor: Select Up',
  EditorShowHover: 'Show Hover',
  EditorSortLinesAscending: 'Editor: Sort Lines Ascending',
  EditorToggleBlockComment: 'Editor: Toggle Block Comment',
  EditorToggleComment: 'Editor: Toggle Comment',
  EditorUnindent: 'Editor: Unindent',
  FindAllImplementations: 'Find All Implementations',
  FindAllReferences: 'Find All References',
  FormatDocument: 'Format Document',
  GoToDefinition: 'Go to Definition',
  GoToTypeDefinition: 'Go to Type Definition',
  MoveLineDown: 'Move Line Down',
  MoveLineUp: 'Move Line Up',
  NoDefinitionFound: 'No definition found',
  NoDefinitionFoundFor: "No definition found for '{PH1}'",
  NoResults: 'No Results',
  NoTypeDefinitionFound: 'No type definition found',
  NoTypeDefinitionFoundFor: "No type definition found for '{PH1}'",
  OrganizeImports: 'Organize Imports',
  Paste: 'Paste',
  Redo: 'Redo',
  Replace: 'replace',
  SelectAll: 'Select All',
  Separator: 'Separator',
  SortImports: 'Sort Imports',
  SourceActions: 'Source Actions',
  ToggleBlockComment: 'Toggle Block Comment',
  ToggleLineComment: 'Toggle Line Comment',
  Undo: 'Undo',
}

export const cut = (): string => {
  return I18nString.i18nString(UiStrings.Cut)
}

export const copy = (): string => {
  return I18nString.i18nString(UiStrings.Copy)
}

export const paste = (): string => {
  return I18nString.i18nString(UiStrings.Paste)
}

export const undo = (): string => {
  return I18nString.i18nString(UiStrings.Undo)
}

export const redo = (): string => {
  return I18nString.i18nString(UiStrings.Redo)
}

export const toggleLineComment = (): string => {
  return I18nString.i18nString(UiStrings.ToggleLineComment)
}

export const toggleBlockComment = (): string => {
  return I18nString.i18nString(UiStrings.ToggleBlockComment)
}

export const selectAll = (): string => {
  return I18nString.i18nString(UiStrings.SelectAll)
}

export const copyLineUp = (): string => {
  return I18nString.i18nString(UiStrings.CopyLineUp)
}

export const copyLineDown = (): string => {
  return I18nString.i18nString(UiStrings.CopyLineDown)
}

export const moveLineUp = (): string => {
  return I18nString.i18nString(UiStrings.MoveLineUp)
}

export const moveLineDown = (): string => {
  return I18nString.i18nString(UiStrings.MoveLineDown)
}
