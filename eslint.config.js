import * as config from '@lvce-editor/eslint-config'
import * as actions from '@lvce-editor/eslint-plugin-github-actions'
import * as regex from '@lvce-editor/eslint-plugin-regex'

export default [
  ...config.default,
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
]
