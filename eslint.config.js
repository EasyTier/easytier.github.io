// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  markdown: false,
  rules: {
    'pnpm/yaml-enforce-settings': 'off',
    'style/eol-last': ['error', 'always'],
  },
  // Markdown formatting is handled by Flowmark to avoid formatter conflicts.
  ignores: ['**/*.md'],
})
