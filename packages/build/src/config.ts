import { join } from 'node:path'
import { root } from './root.js'

// Baseline measures 542,624 bytes on Linux; devcontainer title formatting measures 543,216 (+592 bytes, 0.11%).
// CI measured 543,216 bytes on Linux and Windows and 543,288 on macOS; 1,012 bytes of headroom covers the highest measurement.
export const threshold = 544_300

export const instantiations = 6000

export const instantiationsPath = join(root, 'packages', 'title-bar-worker')

export const workerPath = join(root, '.tmp/dist/dist/titleBarWorkerMain.js')

export const playwrightPath = import.meta.resolve('../../../node_modules/playwright/index.mjs').toString()
