# Electron integration tests

Most browser scenarios run from `packages/e2e` with the title bar worker's regular end-to-end suite. The mouse-leave Playwright script lives in `packages/e2e/scripts` and runs against a static LVCE export. The unsupported-folder scenario stays here because it needs the LVCE integration runner's `FilePicker.setOpenFolderSupported` test hook, which the regular runner does not expose. The remaining checks need Electron window behavior or Electron's `app-region` CSS support.

The Integration workflow builds this repository, overlays its artifact and test files into a pinned, disposable LVCE checkout, and runs the unsupported-folder browser test across its matrix. Linux also runs the native window checks. Each Electron launch uses an isolated Chromium profile and LVCE XDG directories.

Build this repository and the pinned LVCE Electron application, then run the scripts from the disposable application's `packages/extension-host-worker-tests` directory:

```sh
node packages/e2e-integration/prepare.mjs /path/to/disposable/lvce-editor
node /path/to/disposable/lvce-editor/packages/extension-host-worker-tests/scripts/test-help-about-dialog.mjs
node /path/to/disposable/lvce-editor/packages/extension-host-worker-tests/scripts/test-titlebarless.mjs
node /path/to/disposable/lvce-editor/packages/extension-host-worker-tests/scripts/test-titlebar-reference.mjs
node /path/to/disposable/lvce-editor/packages/extension-host-worker-tests/scripts/test-titlebar-app-regions.mjs
```

Preparation overlays only local build artifacts and Electron scripts. See `config.json` for artifact and script destinations, and `.github/workflows/integration.yml` for platform and application build requirements. Update the pinned application commit when its Electron runtime needs updating.
