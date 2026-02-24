# 一键注册服务

EasyTier Cli 提供注册服务命令，可以在大部分系统（Windows, Linux, macOS）上一键将 EasyTier 注册为系统服务。注册后，EasyTier 会在系统启动时自动启动，并在后台运行。

使用该命令需要 `easytier-core` 和 `easytier-cli` 在同一目录下。进入该目录后，运行以下命令：

::: code-group

```sh [Linux / macOS]
# 假设 EasyTier 的启动参数为 -w abc
sudo ./easytier-cli service install -w abc
```

```powershell [Windows]
# 假设 EasyTier 的启动参数为 -w abc
.\easytier-cli.exe service install -w abc
```
:::

`install` 后的部分会作为 `easytier-core` 的启动参数。

完整示例:
::: code-group

```sh [Linux / macOS]
# 假设 EasyTier 的启动参数为 -w abc
sudo ./easytier-cli service install \
    --description "自定义服务描述" \    # 可选，默认使用包描述
    --display-name "显示名称" \    # 可选，服务显示名称
    --disable-autostart \    # 可选，禁用开机自启（默认启用）
    --core-path /path/to/easytier-core \    # 可选，指定二进制路径
    --service-work-dir /工作目录路径 \    # 可选，指定工作目录
    -- -w abc    # 可选，传递给 easytier-core 的参数 
```

```powershell [Windows]
# 假设 EasyTier 的启动参数为 -w abc
.\easytier-cli.exe service install `
    --description "自定义服务描述" `    # 可选，默认使用包描述
    --display-name "显示名称" `    # 可选，服务显示名称
    --disable-autostart `    # 可选，禁用开机自启（默认启用）
    --core-path /path/to/easytier-core `    # 可选，指定二进制路径
    --service-work-dir /工作目录路径 `    # 可选，指定工作目录
    -- -w abc    # 可选，传递给 easytier-core 的参数 
```
:::

服务安装成功后，可以使用以下命令对服务进行管理：

- 启动服务：

  ::: code-group

  ```sh [Linux / macOS]
  sudo ./easytier-cli service start
  ```

  ```powershell [Windows]
  .\easytier-cli.exe service start
  ```

  :::

- 停止服务：

  ::: code-group

  ```sh [Linux / macOS]
  sudo ./easytier-cli service stop
  ```

  ```powershell [Windows]
  .\easytier-cli.exe service stop
  ```

  :::

- 查看状态：

  ::: code-group

  ```sh [Linux / macOS]
  sudo ./easytier-cli service status
  ```

  ```powershell [Windows]
  .\easytier-cli.exe service status
  ```

  :::

- 卸载服务：

  ::: code-group

  ```sh [Linux / macOS]
  sudo ./easytier-cli service uninstall
  ```

  ```powershell [Windows]
  .\easytier-cli.exe service uninstall
  ```

  :::
