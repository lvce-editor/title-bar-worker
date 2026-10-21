# Electron integration tests

Most browser scenarios run from `packages/e2e` with the title bar worker's regular end-to-end suite. A standalone Playwright browser script in `packages/e2e/scripts` checks menu focus clearing on mouse leave and the unsupported local-folder dialog against a static LVCE export. The remaining integration checks need Electron window behavior or Electron's `app-region` CSS support.

The Integration workflow builds this repository, overlays its artifact and test files into a pinned, disposable LVCE checkout, and runs the browser behavior script across its matrix. Linux also runs the native window checks. Each Electron launch uses an isolated Chromium profile and LVCE XDG directories.

Build this repository and the pinned LVCE Electron application, then run the scripts from the disposable application's `packages/extension-host-worker-tests` directory:

```sh
node packages/e2e-integration/prepare.mjs /path/to/disposable/lvce-editor
node /path/to/disposable/lvce-editor/packages/extension-host-worker-tests/scripts/test-help-about-dialog.mjs
node /path/to/disposable/lvce-editor/packages/extension-host-worker-tests/scripts/test-titlebarless.mjs
node /path/to/disposable/lvce-editor/packages/extension-host-worker-tests/scripts/test-titlebar-reference.mjs
node /path/to/disposable/lvce-editor/packages/extension-host-worker-tests/scripts/test-titlebar-app-regions.mjs
```

Preparation overlays only local build artifacts and Electron scripts. See `config.json` for artifact and script destinations, and `.github/workflows/integration.yml` for platform and application build requirements. Update the pinned application commit when its Electron runtime needs updating.
