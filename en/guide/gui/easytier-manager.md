# [EasyTier Manager](https://github.com/xlc520/easytier-manager)

## Download

Github
Releases: [https://github.com/xlc520/easytier-manager/releases](https://github.com/xlc520/easytier-manager/releases)

#### Package Descriptions

- `exe`: Installer, needs to be installed before use
- `zip`: No installation required, just unzip to use
- `easytier-manager-win_2.0.0.exe`: Universal installer for 64-bit and 32-bit Windows systems
- `easytier-manager-win-x64_2.0.0.exe`: Installer for 64-bit Windows systems
- `easytier-manager-win-ia32_2.0.0.exe`: Installer for 32-bit Windows systems
- `easytier-manager-win7-x64_2.0.0.exe`: Installer for 64-bit Windows 7 systems
- `tar.gz` `deb` `rpm` `AppImage`: For use on Linux systems (untested)

## Tutorial

- **1. [Important] On the settings page, check if the kernel exists. If not, download and install the kernel, then check again** (only needed for the first use, subsequent uses can run directly if the kernel exists)

![manage-step1](/assets/manage-step1.png)

![manage-step2](/assets/manage-step2.png)

- 2. On the configuration page, create a new network configuration, either by editing the code directly or by filling out a form

![manage-step3](/assets/manage-step3.png)

![manage-step4](/assets/manage-step4.png)

![manage-step5](/assets/manage-step5.png)

![manage-step6](/assets/manage-step6.png)

- 3. On the workspace (home page), run the specified configuration

![manage-step7](/assets/manage-step7.png)

- 4. [Optional] After the network is successfully configured, you can exit the manager if there are no connection issues. The core program will run in the background (right-click the tray icon and select `exit`)

- 5. [Optional] On the configuration page, install the specified configuration as a system service

![manage-step8](/assets/manage-step8.png)

![manage-step9](/assets/manage-step9.png)

## Introduction

EasyTier Manager integrates Vue3 + Vite5 + Electron33 + Element-Plus. It is a free and open-source network management tool based on `element-plus`. It is developed using the latest technologies such as `vue3`, `vite5`, and `TypeScript`.

## Features

- **Memory Usage**: After the network is successfully configured, you can exit the manager without affecting the network, so it won't occupy memory or cause memory leaks
- **Multiple Configurations**: Supports running and managing multiple network configurations
- **System Service Installation**: One-click installation as a system service with automatic startup on boot
- **Visual Configuration**: Provides a form for visual network configuration, making it simple and convenient
- **Visual Log Viewing**: View logs of the current network configuration on the home page
- **One-Click Download and Install**: One-click download and install of the kernel with built-in accelerated sources, no manual download required
- **Latest Tech Stack**: Developed using cutting-edge technologies like Electron33/Vue3/vite5
- **TypeScript**: A language for application-scale JavaScript
- **Internationalization**: Built-in comprehensive internationalization solution

## Bug Reports & Suggestions

> The project is stable and may not have new features developed, only bug fixes

Check [TODO](https://github.com/xlc520/easytier-manager/blob/master/TODO.md) to see if there are existing records to avoid duplication

[BUG Report | Feature Suggestion](https://github.com/xlc520/easytier-manager/issues/new/choose)

## System Support

Theoretically supports Windows 11, Windows 10, Windows 7
