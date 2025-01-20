// @ts-expect-error ignore next line
import taskLists from 'markdown-it-task-lists'
import { withMermaid } from 'vitepress-plugin-mermaid'

import { cn, cnSearch } from './cn'

import { en } from './en'

export default withMermaid({
  title: 'EasyTier',
  base: '/',
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/easytier.png' }],
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
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/EasyTier/Easytier',
        ariaLabel: 'Github',
      },
      {
        icon: 'gmail',
        link: 'mailto:sunsijie@buaa.edu.cn',
        ariaLabel: 'Email',
      },
      {
        icon: 'qq',
        link: 'https://qm.qq.com/q/wFoTUChqZW',
        ariaLabel: 'qq',
      },
      {
        icon: {
          svg: '<iconify-icon icon="twemoji:red-heart" style="font-size:1.2em" alt="Github Sponsors"></iconify-icon>',
        },
        link: '/#sponsor',
      },
    ],
  },
  locales: {
    root: { label: '简体中文', ...cn },
    en: { label: 'English', ...en },
  },
  markdown: {
    config: (md) => {
      md.use(taskLists)
    },
  },
  vue: {
    template: {
      compilerOptions: { isCustomElement: tag => tag === 'iconify-icon' },
    },
  },
  sitemap: {
    hostname: 'https://easytier.cn',
  },
})
