# 安装为 Windows 服务

将 EasyTier 安装为 Windows 服务后，它可以在后台自动运行，并支持随系统启动，适合长期在线或无人值守的场景。

当前推荐直接使用官方 `install.cmd` 脚本完成安装、更新和卸载，无需再手动准备 NSSM。

> 感谢 北辰℃ 提供的教程，以及 dawn-lc 提供的一键安装/卸载脚本。

## 快速开始

推荐直接在希望安装 EasyTier 的目录中打开 PowerShell，然后执行：

```PowerShell
iwr "https://raw.githubusercontent.com/EasyTier/EasyTier/main/script/install.cmd" -OutFile "install.cmd"; .\install.cmd
```

如果无法访问 GitHub，可以使用镜像代理：

```PowerShell
iwr "https://ghfast.top/https://raw.githubusercontent.com/EasyTier/EasyTier/main/script/install.cmd" -OutFile "install.cmd"; .\install.cmd -ughp
```

脚本会根据提示完成配置，并在安装成功后自动启动服务。

## 安装流程

1. 在希望安装 EasyTier 的目录中打开 PowerShell。
2. 运行安装脚本：

   ```PowerShell
   .\install.cmd
   ```

3. 根据提示选择配置模式，并填写所需参数。
4. 安装完成后，脚本会自动创建并启动 Windows 服务。

## 配置模式说明

- `File`：使用本地配置文件，适合已经准备好配置文件的场景。
- `Remote`：使用远程服务器集中管理，适合统一维护多台设备。
- `CLI`：直接通过命令行传参启动，适合临时调试或自定义参数较多的场景。

## 常用命令

- 安装服务：

  ```PowerShell
  .\install.cmd
  ```

- 卸载服务：

  ```PowerShell
  .\install.cmd -Uninstall
  ```

- 更新 EasyTier：

  ```PowerShell
  .\install.cmd -Update
  ```

## 参数参考

### 基础参数

- `-H` / `-?` / `-Help`：显示帮助信息并退出。

### 服务操作

- `-U` / `-Update`：更新 EasyTier 到最新版本。
- `-X` / `-Uninstall`：卸载 EasyTier 服务。

### 下载代理

- `-UGHP` / `-UseGitHubProxy`：使用 GitHub 镜像代理下载，默认值为 `$false`。
- `-GHP` / `-GitHubProxy <代理地址>`：指定 GitHub 镜像代理地址，默认值为 `https://ghfast.top/`。
- `-UP` / `-UseProxy`：使用自定义代理，默认值为 `$false`。
- `-P` / `-Proxy <代理地址>`：指定自定义代理地址，默认值为 `http://127.0.0.1:7890`。

### 配置与服务名

- `-C` / `-ConfigType <类型>`：指定配置模式，可选值为 `File`、`Remote`、`CLI`。
- `-N` / `-ServiceName <名称>`：指定安装后的服务名，默认值为 `EasyTierService`。
- `<其他参数...>`：当使用 `CLI` 模式时，会作为额外参数传递给 EasyTier。

## 常见问题

**Q: 如何修改服务配置？**

A: 先执行 `.\install.cmd -Uninstall` 卸载服务，再使用新的配置重新安装。

**Q: 为什么安装后不能移动目录？**

A: Windows 服务会记录 EasyTier 可执行文件和脚本所在路径，移动目录后服务可能无法正常启动。
