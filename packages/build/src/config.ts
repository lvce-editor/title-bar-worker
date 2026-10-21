import { join } from 'node:path'
import { root } from './root.ts'

// Same Linux/Chromium harness: baseline 552,408 bytes; localized menu labels 564,204 (+11,796, 2.14%).
// Retain 796 bytes of headroom with the memory gate enabled.
export const threshold = 565_000

export const instantiations = 6000

export const instantiationsPath = join(root, 'packages', 'title-bar-worker')

export const workerPath = join(root, '.tmp/dist/dist/titleBarWorkerMain.js')

export const playwrightPath = import.meta.resolve('../../../node_modules/playwright/index.mjs').toString()
