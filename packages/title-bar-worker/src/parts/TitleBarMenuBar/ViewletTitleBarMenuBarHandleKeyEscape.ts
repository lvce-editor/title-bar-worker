import { handleKeyEscapeMenuClosed } from './ViewletTitleBarMenuBarHandleKeyEscapeMenuClosed.ts'
import { handleKeyEscapeMenuOpen } from './ViewletTitleBarMenuBarHandleKeyEscapeMenuOpen.ts'
import { ifElse } from './ViewletTitleBarMenuBarIfElse.ts'

export const handleKeyEscape = ifElse(handleKeyEscapeMenuOpen, handleKeyEscapeMenuClosed)
