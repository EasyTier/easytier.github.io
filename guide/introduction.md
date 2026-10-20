# EasyTier 简介

EasyTier 是一款简单、安全、去中心化的内网穿透和异地组网工具，适合远程办公、异地访问、游戏加速等多种场景。无需公网 IP，无需复杂配置，轻松实现不同地点设备间的安全互联。

软件即可通过命令行使用，也可以通过图形界面操作。下载后可直接使用，无其他任何依赖。

- [🛠️安装 CLI 页面](./installation) 可查看安装命令行工具的方法。
- [🖥️安装 GUI 页面](./installation_gui) 可查看安装图形界面工具的方法。
- [🔌嵌入式使用页面](./embed/index) 可以查看 ESP32 组件的使用方法
- [⬇️下载页面](./download) 可获取最新版本 EasyTier 的下载链接。


## 适用场景

- **远程办公**：让公司、家中和外地的电脑像在同一局域网一样互通。
- **异地访问**：随时随地安全访问家中 NAS、服务器或其他设备。
- **游戏加速**：组建虚拟局域网，畅玩联机游戏。
- **物联网组网**：让分布在不同地点的设备安全互联。

## 核心特点

- **去中心化**：无需依赖中心服务器，所有节点平等独立，都可以参与转发和组网。
- **安全加密**：支持 WireGuard 和 AES-GCM 加密，保障数据安全。
- **跨平台**：支持 MacOS、Linux、Windows、FreeBSD、Android，未来将支持 iOS。
- **无公网 IP 组网**：可通过共享公网节点组网，详见[配置指南](/guide/network/quick-networking)。
- **NAT 穿透**：支持 UDP NAT 穿透，复杂网络环境下也能稳定连接。
- **智能路由**：自动选择最佳链路，降低延迟，提高吞吐量。
- **高可用性**：多路径支持，自动切换健康链路，提升稳定性。

## 高级特性

- **KCP / QUIC 代理**: 支持将 TCP 流量转为 KCP / QUIC 协议，提升高 UDP 丢包环境下的传输延迟和稳定性。
- **非特权模式**：支持在非特权用户下运行，避免需要 root 权限。（仅可作为被访问端）
- **WireGuard 接入**: 支持 WireGuard 客户端接入 EasyTier 网络。


## 图形界面（GUI）

EasyTier 提供简单易用的图形界面，适合新手快速上手。

<img src="/assets/gui-screenshot.png" alt="EasyTier GUI Screenshot" width="400">


## [Espressif 组件](./embed/index)

**EasyTier-ESP** 是一个基于 EasyTier 组网协议的 C++ 轻量级实现，可在 ESP-IDF 中作为组件导入。

:::warning
EasyTier-ESP 现在为预览版本，仅实现了部分基础功能，接口在今后可能出现变更，且可能存在未知问题，请慎用于生产环境。
:::

#### 通过 ESP-IDF 组件注册表导入

在应用的 `main/idf_component.yml` 中加入依赖：

```yaml
dependencies:
  myqfeng/easytier-esp: "^0.0.1"
  idf: ">=6.1"
```

或者用命令：

```bash
idf.py add-dependency "myqfeng/easytier-esp^0.0.1"
idf.py build
```

构建时组件会被下载到工程的 `managed_components/` 下。
