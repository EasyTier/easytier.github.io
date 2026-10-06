# 安装 (图形界面) {#installation_gui}

## EasyTier GUI

访问 [⬇️下载页面](./download) 下载适用于您操作系统和硬件架构的图形界面程序，并安装即可。

安装成功后可阅读 [公共服务器组网](/guide/gui/basic) 文档以了解图形界面工具的使用方法。

需要注意，EasyTier GUI 依赖 WebView，可能有以下常见问题：

1. 在低版本 Windows 上 WebView 下载失败，由于国内网络环境问题，可能无法下载 WebView 组件。请手动安装 [WebView2](https://developer.microsoft.com/zh-CN/microsoft-edge/webview2/) 或 [Edge](https://www.microsoft.com/zh-cn/edge) 浏览器。

2. 在低版本 Android 上样式丢失，显示混乱。请在应用商店中手动更新 WebView 组件。

## 第三方图形界面

### [EasyTier Game ( Windows )](/guide/gui/easytier-game)

  EasyTierGame 游戏联机启动器，由 nuxt3 typescript rust tauri 开发 具有简易的界面，附带最新版 easytier 内核，联机游玩的时候无论是心理上和使用上都能给予您最舒服的体验，同时支持自定义配置文件启动，满足各种需求

---

### [EasyTier Manager ( Windows )](/guide/gui/easytier-manager)

  EasyTier 管理器是用来管理 EasyTier 内核的一个桌面应用，用于可视化的新增、修改、删除 EasyTier 的配置文件。

  - 支持界面化的一键启动、停止组网
  - 支持修改所有内核已有参数，所有新增、修改操作都支持界面化表单操作和文本编辑器操作
  - 支持界面化查看当前运行日志
  - 支持一键下载任意版本的内核 （ 请注意，旧版本很多参数特性不支持 ）

---

### [Astral Game ( Windows / Android / Linux )](/guide/gui/astral-game)

  AstralGame 是一个基于 EasyTier 的跨平台网络应用，提供简单易用的 P2P 网络连接和 VPN 服务。通过 Flutter 构建的现代化界面，让用户能够轻松创建和管理虚拟网络。

---

### [luci-app-easytier ( OpenWrt )](https://github.com/EasyTier/luci-app-easytier)

  EasyTier 的 OpenWrt 插件，提供了在 OpenWrt 路由器上安装和配置 EasyTier 内核的方法。

  插件支持在 OpenWrt 的 LuCI 界面内完成 EasyTier 内核的安装、配置和管理。用户可以方便地通过 LuCI 界面进行配置内核、查看运行日志、重启内核等操作。

---

### [EasyTier鸿蒙版 ( HarmonyOS 5-最新 )](https://appgallery.huawei.com/app/detail?id=top.frankhan.easytier&channelId=SHARE&source=appshare)

  EasyTier鸿蒙版 是一个基于 EasyTier 进行二次开发的鸿蒙原生应用，使用 ArkTS 实现现代化UI，提供 VPN 服务以及配置管理，且能够快捷导入社区共享节点，并支持碰一碰等鸿蒙新特性。

  需要注意的是，在将来可能会放弃HarmonyOS 5(API18-)兼容，以便减少兼容代码，且尽可能保持HarmonyOS 6(API20+)及以上的兼容性。
  
  <div align="left">
  	<a href="https://appgallery.huawei.com/app/detail?id=top.frankhan.easytier&channelId=SHARE&source=appshare" target="_blank">
      	<img  src="/assets/HomoTier_AppGallery.png"  width="204" height="51"  />
  	</a>
  </div>

---

### [Terracotta | 陶瓦联机 ( Windows / Android / Linux )](https://github.com/burningtnt/Terracotta)

  Terracotta | 陶瓦联机时为 Minecraft 玩家提供开箱即用的联机功能。陶瓦联机基于 EasyTier 开发，针对 MC 做出了大量优化，尽量降低了操作门槛。

  目前已接入 HMCL 启动器，可在最新版本体验程序功能，也可下载本程序体验。

---

### [EasyTier iOS (iOS 16.0+/macOS 13.0+)](https://github.com/EasyTier/EasyTier-iOS)

  EasyTier 的 SwiftUI 客户端，提供友好的界面以在 iOS/macOS 设备上连接 EasyTier 网络，并使用 Network Extension 框架实现系统级 VPN 集成。

  通过 App Store 下载（仅在外区上架）：

  <a href="https://apps.apple.com/app/easytier/id6788989728">
    <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="在 App Store 下载" height="40">
  </a>

---

### [QtEasyTier 组网工具 (Windows / Linux)](/guide/gui/qteasytier)

 QtEasyTier 是一个基于 Qt 6 / C++ 的 EasyTier 桌面客户端。它提供了直观的图形界面，帮助用户轻松配置和管理虚拟网络，实现跨网络设备的安全通信。支持 Windows、Linux双平台。

  - 项目地址：[https://github.com/qteasytier/qt-easy-tier](https://github.com/qteasytier/qt-easy-tier)
  - 宣传视频：[https://www.bilibili.com/video/BV1ST6nBzE1k](https://www.bilibili.com/video/BV1ST6nBzE1k)

---

### [EasyTierCompose (Android)](https://github.com/ECSDevs/EasyTierCompose)

EasyTierCompose 是一个基于 Jetpack Compose 构建的现代化的采用 Material Design 3 Expressive 设计的 EasyTier Android 客户端。

  - 全量 EasyTier 配置支持
  - 全局配置文件 Override 功能
  - 从文件导入/导出 EasyTier 配置文件
  - 从网络拉取 EasyTier 配置文件
  - Root TUN 模式，在该模式下允许和其他 TUN 共存（如 Mishka 等 TUN 及透明代理软件、NekoBoxForAndroid 等使用 VpnService 路由流量的软件）
  - No TUN 模式，该模式下只提供 Socks / Wireguard 服务，具体取决于配置。
  - 精美的状态卡片
  - 多配置文件管理
  - 再节点页查看节点名称、IP等信息，点击查看详细信息
