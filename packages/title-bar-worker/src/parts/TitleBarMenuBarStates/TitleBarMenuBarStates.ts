import * as ViewletRegistry from '@lvce-editor/viewlet-registry'
import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'

export const { get, getCommandIds, registerCommands, set, wrapCommand, wrapGetter } = ViewletRegistry.create<TitleBarMenuBarState>()
