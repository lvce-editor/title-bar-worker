import { join } from 'node:path'
import { root } from './root.ts'

export const threshold = 540_000

export const instantiations = 5000

export const instantiationsPath = join(root, 'packages', 'title-bar-worker')

export const workerPath = join(root, '.tmp/dist/dist/titleBarWorkerMain.js')

export const playwrightPath = import.meta.resolve('../../e2e/node_modules/playwright/index.mjs').toString()
