# [EasyTier Manager](https://github.com/xlc520/easytier-manager)

## Download

GitHub Releases: [https://github.com/xlc520/easytier-manager/releases](https://github.com/xlc520/easytier-manager/releases)

#### Package Descriptions

- `exe`: Installer, must be installed before use
- `zip`: Portable, extract and use directly
- `easytier-manager-win_2.0.0.exe`: Universal installer for 64-bit and 32-bit Windows systems
- `easytier-manager-win-x64_2.0.0.exe`: 64-bit Windows system installer
- `easytier-manager-win-ia32_2.0.0.exe`: 32-bit Windows system installer
- `easytier-manager-win7-x64_2.0.0.exe`: 64-bit Windows 7 system installer
- `tar.gz` `deb` `rpm` `AppImage`: For Linux systems (not yet tested)

## Tutorial

- **1. [Important] Settings page: Check if the kernel exists, if not, download the kernel, then install it, and check again if the kernel exists** (only needed for first use, subsequent confirmations can run directly)

![manage-step1](/assets/manage-step1.png)

![manage-step2](/assets/manage-step2.png)

- 2. Configuration page: Create new network configurations, providing both direct code editing and form filling methods

![manage-step3](/assets/manage-step3.png)

![manage-step4](/assets/manage-step4.png)

![manage-step5](/assets/manage-step5.png)

![manage-step6](/assets/manage-step6.png)

- 3. Workspace (home page): Run specified configurations

![manage-step7](/assets/manage-step7.png)

- 4. [Optional] After successful networking, if the connection is fine, you can exit the manager. The core program will run in the background (right-click the tray icon to "Exit")

- 5. [Optional] On the configuration page, install specified configurations as system services

![manage-step8](/assets/manage-step8.png)

![manage-step9](/assets/manage-step9.png)

## Introduction

EasyTier Manager integrates Vue3 + Vite5 + Electron33 + Element-Plus. It is a free and open-source network manager based on `element-plus`. It is developed using the latest mainstream technologies such as `vue3`, `vite5`, `TypeScript`, etc.

## Features

- **Memory Usage**: After successful networking, you can directly exit the manager without affecting the network, so it won't occupy memory or cause memory leaks due to various issues
- **Multi-Configuration Startup**: Supports running and managing multiple network configurations
- **System Service Installation**: One-click installation as a system service with visual interface, auto-start on boot
- **Visual Configuration Addition**: Provides form-based visual addition of network configurations, simple and convenient
- **Visual Log Viewing**: View logs of current network configurations on the home page
- **One-Click Download and Install**: One-click download and installation of the kernel with built-in accelerated sources, no manual download required
- **Latest Tech Stack**: Developed using cutting-edge frontend technologies like Electron33/Vue3/vite5
- **TypeScript**: Application-level JavaScript language
- **Internationalization**: Built-in comprehensive internationalization solution

## Bug Reports & Suggestions

> Tending towards stability, may not develop new features, only fix vulnerabilities and such

You can check [TODO](https://github.com/xlc520/easytier-manager/blob/master/TODO.md) to see if it's already recorded to avoid duplication

[Submit Bug | Feature Request](https://github.com/xlc520/easytier-manager/issues/new/choose)

## System Support

Theoretically supports Windows 11, Windows 10, and Windows 7.
