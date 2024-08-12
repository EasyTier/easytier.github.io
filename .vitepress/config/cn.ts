import { defineConfig } from 'vitepress'

export const cn = defineConfig({
  lang: 'cn',
  description: '一个简单、安全、去中心化的内网穿透 VPN 组网方案，使用 Rust 语言和 Tokio 框架实现',

  themeConfig: {
    sidebar: [
      {
        text: '开始',
        items: [
          { text: '简介', link: '/guide/introduction' },
          { text: '安装', link: '/guide/installation' },
        ],
      },
      {
        text: '命令行工具组网',
        link: '/guide/networking',
        items: [
          { text: '双节点', link: '/guide/network/two-node-networking' },
          { text: '多节点', link: '/guide/network/multi-node-networking' },
          { text: '子网代理（点对网）', link: '/guide/network/point-to-networking' },
          { text: '无公网IP', link: '/guide/network/networking-without-public-ip' },
          { text: '使用 WireGuard 客户端接入', link: '/guide/network/use-easytier-with-wirefuard-client' },
          { text: '注册为windows服务(开机自启)', link: '/guide/network/install-as-a-windows-service' },
          { text: '将服务安装为 Linux Systemd 服务', link: '/guide/network/install-as-a-systemd-service' }, 
          { text: '其他配置', link: '/guide/network/configurations' },
        ],
      },
      {
        text: '图形界面 GUI 组网',
        link: 'guide/gui/index',
        items: [
          { text: '公共服务器组网', link: '/guide/gui/basic' },
          { text: '手动组网', link: '/guide/gui/manual' },
          { text: 'WireGuard 接入', link: '/guide/gui/vpn_portal' },
          { text: '子网代理', link: '/guide/gui/subnet_proxy' },
        ],
      },
      {
        items: [
          { text: '性能测试', link: '/guide/perf' },
          { text: '路线图', link: '/guide/roadmap' },
          { text: '社区和贡献', link: '/guide/community-and-contribution' },
          { text: '许可证', link: '/guide/license' },
          { text: '联系方式', link: '/guide/contact' },
        ],
      },
    ],
    footer: {
      message: '基于 Apache License 2.0 许可发布',
      copyright: '版权所有 © 2024-present EasyTier',
    },
    editLink: {
      pattern: 'https://github.com/EasyTier/easytier.github.io/edit/dev/:path',
      text: '在 GitHub 上编辑此页面',
    },
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    outline: {
      label: '页面导航',
    },
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium',
      },
    },
    langMenuLabel: '多语言',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
  },
})

export const cnSearch = {
  translations: {
    button: {
      buttonText: '搜索文档',
      buttonAriaLabel: '搜索文档',
    },
    modal: {
      noResultsText: '无法找到相关结果',
      resetButtonTitle: '清除查询条件',
      footer: {
        selectText: '选择',
        navigateText: '切换',
        closeText: '关闭',
      },
    },
  },
}
