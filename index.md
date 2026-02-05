---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: EasyTier
  text: 由 Rust 和 Tokio 驱动
  tagline: ✨ 一个简单、安全、去中心化的异地组网方案
  image:
    light: '/gui-config-light.png'
    dark: '/gui-config-dark.png'
    alt: 'Easytier GUI 配置界面'
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/introduction

features:
  - title: 去中心化
    details: 节点平等独立，无需中心化服务。<br>不区分客户端/服务端。
    link: /guide/network/decentralized-networking
  - title: 易用
    details: 网页、客户端、命令行多方式操作
  - title: 跨平台
    details: 支持 Win / MacOS / Linux / FreeBSD / Android<br>兼容 X86 / ARM / MIPS 架构
    link: /guide/download
  - title: 安全
    details: 支持 AES-GCM 等多种加密算法 或 WireGuard 加密<br>防止中间人攻击
    link: /guide/network/configurations#:~:text=加密算法&text=ET_ENCRYPTION_ALGORITHM
  - title: 高效 NAT 穿透
    details: 支持 UDP、IPv6 穿透<br>可打通 NAT4-NAT4 网络
    link: /guide/aboutp2p
  - title: 子网代理
    details: 节点可共享子网供其他节点访问。
    link: /guide/network/point-to-networking
  - title: 智能路由
    details: 延迟优先，自动选路<br>提供最佳网络体验
    link: /guide/network/configurations#:~:text=延迟优先模式&text=ET_LATENCY_FIRST
  - title: 高性能
    details: 全链路零拷贝<br>支持 TCP / UDP / WS / WSS / WG / QUIC / FakeTCP 等协议
    link: /guide/perf
  - title: 抗 UDP 丢包
    details: KCP / QUIC 代理<br>优化高丢包环境下的延迟和带宽
    link: /guide/network/kcp-proxy
---

## 相关链接

- QQ 群：
  - 一群 [949700262](https://qm.qq.com/q/wFoTUChqZW)
  - 二群 [837676408](https://qm.qq.com/q/4V33DrfgHe)
  - 三群 [957189589](https://qm.qq.com/q/YNyTQjwlai)

<Home />
