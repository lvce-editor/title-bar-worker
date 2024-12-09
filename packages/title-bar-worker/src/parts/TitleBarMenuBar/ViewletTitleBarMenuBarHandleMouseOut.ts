import { handleMouseOutMenuClosed } from './ViewletTitleBarMenuBarHandleMouseOutMenuClosed.js'
import { handleMouseOutMenuOpen } from './ViewletTitleBarMenuBarHandleMouseOutMenuOpen.js'
import { ifElse } from './ViewletTitleBarMenuBarIfElse.ts'

export const handleMouseOut = ifElse(handleMouseOutMenuOpen, handleMouseOutMenuClosed)
