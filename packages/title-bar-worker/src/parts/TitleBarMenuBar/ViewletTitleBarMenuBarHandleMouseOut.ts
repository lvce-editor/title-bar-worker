import { handleMouseOutMenuClosed } from './ViewletTitleBarMenuBarHandleMouseOutMenuClosed.ts'
import { handleMouseOutMenuOpen } from './ViewletTitleBarMenuBarHandleMouseOutMenuOpen.ts'
import { ifElse } from './ViewletTitleBarMenuBarIfElse.ts'

export const handleMouseOut = ifElse(handleMouseOutMenuOpen, handleMouseOutMenuClosed)
