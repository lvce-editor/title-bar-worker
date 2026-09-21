import { join } from 'node:path'
import { root } from './root.js'

// Includes component DOM inspection and name-based title bar click dispatch.
// Baseline and focus-fix candidate both measure 541,364 bytes.
export const threshold = 542_000

export const instantiations = 6000

export const instantiationsPath = join(root, 'packages', 'title-bar-worker')

export const workerPath = join(root, '.tmp/dist/dist/titleBarWorkerMain.js')

export const playwrightPath = import.meta.resolve('../../../node_modules/playwright/index.mjs').toString()
