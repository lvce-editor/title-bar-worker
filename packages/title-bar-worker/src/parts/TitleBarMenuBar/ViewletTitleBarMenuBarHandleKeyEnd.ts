import { handleKeyEndMenuClosed } from './ViewletTitleBarMenuBarHandleKeyEndMenuClosed.ts'
import { handleKeyEndMenuOpen } from './ViewletTitleBarMenuBarHandleKeyEndMenuOpen.ts'
import { ifElse } from './ViewletTitleBarMenuBarIfElse.ts'

// TODO this is also use for pagedown -> maybe find a better name for this function
export const handleKeyEnd = ifElse(handleKeyEndMenuOpen, handleKeyEndMenuClosed)
