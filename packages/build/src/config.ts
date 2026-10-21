import { join } from 'node:path'
import { root } from './root.ts'

// Same Linux/Chromium harness: baseline 550,960 bytes; lazy measurement RPC 552,392 (+1,432, 0.26%).
// CI measured 552,464 on macOS; retain 536 bytes of headroom with the gate enabled.
export const threshold = 553_000

export const instantiations = 6000

export const instantiationsPath = join(root, 'packages', 'title-bar-worker')

export const workerPath = join(root, '.tmp/dist/dist/titleBarWorkerMain.js')

export const playwrightPath = import.meta.resolve('../../../node_modules/playwright/index.mjs').toString()
