---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: EasyTier
  text: 由 Rust 和 Tokio 驱动
  tagline: 一个简单、安全、去中心化的内网穿透 SD-WAN 异地组网方案
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/introduction
    - theme: alt
      text: 在 Github 上查看
      link: https://github.com/EasyTier/EasyTier
    - theme: alt
      text: 协助改进或翻译文档
      link: https://github.com/EasyTier/easytier.github.io
    - theme: alt
      text: 参与开发
      link: https://github.com/EasyTier/EasyTier/issues

features:
  - title: 去中心化
    details: 无需依赖中心化服务，节点平等且独立。
  - title: 安全
    details: 支持利用 WireGuard 加密通信，也支持 AES-GCM 加密保护中转流量。
  - title: 高性能
    details: 全链路零拷贝，性能与主流组网软件相当。
  - title: 无公网 IP 组网
    details: 支持利用共享的公网节点组网，可参考配置指南
  - title: NAT 穿透
    details: 支持基于 UDP 的 NAT 穿透，即使在复杂的网络环境下也能建立稳定的连接。
  - title: 子网代理（点对网）
    details: 节点可以将其可访问的网段转发到虚拟网，允许其他节点通过该节点访问这些子网。
  - title: 智能路由
    details: 根据流量智能选择链路，减少延迟，提高吞吐量。
  - title: 跨平台
    details: |
      支持 MacOS/Linux/Windows/FreeBSD/Android 等系统。未来将支持 IOS。
      </br>
      支持 MIPS、ARM 等硬件架构。
      </br>
      可执行文件静态链接，部署简单。
  - title: GUI 支持
    details: 可通过图形界面使用，方便快捷。
---

## 相关链接

- [社区文档](https://doc.oee.icu)：由社区志愿者维护，白话版 EasyTier 的使用指南，实时更新。
- [公共服务器节点列表](https://easytier.gd.nkbpal.cn/status/easytier)：由社区志愿者维护，提供公共服务器节点列表及状态查询。
- QQ 群：[949700262](https://qm.qq.com/q/wFoTUChqZW)
- Telegram：https://t.me/easytier

## 赞助

如果您觉得 EasyTier 对您有所帮助，欢迎赞助我们。

软件的开发和维护需要大量的时间和精力，您的赞助将帮助我们更好地维护和改进 EasyTier。

<div align="center">
  <img src="/assets/weixin.png" alt="微信" width="300" style="display: inline-block" />
  <img src="/assets/zhifubao.png" alt="支付宝" width="300" style="display: inline-block; margin-left: 2em"/>
</div>
