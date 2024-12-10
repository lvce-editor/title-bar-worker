import { handleKeySpaceMenuClosed } from './ViewletTitleBarMenuBarHandleKeySpaceMenuClosed.ts'
import { handleKeySpaceMenuOpen } from './ViewletTitleBarMenuBarHandleKeySpaceMenuOpen.ts'
import { ifElse } from './ViewletTitleBarMenuBarIfElse.ts'

// TODO this is same as handle key enter -> merge the functions
export const handleKeySpace = ifElse(handleKeySpaceMenuOpen, handleKeySpaceMenuClosed)
