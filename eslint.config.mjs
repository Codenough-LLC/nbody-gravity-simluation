// @ts-check

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import jest from 'eslint-plugin-jest'

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['test/**'],
    ...jest.configs['flat/recommended']
  },
  {
    ignores: [
      'lib/'
    ]
  },
  {
    rules: {
      semi: ['error', 'never'],
      quotes: ['error', 'single']
    }
  }
)
