import { join } from 'node:path'
import { root } from './root.js'

// Same Linux/Chromium harness: baseline 549,204 bytes; worker-owned menus 551,300 (+2,096, 0.38%).
// macOS CI measured 551,368; retain 632 bytes of headroom with the gate enabled.
export const threshold = 552_000

export const instantiations = 6000

export const instantiationsPath = join(root, 'packages', 'title-bar-worker')

export const workerPath = join(root, '.tmp/dist/dist/titleBarWorkerMain.js')

export const playwrightPath = import.meta.resolve('../../../node_modules/playwright/index.mjs').toString()
