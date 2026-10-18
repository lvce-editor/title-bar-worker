import { join } from 'node:path'
import { root } from './root.js'

// Baseline CI memory is 543,216 bytes on Linux and Windows and 543,288 on macOS.
// The title bar measurement cache measures 546,988 bytes on Linux (+3,772, 0.69%); 1,512 bytes of headroom covers this measurement.
export const threshold = 548_500

export const instantiations = 6000

export const instantiationsPath = join(root, 'packages', 'title-bar-worker')

export const workerPath = join(root, '.tmp/dist/dist/titleBarWorkerMain.js')

export const playwrightPath = import.meta.resolve('../../../node_modules/playwright/index.mjs').toString()
