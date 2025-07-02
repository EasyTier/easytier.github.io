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

### [HomoTier ( HarmonyOS 5.0 )](https://appgallery.huawei.com/app/detail?id=top.frankhan.et4hm&channelId=SHARE)

  HomoTier 是一个基于 EasyTier 进行二次开发的鸿蒙原生应用，使用 ArkTS 实现现代化UI，提供 VPN 服务以及基本的配置管理，并依托于鸿蒙分布式设计能够跨设备共享配置。
  
  注意： 由于政策问题，您需要切换到外区应用商店才能够下载HomoTier，如使用ClashBox的全局模式，或者切换外区账号，来切换到外区应用商店。
  <div align="left">
  	<a href="https://appgallery.huawei.com/app/detail?id=top.frankhan.et4hm&channelId=SHARE" target="_blank">
      	<img  src="/assets/HomoTier_AppGallery.png"  width="204" height="51"  />
  	</a>
  </div>
