# [EasyTier 管理器](https://github.com/xlc520/easytier-manager)

## 下载

Github
Releases： [https://github.com/xlc520/easytier-manager/releases](https://github.com/xlc520/easytier-manager/releases)

#### 各个包说明

- `exe`：安装程序，安装后才可使用
- `zip`：免安装，解压即可使用
- `easytier-manager-win_2.0.0.exe`：64、32位 Windows 系统通用安装包
- `easytier-manager-win-x64_2.0.0.exe`：64位 Windows 系统安装包
- `easytier-manager-win-ia32_2.0.0.exe`：32位 Windows 系统安装包
- `easytier-manager-win7-x64_2.0.0.exe`: 64位 Windows 7 系统安装包
- `tar.gz` `deb` `rpm` `AppImage`：Linux系统上使用(尚未测试)

## 使用教程

- **1.【重要】设置页 检测内核是否存在，若不存在则下载内核，然后安装，再次检测内核是否存在**（仅首次使用需要，后续确认存在即可直接运行）

![manage-step1](/assets/manage-step1.png)

![manage-step2](/assets/manage-step2.png)

- 2.配置页新建组网配置，提供直接编辑代码的方式，和表单填写

![manage-step3](/assets/manage-step3.png)

![manage-step4](/assets/manage-step4.png)

![manage-step5](/assets/manage-step5.png)

![manage-step6](/assets/manage-step6.png)

- 3.工作台（首页）运行指定配置

![manage-step7](/assets/manage-step7.png)

- 4.[可选] 组网成功后，连接没有问题可退出管理器,核心程序会在后台运行(托盘图标右键`退出`)

- 5.[可选] 在配置页面，安装指定配置为系统服务

![manage-step8](/assets/manage-step8.png)

![manage-step9](/assets/manage-step9.png)

## 介绍

EasyTier 管理器 整合Vue3 + Vite5 + Electron33 + Element-Plus， 是一个基于 `element-plus`
免费开源的组网管理器。使用了最新的`vue3`，`vite5`，`TypeScript` 等主流技术开发。

## 特性

- **内存占用**：组网成功后，可以直接退出管理器，不会影响组网，所以不会占用内存，不会因各种问题内存泄漏
- **多配置启动**：支持多个组网配置运行、管理
- **系统服务安装**：界面化一键安装为系统服务，开机自动启动
- **可视化添加配置**：提供表单可视化添加组网配置，简单方便
- **可视化日志查看**：首页可查看当前组网配置的日志
- **一键下载安装**：一键下载安装内核，内置加速源，无需手动下载，下载完一键安装
- **最新技术栈**：使用 Electron33/Vue3/vite5 等前端前沿技术开发
- **TypeScript**: 应用程序级 JavaScript 的语言
- **国际化**：内置完善的国际化方案

## Bug 反馈 & 建议

> 趋于稳定可能不会在开发新功能，只会修复漏洞之类的

可在 [TODO](https://github.com/xlc520/easytier-manager/blob/master/TODO.md) 查看是否已有记录，以免重复

[BUG 提交 | 需求建议](https://github.com/xlc520/easytier-manager/issues/new/choose)

## 系统支持

理论支持Windows 11 、Windows 10 、 Windows 7 
