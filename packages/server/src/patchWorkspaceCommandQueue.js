// Diagnostic-only integration of the renderer fix while its release is pending.
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'

const require = createRequire(import.meta.url)
const staticRoot = join(dirname(require.resolve('@lvce-editor/static-server/package.json')), 'static')
const hash = (await readdir(staticRoot)).find((entry) => /^[a-z\d]{7}$/.test(entry))
if (!hash) {
  throw new Error('Cannot find the bundled renderer')
}
const path = join(staticRoot, hash, 'packages/renderer-worker/dist/rendererWorkerMain.js')
const source = await readFile(path, 'utf8')
const marker = `const wrapTitleBarCommand = key => {
  return async (state, ...args) => {
`
const replacement = `${marker}    if (key === 'handleWorkspaceChange') { return runTitleBarCommand(key, state, args); }
`
if (!source.includes(replacement)) {
  if (source.split(marker).length !== 2) {
    throw new Error('Renderer command wrapper changed; reconcile the diagnostic patch')
  }
  await writeFile(path, source.replace(marker, replacement))
}

// Integrate the pending renderer-process deferred-focus fix for this stress run.
const rendererPath = join(staticRoot, hash, 'packages/renderer-process/dist/rendererProcessMain.js')
const rendererSource = await readFile(rendererPath, 'utf8')
const focusMarker = `const focusSelectorAfterRender = (viewletId, selector) => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      focusSelector(viewletId, selector);
    });
  });
};`
const focusReplacement = `const pendingFocusAfterRender = {};
const focusSelectorAfterRender = (viewletId, selector) => {
  pendingFocusAfterRender.cancel?.();
  const instance = get$9(viewletId);
  let cancelled = false;
  const cancel = () => {
    cancelled = true;
    document.removeEventListener('focusin', cancel, true);
    if (pendingFocusAfterRender.cancel === cancel) pendingFocusAfterRender.cancel = undefined;
  };
  pendingFocusAfterRender.cancel = cancel;
  document.addEventListener('focusin', cancel, { capture: true });
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const shouldFocus = !cancelled && get$9(viewletId) === instance;
      cancel();
      if (shouldFocus) focusSelector(viewletId, selector);
    });
  });
};`
if (!rendererSource.includes(focusReplacement)) {
  if (rendererSource.split(focusMarker).length !== 2) {
    throw new Error('Renderer deferred-focus wrapper changed; reconcile the diagnostic patch')
  }
  await writeFile(rendererPath, rendererSource.replace(focusMarker, focusReplacement))
}
