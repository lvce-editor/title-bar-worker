import { handleKeyArrowUpMenuClosed } from './ViewletTitleBarMenuBarHandleKeyArrowUpMenuClosed.ts'
import { handleKeyArrowUpMenuOpen } from './ViewletTitleBarMenuBarHandleKeyArrowUpMenuOpen.ts'
import { ifElse } from './ViewletTitleBarMenuBarIfElse.ts'

export const handleKeyArrowUp = ifElse(handleKeyArrowUpMenuOpen, handleKeyArrowUpMenuClosed)
