import { handleMouseOverMenuClosed } from './ViewletTitleBarMenuBarHandleMouseOverMenuClosed.js'
import { handleMouseOverMenuOpen } from './ViewletTitleBarMenuBarHandleMouseOverMenuOpen.js'
import { ifElse } from './ViewletTitleBarMenuBarIfElse.ts'

export const handleMouseOver = ifElse(handleMouseOverMenuOpen, handleMouseOverMenuClosed)
