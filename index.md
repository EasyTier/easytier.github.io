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
    - theme: alt
      text: 下载
      link: /guide/download
    - theme: alt
      text: Web 控制台
      link: https://easytier.cn/web
    - theme: sponsor
      text: 💚 赞助
      link: /#sponsor

features:
  - title: 去中心化
    details: 节点平等独立，无需中心化服务。<br>不区分客户端/服务端。
    link: /guide/network/decentralized-networking
  - title: 易用
    details: 网页、客户端、命令行多方式操作<br>支持一键组网
    link: /guide/network/web-console
  - title: 跨平台
    details: 支持 Win / MacOS / Linux / FreeBSD / Android<br>兼容 X86 / ARM / MIPS 架构
    link: /guide/download
  - title: 安全
    details: AES-GCM 或 WireGuard 加密<br>防止中间人攻击
    link: /
  - title: 高效 NAT 穿透
    details: 支持 UDP、IPv6 穿透<br>可打通 NAT4-NAT4 网络
    link: /
  - title: 子网代理
    details: 节点可共享子网供其他节点访问。
    link: /guide/network/point-to-networking
  - title: 智能路由
    details: 延迟优先，自动选路<br>提供最佳网络体验
    link: /guide/network/configurations
  - title: 高性能
    details: 全链路零拷贝<br>支持 TCP / UDP / WSS / WG 等协议
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
- Telegram：https://t.me/easytier
- Discord：https://discord.gg/yRCkdu8brx

## 鸣谢

<div style="display: flex; justify-content: center; align-items: center; gap: 2rem; flex-wrap: wrap;">
  <a href="https://langlangy.cn/?i26c5a5" target="_blank" rel="noopener" style="text-decoration: none; color: inherit; border: 1px solid var(--vp-c-divider); border-radius: 28px; padding: 1.5rem; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1rem; text-align: center; width: 250px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); background-color: rgba(215, 230, 240, 0.81);">
    <img src="https://langlangy.cn/home/img/logo.png" alt="浪浪云" style="height: 60px;">
    <span style="font-size: 0.95rem; color: black;">赞助的公共服务器</span>
  </a>

  <a href="https://www.rainyun.com/NjM0NzQ1_" target="_blank" rel="noopener" style="text-decoration: none; color: inherit; border: 1px solid var(--vp-c-divider); border-radius: 28px; padding: 1.5rem; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1rem; text-align: center; width: 250px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); background-color: rgba(215, 230, 240, 0.81);">
    <img src="https://app.rainyun.com/img/logo.d193755d.png" alt="雨云" style="height: 60px;">
    <span style="font-size: 0.95rem; color: black;">赞助的公共服务器</span>
  </a>
</div>

## 赞助 {#sponsor}

如果您觉得 EasyTier 对您有所帮助，欢迎赞助我们。

软件的开发和维护需要大量的时间和精力，您的赞助将帮助我们更好地维护和改进 EasyTier。

<div style="display: flex; justify-content: center; gap: 2rem; margin-top: 1.5rem; flex-wrap: wrap;">
  <div style="text-align: center;">
    <img src="/assets/wechat.png" alt="微信" style="width: 250px; max-width: 100%; border-radius: 28px;" />
  </div>
  <div style="text-align: center;">
    <img src="/assets/alipay.png" alt="支付宝" style="width: 250px; max-width: 100%; border-radius: 28px;" />
  </div>
</div>

<Home />
