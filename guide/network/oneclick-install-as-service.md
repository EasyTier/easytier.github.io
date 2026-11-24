# 一键注册服务

EasyTier Cli 提供注册服务命令，可以在大部分系统上一键将 EasyTier 注册为系统服务。注册后，EasyTier 会在系统启动时自动启动，并在后台运行。

使用该命令需要 `easytier-core` 和 `easytier-cli` 在同一目录下。进入该目录后，运行以下命令：

::: code-group

```sh [Linux]
# 假设 EasyTier 的启动参数为 -w abc
sudo ./easytier-cli service install --core-args -w abc
```

```powershell [Windows]
# 假设 EasyTier 的启动参数为 -w abc
.\easytier-cli.exe service install --core-args -w abc
```
:::

需要向 `easytier-core` 传递启动参数时，将 `--core-args` 放在所有服务选项之后。它后面的参数都会传给 `easytier-core`。

以下示例自定义服务描述、显示名称、程序路径和工作目录，并禁用开机自启。请将路径替换为实际路径。

::: code-group

```sh [Linux]
# 假设 EasyTier 的启动参数为 -w abc
sudo ./easytier-cli service install \
    --description "自定义服务描述" \
    --display-name "显示名称" \
    --disable-autostart true \
    --core-path /path/to/easytier-core \
    --service-work-dir /path/to/workdir \
    --core-args -w abc
```

```powershell [Windows]
# 假设 EasyTier 的启动参数为 -w abc
.\easytier-cli.exe service install `
    --description "自定义服务描述" `
    --display-name "显示名称" `
    --disable-autostart true `
    --core-path "C:\EasyTier\easytier-core.exe" `
    --service-work-dir "C:\EasyTier" `
    --core-args -w abc
```
:::

服务安装成功后，可以使用以下命令对服务进行管理：

- 启动服务：

  ::: code-group

  ```sh [Linux]
  sudo ./easytier-cli service start
  ```

  ```powershell [Windows]
  .\easytier-cli.exe service start
  ```

  :::

- 停止服务：

  ::: code-group

  ```sh [Linux]
  sudo ./easytier-cli service stop
  ```

  ```powershell [Windows]
  .\easytier-cli.exe service stop
  ```

  :::

- 查看状态：

  ::: code-group

  ```sh [Linux]
  sudo ./easytier-cli service status
  ```

  ```powershell [Windows]
  .\easytier-cli.exe service status
  ```

  :::

- 卸载服务：

  ::: code-group

  ```sh [Linux]
  sudo ./easytier-cli service uninstall
  ```

  ```powershell [Windows]
  .\easytier-cli.exe service uninstall
  ```

  :::
