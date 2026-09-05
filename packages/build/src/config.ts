import { join } from 'node:path'
import { root } from './root.js'

// Includes the read-only component DOM inspection command.
export const threshold = 537_000

export const instantiations = 6000

export const instantiationsPath = join(root, 'packages', 'title-bar-worker')

export const workerPath = join(root, '.tmp/dist/dist/titleBarWorkerMain.js')

export const playwrightPath = import.meta.resolve('../../../node_modules/playwright/index.mjs').toString()
