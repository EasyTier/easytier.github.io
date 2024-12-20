import { withMermaid } from 'vitepress-plugin-mermaid'

import { en } from './en'
import { cn, cnSearch } from './cn'

export default withMermaid({
  title: 'EasyTier',
  base: '/',
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/assets/easytier.png' }],
  ],
  themeConfig: {
    logo: '/easytier.png',
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
