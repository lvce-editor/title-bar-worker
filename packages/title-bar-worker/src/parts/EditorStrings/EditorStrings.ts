import * as I18nString from '../I18NString/I18NString.ts'

/**
 * @enum {string}
 */
const UiStrings = {
  OrganizeImports: 'Organize Imports',
  Copy: 'Copy',
  CopyLineDown: 'Copy Line Down',
  CopyLineUp: 'Copy Line Up',
  Cut: 'Cut',
  DuplicateSelection: 'Duplicate Selection',
  FindAllImplementations: 'Find All Implementations',
  FindAllReferences: 'Find All References',
  GoToDefinition: 'Go to Definition',
  GoToTypeDefinition: 'Go to Type Definition',
  MoveLineDown: 'Move Line Down',
  MoveLineUp: 'Move Line Up',
  NoDefinitionFound: 'No definition found',
  NoDefinitionFoundFor: "No definition found for '{PH1}'",
  NoTypeDefinitionFound: 'No type definition found',
  NoTypeDefinitionFoundFor: "No type definition found for '{PH1}'",
  Paste: 'Paste',
  Redo: 'Redo',
  SelectAll: 'Select All',
  Separator: 'Separator',
  ToggleBlockComment: 'Toggle Block Comment',
  ToggleLineComment: 'Toggle Line Comment',
  Undo: 'Undo',
  FormatDocument: 'Format Document',
  SourceActions: 'Source Actions',
  EditorShowHover: 'Show Hover',
  EditorFormatDocumentForced: 'Editor: Format Document (forced)',
  EditorSelectNextOccurrence: 'Editor: Select Next Occurrence',
  EditorSelectAllOccurrences: 'Editor: Select All Occurrences',
  EditorGoToDefinition: 'Editor: Go To Definition',
  EditorGoToTypeDefinition: 'Editor: Go To Type Definition',
  EditorSelectInsideString: 'Editor: Select Inside String',
  EditorIndent: 'Editor: Indent',
  EditorUnindent: 'Editor: Unindent',
  EditorSortLinesAscending: 'Editor: Sort Lines Ascending',
  EditorToggleComment: 'Editor: Toggle Comment',
  EditorSelectUp: 'Editor: Select Up',
  EditorSelectDown: 'Editor: Select Down',
  EditorToggleBlockComment: 'Editor: Toggle Block Comment',
  EditorOpenColorPicker: 'Editor: Open Color Picker',
  EditorCloseColorPicker: 'Editor: Close Color Picker',
  EditorCopyLineDown: 'Editor: Copy Line Down',
  EditorCopyLineUp: 'Editor: Copy Line Up',
  Replace: 'replace',
  NoResults: 'No Results',
  SortImports: 'Sort Imports',
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
