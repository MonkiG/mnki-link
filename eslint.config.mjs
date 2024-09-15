import globals from 'globals'
import pluginJs from '@eslint/js'

export default [
  {
    files: ['./src/**/*.js', './public/**/*.js'],
    languageOptions: { sourceType: 'commonjs' },
  },
  { languageOptions: { globals: { ...globals.node, ...globals.browser } } },
  pluginJs.configs.recommended,
]
