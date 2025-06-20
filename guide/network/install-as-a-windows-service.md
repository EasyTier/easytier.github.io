# 安装为 Windows 服务

> 感谢 北辰℃ 提供的教程，以及由 dawn-lc 提供的一键安装/卸载脚本

在 Windows 系统中，将某些应用程序安装为服务可以使其在后台自动运行，无需用户手动干预，极大地提高了应用的运行稳定性和便捷性。

本教程将以使用 NSSM（Non-Sucking Service Manager）工具将 EasyTier 应用安装为 Windows 服务为例，详细介绍整个操作流程。

## 一、前期准备

**下载 EasyTier 应用**：

下载最新版本的 `Windows` 操作系统的 `命令行程序` 压缩包。

下载完成后，将该压缩包解压到本地目录，比如`D:\EasyTier`。

当前目录下应至少包含以下文件：
   - `easytier-core.exe` (核心程序)
   - `easytier-cli.exe` (命令行工具)
   - `Packet.dll` (运行库)
   - `wintun.dll` (运行库)

**下载 NSSM**：

打开浏览器，访问 NSSM 官网 [https://nssm.cc/](https://nssm.cc/download)。

在官网页面中找到适用于你系统的版本（通常是最新版本），点击下载链接将其下载到本地。

下载完成后，找到对应您设备架构的版本（如：`win64`），将其中的`nssm.exe`解压到`EasyTier`所在的本地目录。


**下载 安装/卸载 脚本**：

在当前目录下启动PowerShell并执行以下命令:

`iwr "https://github.com/EasyTier/EasyTier/raw/refs/heads/main/script/install.cmd" -OutFile "install.cmd"`

`iwr "https://github.com/EasyTier/EasyTier/raw/refs/heads/main/script/uninstall.cmd" -OutFile "uninstall.cmd"`

## 二、准备工作

1. 确保当前目录下包含以下文件：
   - `easytier-core.exe` (核心程序)
   - `easytier-cli.exe` (命令行工具)
   - `nssm.exe` (服务管理工具)
   - `Packet.dll` (运行库)
   - `wintun.dll` (运行库)
   - `install.cmd` (安装脚本)
   - `uninstall.cmd` (卸载脚本)

2. 将整个文件夹放在固定位置。

## 三、安装服务

1. 运行`install.cmd`
2. 按照提示输入配置信息。
4. 安装完成后会自动启动服务。

## 四、卸载服务

1. 运行`uninstall.cmd`
2. 脚本会自动停止并删除服务。

## 五、注意事项

1. 安装后不要移动程序文件位置

## 六、常见问题

**Q: 如何修改服务配置？**

A: 先卸载服务，然后重新安装
