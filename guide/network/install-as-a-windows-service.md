# 安装为 Windows 服务

**一键安装指令**

```PowerShell
iwr "https://raw.githubusercontent.com/EasyTier/EasyTier/main/script/install.cmd" -OutFile "install.cmd"; .\install.cmd
```

无法访问GitHub请使用以下命令
```PowerShell
iwr "https://ghfast.top/https://raw.githubusercontent.com/EasyTier/EasyTier/main/script/install.cmd" -OutFile "install.cmd"; .\install.cmd -ughp
```

【可用参数】

    -H / -? / -Help
        显示此帮助信息并退出。

    -U / -Update
        更新 EasyTier 到最新版本

    -X / -Uninstall
        卸载 EasyTier 服务

    -UGHP / -UseGitHubProxy
        使用 GitHub 镜像代理下载 (默认: $false)

    -GHP / -GitHubProxy <代理地址>
        指定 GitHub 镜像代理地址 (默认: https://ghfast.top/)

    -UP / -UseProxy
        使用自定义代理 (默认: $false)

    -P / -Proxy <代理地址>
        指定自定义代理地址 (默认: http://127.0.0.1:7890)

    -C / -ConfigType <类型>
        指定配置模式，可选值: 
        * File   本地配置文件
        * Remote 远程服务器集中管理
        * CLI    使用命令行直接传参

    -N / -ServiceName <名称>
        指定安装的服务名称 (默认: EasyTierService)

    <其他参数...>
        当选择 CLI 模式时，用于传递自定义参数


以下为原教程

> 感谢 北辰℃ 提供的教程，以及由 dawn-lc 提供的一键安装/卸载脚本

在 Windows 系统中，将某些应用程序安装为服务可以使其在后台自动运行，无需用户手动干预，极大地提高了应用的运行稳定性和便捷性。

## 一、前期准备

**下载 EasyTier CLI**：

下载最新版本的 `Windows` 操作系统的 `命令行程序` 压缩包。

下载完成后，将该压缩包解压到本地目录，比如`D:\EasyTier`。

当前目录下应至少包含以下文件：
   - `easytier-core.exe` (核心程序)
   - `easytier-cli.exe` (命令行工具)
   - `Packet.dll` (运行库)
   - `wintun.dll` (运行库)

**下载 安装/卸载 脚本**：

在当前目录下启动PowerShell并执行以下命令:

`iwr "https://github.com/EasyTier/EasyTier/raw/refs/heads/main/script/install.cmd" -OutFile "install.cmd"`

`iwr "https://github.com/EasyTier/EasyTier/raw/refs/heads/main/script/uninstall.cmd" -OutFile "uninstall.cmd"`

## 二、准备工作

1. 确保当前目录下包含以下文件：
   - `easytier-core.exe` (核心程序)
   - `easytier-cli.exe` (命令行工具)
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
