import { join } from 'node:path'
import { root } from './root.js'

// Linux CI: baseline 546,988 bytes; eager registration of the lazy cache RPC uses 549,412 (+2,424, 0.44%).
// Keep 1,588 bytes of headroom for the registered RPC while retaining the memory gate.
export const threshold = 551_000

export const instantiations = 6000

export const instantiationsPath = join(root, 'packages', 'title-bar-worker')

export const workerPath = join(root, '.tmp/dist/dist/titleBarWorkerMain.js')

export const playwrightPath = import.meta.resolve('../../../node_modules/playwright/index.mjs').toString()
