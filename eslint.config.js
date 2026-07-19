import * as config from '@lvce-editor/eslint-config'
import * as actions from '@lvce-editor/eslint-plugin-github-actions'
import * as regex from '@lvce-editor/eslint-plugin-regex'

export default [
  ...config.default,
  ...config.recommendedVirtualDom,
  ...actions.default,
  ...regex.default,
  {
    rules: {
      '@cspell/spellchecker': 'off',
      '@typescript-eslint/await-thenable': 'off',
      '@typescript-eslint/prefer-readonly-parameter-types': 'off',
      '@typescript-eslint/only-throw-error': 'off',
    },
  },
  {
    files: ['packages/e2e/**/*.ts'],
    rules: {
      'e2e/no-imports': 'off',
    },
  },
  {
    files: ['packages/title-bar-worker/test/**/*.ts'],
    rules: {
      'virtual-dom/no-empty-aria': 'off',
      'virtual-dom/no-object-attribute-values': 'off',
      'virtual-dom/prefer-constants': 'off',
      'virtual-dom/prefer-merge-class-names': 'off',
      'virtual-dom/prefer-state-destructuring': 'off',
    },
  },
  {
    files: [
      'packages/title-bar-worker/src/parts/GetMenuEntries2/GetMenuEntries2.ts',
      'packages/title-bar-worker/src/parts/LoadContent/LoadContent.ts',
      'packages/title-bar-worker/src/parts/LoadContent2/LoadContent2.ts',
      'packages/title-bar-worker/src/parts/NativeHostState/NativeHostState.ts',
      'packages/title-bar-worker/src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarSelectIndexRestoreFocus.ts',
    ],
    rules: {
      'virtual-dom/prefer-state-destructuring': 'off',
    },
  },
  {
    files: ['packages/title-bar-worker/src/parts/ToElectronMenuItem/ToElectronMenuItem.ts'],
    rules: {
      'virtual-dom/no-object-attribute-values': 'off',
    },
  },
  {
    files: ['packages/title-bar-worker/src/parts/GetTitleBarMenuBarItemsVirtualDom/GetTitleBarMenuBarItemsVirtualDom.ts'],
    rules: {
      'virtual-dom/valid-child-count': 'off',
    },
  },
  {
    files: ['packages/title-bar-worker/src/parts/GetTitleBarMenuBarVirtualDom/GetTitleBarMenuBarVirtualDom.ts'],
    rules: {
      'virtual-dom/prefer-constants': 'off',
    },
  },
]
