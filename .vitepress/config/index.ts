import { withMermaid } from 'vitepress-plugin-mermaid'

import { en } from './en'
import { cn } from './cn'

export default withMermaid({
  title: 'Easytier',
  base: '/easytier-doc/',
  lastUpdated: true,
  locales: {
    root: { label: '简体中文', ...cn },
    en: { label: 'English', ...en },
  },
})
