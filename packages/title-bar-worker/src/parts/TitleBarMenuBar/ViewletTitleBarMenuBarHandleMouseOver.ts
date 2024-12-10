import { handleMouseOverMenuClosed } from './ViewletTitleBarMenuBarHandleMouseOverMenuClosed.ts'
import { handleMouseOverMenuOpen } from './ViewletTitleBarMenuBarHandleMouseOverMenuOpen.ts'
import { ifElse } from './ViewletTitleBarMenuBarIfElse.ts'

export const handleMouseOver = ifElse(handleMouseOverMenuOpen, handleMouseOverMenuClosed)
