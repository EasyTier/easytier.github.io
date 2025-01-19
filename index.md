---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: EasyTier
  text: 由 Rust 和 Tokio 驱动
  tagline: ✨ 一个简单、安全、去中心化的异地组网方案
  image:
    light: '/assets/gui-config-light.png'
    dark: '/assets/gui-config-dark.png'
    alt: 'Easytier GUI 配置界面'
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/installation
    - theme: alt
      text: 下载
      link: /guide/download
    - theme: alt
      text: Web 控制台
      link: /web
    - theme: sponsor
      text: 💚 赞助
      link: /#sponsor

features:
  - title: 去中心化
    details: 不区分客户端 / 服务端，无需依赖中心化服务，节点平等且独立。
  - title: 易用
    details: |
      支持通过 网页 / 客户端 / 命令行 多种方式使用，操作简单。
      </br>
      支持使用共享节点一键组网。
  - title: 跨平台
    details: |
      支持 Windows / MacOS / Linux / FreeBSD / Android 等系统。
      </br>
      支持 X86 / ARM / MIPS 等硬件架构。
  - title: 安全
    details: 支持 AES-GCM 或 WireGuard 加密保护中转流量，免受中间人攻击。
  - title: 高效 NAT 穿透
    details: 支持基于 UDP 的 NAT 穿透和 IPV6 穿透，在某些情况下可以打通 NAT4-NAT4 的网络。
  - title: 子网代理
    details: 节点可以将其可访问的网段转发到虚拟网，允许其他节点通过该节点访问这些子网。
  - title: 智能路由
    details: 支持延迟优先模式，自动选择最优路径，提供最佳的网络体验。
  - title: 高性能
    details: 全链路零拷贝，性能与主流组网软件相当。</br> 节点间通信支持 TCP / UDP / QUIC / WG 等多种协议。
---

## 相关链接

- [社区文档](https://doc.oee.icu)：由社区志愿者维护，白话版 EasyTier 的使用指南，实时更新。
- [公共服务器节点列表](https://easytier.gd.nkbpal.cn/status/easytier)：由社区志愿者维护，提供公共服务器节点列表及状态查询。
- QQ 群：[949700262](https://qm.qq.com/q/wFoTUChqZW)
- Telegram：https://t.me/easytier

## 赞助 {#sponsor}

如果您觉得 EasyTier 对您有所帮助，欢迎赞助我们。

软件的开发和维护需要大量的时间和精力，您的赞助将帮助我们更好地维护和改进 EasyTier。

<div align="center">
  <img src="/assets/weixin.png" alt="微信" width="300" style="display: inline-block" />
  <img src="/assets/zhifubao.png" alt="支付宝" width="300" style="display: inline-block; margin-left: 2em"/>
</div>

<Home />
