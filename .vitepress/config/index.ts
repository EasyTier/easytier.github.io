import { defineConfig } from 'vitepress'
import { en } from './en'
import { cn } from './cn'

export default defineConfig({
  title: 'Easytier',
  base: '/easytier-doc/',
  locales: {
    root: { label: '简体中文', ...cn },
    en: { label: 'English', ...en },
  },
})