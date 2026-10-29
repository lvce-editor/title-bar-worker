// Temporary queue diagnostics, applied only inside the diagnostic CI job.
import { readFile, writeFile } from 'node:fs/promises'

const patch = async (path, replacements) => {
  let source = await readFile(path, 'utf8')
  for (const [before, after] of replacements) {
    if (source.split(before).length !== 2) throw new Error(`Expected one fragment in ${path}: ${before}`)
    source = source.replace(before, after)
  }
  await writeFile(path, source)
}
await patch('packages/title-bar-worker/src/parts/TitleBarMenuBarStates/TitleBarMenuBarStates.ts', [
  ['  wrapSerialCommand: wrapCommand,', '  wrapSerialCommand: originalWrapCommand,'],
])
const statePath = 'packages/title-bar-worker/src/parts/TitleBarMenuBarStates/TitleBarMenuBarStates.ts'
await writeFile(
  statePath,
  (await readFile(statePath, 'utf8')) +
    `
export const wrapCommand = (fn: any): any => {
  const serial = originalWrapCommand(async (state: TitleBarMenuBarState, ...args: any[]) => {
    console.info('queue active', fn.name, state.uid)
    try { return await fn(state, ...args) }
    finally { console.info('queue finished', fn.name, state.uid) }
  })
  return async (uid: number, ...args: any[]) => {
    console.info('queue received', fn.name, uid)
    try { return await serial(uid, ...args) }
    finally { console.info('queue returned', fn.name, uid) }
  }
}
`,
)
await patch('packages/title-bar-worker/src/parts/HandleMessagePort/HandleMessagePort.ts', [
  ['    const previous = commandQueues.get(uid)', "    console.info('direct received', command, uid)\n    const previous = commandQueues.get(uid)"],
  [
    '      await fn(uid, ...args)',
    "      console.info('direct active', command, uid)\n      await fn(uid, ...args)\n      console.info('direct render requested', command, uid)",
  ],
  [
    "      await RendererWorker.invoke('Viewlet.requestRender', uid)",
    "      await RendererWorker.invoke('Viewlet.requestRender', uid)\n      console.info('direct render completed', command, uid)",
  ],
])
await patch('packages/title-bar-worker/src/parts/ExecuteMenuItemCommand/ExecuteMenuItemCommand.ts', [
  [
    '  await RendererWorker.invoke(item.command, ...(item.args || []))',
    "  console.info('menu action start', item.command)\n  await RendererWorker.invoke(item.command, ...(item.args || []))\n  console.info('menu action end', item.command)",
  ],
])
