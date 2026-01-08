import fs from 'node:fs'
import { defineConfig } from 'vitepress'

export const cn = defineConfig({
  title: 'EasyTier - 简单、安全、去中心化的异地组网方案',
  lang: 'cn',
  description: '一个简单、安全、去中心化的内网穿透 SD-WAN 异地组网方案，使用 Rust 语言和 Tokio 框架实现',

  themeConfig: {
    sidebar: [
      {
        text: '开始',
        items: [
          { text: '功能简介', link: '/guide/introduction' },
          { text: '下载', link: '/guide/download' },
          { text: '安装 CLI', link: '/guide/installation' },
          { text: '安装 GUI', link: '/guide/installation_gui' },
          { text: '常见问题', link: '/guide/faq' },
        ],
      },
      {
        text: '命令行工具组网',
        link: '/guide/networking',
        items: [
          { text: '快速组网', link: '/guide/network/quick-networking' },
          { text: '去中心组网', link: '/guide/network/decentralized-networking' },
          { text: '使用 Web 控制台组网', link: '/guide/network/web-console' },
          { text: '使用 WireGuard 客户端接入', link: '/guide/network/use-easytier-with-wireguard-client' },
          { text: '子网代理（点对网）', link: '/guide/network/point-to-networking' },
          { text: '带宽延迟优化（KCP 代理）', link: '/guide/network/kcp-proxy' },
          { text: '高级功能', collapsed: true, items: [
            { text: '网对网', link: '/guide/network/network-to-network' },
            { text: '无 TUN 模式（免 Root 权限）', link: '/guide/network/no-root' },
            { text: 'SOCKS5', link: '/guide/network/socks5' },
            { text: '搭建共享节点', link: '/guide/network/host-public-server' },
            { text: '改善 P2P', link: '/guide/network/p2p-optimize' },
            { text: '魔法 DNS', link: '/guide/network/magic-dns' },
            { text: 'ACL', link: '/guide/config/acl' },
          ] },
          { text: '开机自启（注册服务）', collapsed: true, items: [
            { text: '一键安装服务', link: '/guide/network/oneclick-install-as-service' },
            { text: '安装为 Windows 服务', link: '/guide/network/install-as-a-windows-service' },
            { text: '安装为 Linux systemd 服务', link: '/guide/network/install-as-a-systemd-service' },
            { text: '安装为 macOS 服务', link: '/guide/network/install-as-a-macos-service' },
          ] },
          { text: '其他配置', link: '/guide/network/configurations' },
          { text: '配置文件', link: '/guide/network/config-file' },
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
          { text: 'EasyTier 管理器', link: '/guide/gui/easytier-manager' },
          { text: 'EasyTier 游戏联机启动器', link: '/guide/gui/easytier-game' },
          { text: 'AstralGame 联机工具', link: '/guide/gui/astral-game' },
          { text: 'EasyTier 鸿蒙版', link: '/guide/gui/easytier-harmonyos' },
        ],
      },
      {
        text: '其它',
        items: [
          { text: '关于 P2P', link: '/guide/aboutp2p' },
          { text: '性能测试', link: '/guide/perf' },
          { text: '路线图', link: '/guide/roadmap' },
          { text: '社区和贡献', link: '/guide/community-and-contribution' },
          { text: '许可证', link: '/guide/license' },
          { text: '联系方式', link: '/guide/contact' },
        ],
      },
    ],
    nav: [
      {
        text: '<iconify-icon icon="fa6-solid:bug" style="margin-right:0.25rem;color:#FF4500;" alt="bug"></iconify-icon>提交反馈',
        link: 'https://github.com/EasyTier/EasyTier/issues',
      },
      {
        text: '<iconify-icon icon="fa6-solid:clipboard-list" style="margin-right:0.25rem;color:#FF6347;" alt="clipboard"></iconify-icon>变更日志',
        link: 'https://github.com/EasyTier/EasyTier/releases',
      },
    ],
    footer: {
      message: '基于 Apache License 2.0 许可发布',
      copyright: '版权所有 © 2024-present EasyTier | '
        + '<a href="https://beian.miit.gov.cn/">'
        + '<img src="https://img.alicdn.com/tfs/TB1..50QpXXXXX7XpXXXXXXXXXX-40-40.png" alt="ICP 备案" style="width: 16px; height: 16px; display: inline-block; margin-bottom: -4px;">'
        + '浙ICP备2024137671号-1</a>',
    },
    editLink: {
      pattern: 'https://github.com/EasyTier/easytier.github.io/edit/main/:path',
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
