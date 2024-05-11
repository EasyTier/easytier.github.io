import { withMermaid } from 'vitepress-plugin-mermaid'

import { en } from './en'
import { cn, cnSearch } from './cn'

export default withMermaid({
  title: 'EasyTier',
  base: '/easytier-doc/',
  lastUpdated: true,
  themeConfig: {
    search: {
      provider: 'local',
      options: {
        locales: {
          root: { ...cnSearch },
        },
      },
    },
  },
  locales: {
    root: { label: '简体中文', ...cn },
    en: { label: 'English', ...en },
  },
})
