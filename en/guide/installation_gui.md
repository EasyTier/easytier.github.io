# Installation (Graphical Interface) {#installation_gui}

## EasyTier GUI

Visit the [⬇️ Download Page](./download) to download the graphical interface program suitable for your operating system and hardware architecture, and install it directly.

After successful installation, you can refer to the [Public Server Group Network](/guide/gui/basic) documentation to understand how to use the graphical interface tools.

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
