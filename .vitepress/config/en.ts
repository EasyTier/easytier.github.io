import fs from 'node:fs'
import { defineConfig } from 'vitepress'

export const en = defineConfig({
  lang: 'en',
  description: 'A simple, secure, decentralized SD-WAN solution for intranet penetration, implemented using Rust and the Tokio framework',

  themeConfig: {
    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Introduction', link: '/en/guide/introduction' },
          { text: 'Download', link: '/en/guide/download' },
          { text: 'Installation', link: '/en/guide/installation' },
        ],
      },
      {
        text: 'Command Line Networking',
        link: '/en/guide/networking',
        items: [
          { text: 'Quick Networking', link: '/en/guide/network/fast-networking' },
          { text: 'Decentralized Networking', link: '/en/guide/network/decentralized-networking' },
          { text: 'Networking with Web Console', link: '/en/guide/network/web-console' },
          { text: 'Using WireGuard Client', link: '/en/guide/network/use-easytier-with-wireguard-client' },
          { text: 'Subnet Proxy (Point-to-Network)', link: '/en/guide/network/point-to-networking' },
          { text: 'Advanced Features', collapsed: true, items: [
            { text: 'Network-to-Network', link: '/en/guide/network/network-to-network' },
            { text: 'No TUN Mode (No Root Required)', link: '/en/guide/network/no-root' },
            { text: 'SOCKS5', link: '/en/guide/network/socks5' },
            { text: 'Hosting Public Server', link: '/en/guide/network/host-public-server' },
            { text: 'P2P Optimization', link: '/en/guide/network/p2p-optimize' },
          ] },
          { text: 'Autostart (Register Service)', collapsed: true, items: [
            { text: 'Install as Windows Service', link: '/en/guide/network/install-as-a-windows-service' },
            { text: 'Install as Linux systemd Service', link: '/en/guide/network/install-as-a-systemd-service' },
            { text: 'Install as macOS Service', link: '/en/guide/network/install-as-a-macos-service' },
          ] },
          { text: 'Other Configurations', link: '/en/guide/network/configurations' },
          { text: 'Configuration File', link: '/en/guide/network/config-file' },
        ],
      },
      {
        text: 'GUI Networking',
        link: '/en/guide/gui/index',
        items: [
          { text: 'Public Server Networking', link: '/en/guide/gui/basic' },
          { text: 'Manual Networking', link: '/en/guide/gui/manual' },
          { text: 'WireGuard Access', link: '/en/guide/gui/vpn_portal' },
          { text: 'Subnet Proxy', link: '/en/guide/gui/subnet_proxy' },
          { text: 'EasyTier Manager', link: '/en/guide/gui/easytier-manager' },
          { text: 'EasyTier Game Launcher', link: '/en/guide/gui/easytier-game' },
        ],
      },
      {
        items: [
          { text: 'Performance Testing', link: '/en/guide/perf' },
          { text: 'Roadmap', link: '/en/guide/roadmap' },
          { text: 'Community and Contribution', link: '/en/guide/community-and-contribution' },
          { text: 'License', link: '/en/guide/license' },
          { text: 'Contact', link: '/en/guide/contact' },
        ],
      },
    ],
    nav: [
      {
        text: '<iconify-icon icon="fa6-solid:gears" style="margin-right:0.25rem;color:#3498db;"></iconify-icon>Web Console',
        link: 'https://easytier.cn/web',
      },
      {
        text: '<iconify-icon icon="fa6-solid:bug" style="margin-right:0.25rem;color:#FF4500;" alt="bug"></iconify-icon>Submit Feedback',
        link: 'https://github.com/EasyTier/EasyTier/issues',
      },
      {
        text: '<iconify-icon icon="fa6-solid:clipboard-list" style="margin-right:0.25rem;color:#FF6347;" alt="clipboard"></iconify-icon>Changelog',
        link: 'https://github.com/EasyTier/EasyTier/releases',
      },
    ],
    footer: {
      message: 'Released under the Apache License 2.0',
      copyright: 'Copyright © 2024-present EasyTier | '
        + '<a href="https://beian.miit.gov.cn/">'
        + '<img src="https://img.alicdn.com/tfs/TB1..50QpXXXXX7XpXXXXXXXXXX-40-40.png" alt="ICP Record" style="width: 16px; height: 16px; display: inline-block; margin-bottom: -4px;">'
        + 'Zhejiang ICP No. 2024137671-1</a>',
    },
    editLink: {
      pattern: 'https://github.com/EasyTier/easytier.github.io/edit/main/:path',
      text: 'Edit this page on GitHub',
    },
    docFooter: {
      prev: 'Previous Page',
      next: 'Next Page',
    },
    outline: {
      label: 'Page Navigation',
    },
    lastUpdated: {
      text: 'Last Updated',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium',
      },
    },
    langMenuLabel: 'Languages',
    returnToTopLabel: 'Back to Top',
    sidebarMenuLabel: 'Menu',
    darkModeSwitchLabel: 'Theme',
    lightModeSwitchTitle: 'Switch to Light Mode',
    darkModeSwitchTitle: 'Switch to Dark Mode',
  },
})

export const enSearch = {
  translations: {
    button: {
      buttonText: 'Search Docs',
      buttonAriaLabel: 'Search Docs',
    },
    modal: {
      noResultsText: 'No results found',
      resetButtonTitle: 'Clear search query',
      footer: {
        selectText: 'Select',
        navigateText: 'Navigate',
        closeText: 'Close',
      },
    },
  },
}
