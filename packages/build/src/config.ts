import { join } from 'node:path'
import { root } from './root.js'

// Includes component DOM inspection and name-based title bar click dispatch.
// Baseline measures 541,364 bytes; focus and render synchronization measures 541,684.
// This change measured 541,948 bytes on Linux and 542,020 on macOS; 1,000 bytes of headroom covers the macOS measurement.
export const threshold = 543_000

export const instantiations = 6000

export const instantiationsPath = join(root, 'packages', 'title-bar-worker')

export const workerPath = join(root, '.tmp/dist/dist/titleBarWorkerMain.js')

export const playwrightPath = import.meta.resolve('../../../node_modules/playwright/index.mjs').toString()
