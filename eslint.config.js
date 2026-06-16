import * as config from '@lvce-editor/eslint-config'
import * as actions from '@lvce-editor/eslint-plugin-github-actions'

export default [
  ...config.default,
  ...actions.default,
  {
    rules: {
      '@cspell/spellchecker': 'off',
      '@typescript-eslint/await-thenable': 'off',
      '@typescript-eslint/prefer-readonly-parameter-types': 'off',
      '@typescript-eslint/only-throw-error': 'off',
      'unicorn/prefer-short-arrow-method': 'off',
    },
  },
]
