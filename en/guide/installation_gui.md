# Installation (Graphical Interface) {#installation_gui}

## EasyTier GUI

Please note that EasyTier GUI relies on WebView, and the following common issues may occur:

1. On lower versions of Windows, WebView download may fail due to domestic network environment issues, making it impossible to download WebView components. Please manually install [WebView2](https://developer.microsoft.com/en-US/microsoft-edge/webview2/) or [Edge](https://www.microsoft.com/en-us/edge) browser.

2. On lower versions of Android, styles may be lost, and display may be chaotic. Please manually update the WebView component in the app store.

## Third-party Graphical Interfaces

### [EasyTier Game (Windows)](/guide/gui/easytier-game)

EasyTierGame is a game networking launcher developed using nuxt3, typescript, rust, and tauri. It features a simple interface and includes the latest version of the EasyTier core. When playing games, it provides the most comfortable experience both psychologically and in usage, while supporting custom configuration file launches to meet various needs.

---

### [EasyTier Manager (Windows)](/guide/gui/easytier-manager)

EasyTier Manager is a desktop application used to manage the EasyTier core. It provides visualized operations for adding, modifying, and deleting EasyTier configuration files.

- Supports one-click start and stop of group networks through the interface.
- Supports modification of all existing core parameters, with all new and modified operations supporting both interface-based forms and text editor operations.
- Supports viewing current running logs through the interface.
- Supports one-click download of any version of the core (Note: Many parameters and features of older versions are not supported).

---

### [Astral Game (Windows / Android / Linux)](/guide/gui/astral-game)

AstralGame is a cross-platform network application based on EasyTier, providing simple and easy-to-use P2P network connections and VPN services. Built with Flutter, its modern interface allows users to easily create and manage virtual networks.

---

### [luci-app-easytier (OpenWrt)](https://github.com/EasyTier/luci-app-easytier)

EasyTier's OpenWrt plugin provides methods for installing and configuring the EasyTier core on OpenWrt routers. The plugin supports completing the installation, configuration, and management of the EasyTier core within OpenWrt's LuCI interface. Users can conveniently configure the core, view running logs, restart the core, and perform other operations through the LuCI interface.

---

### [EasyTier HarmonyOS Edition (HarmonyOS 5 – Latest)](https://appgallery.huawei.com/app/detail?id=top.frankhan.easytier&channelId=SHARE&source=appshare)

EasyTier HarmonyOS Edition is a native HarmonyOS app developed as a secondary project based on EasyTier. It uses ArkTS to implement a modern UI, provides VPN services and configuration management, allows quick importing of community-shared nodes, and supports new HarmonyOS features such as Tap-to-Share.

Note that in the future, compatibility with HarmonyOS 5 (API18-) may be dropped in order to reduce compatibility code and keep the best possible compatibility with HarmonyOS 6 (API20+) and above.

<div align="left">
  <a href="https://appgallery.huawei.com/app/detail?id=top.frankhan.easytier&channelId=SHARE&source=appshare" target="_blank">
	<img  src="/assets/HomoTier_AppGallery.png"  width="204" height="51"  />
  </a>
</div>

---

### [Terracotta | TaoWa Multiplayer (Windows / Android / Linux)](https://github.com/burningtnt/Terracotta)

Terracotta | TaoWa Multiplayer provides Minecraft players with an out-of-the-box multiplayer experience. TaoWa Multiplayer is developed based on EasyTier and includes extensive optimizations specifically for MC, aiming to lower the barrier to entry as much as possible.

It has now been integrated into the HMCL launcher—you can try the program features in the latest version, or download this program to experience it directly.

---

### [EasyTier iOS (iOS 16.0+)](https://github.com/EasyTier/EasyTier-iOS)

The iOS client for EasyTier, offering a user-friendly interface for connecting to the EasyTier network on iOS devices, and implementing system-level VPN integration using the Network Extension framework.

[TestFlight Invitation](https://testflight.apple.com/join/YWnDyJfM) (free, preview version, limited slots, periodically cleaned up)

---

### [QtEasyTier (Windows)](/guide/gui/qteasytier)

A powerful and user-friendly EasyTier frontend developed with Qt Widgets. Built with pure Qt C++ and native rendering, it is efficient and does not rely on WebView or Chromium.

QtEasyTier simplifies setup with one-click import/export of configurations and supports running multiple networks simultaneously. Its main interface provides a clear overview of all network statuses.

  - Project: [https://gitee.com/viagrahuang/qt-easy-tier](https://gitee.com/viagrahuang/qt-easy-tier)
  - Demo Video: [https://www.bilibili.com/video/BV1ST6nBzE1k](https://www.bilibili.com/video/BV1ST6nBzE1k)
