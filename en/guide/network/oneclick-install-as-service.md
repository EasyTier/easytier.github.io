# One-Click Register Service

EasyTier Cli provides a service registration command that can register EasyTier as a system service with one click on most systems. After registration, EasyTier will automatically start when the system boots and run in the background.

Using this command requires `easytier-core` and `easytier-cli` to be in the same directory. After entering that directory, run the following command:

::: code-group

```sh [Linux]
# Assuming EasyTier's startup parameters are -w abc
sudo ./easytier-cli service install --core-args -w abc
```

```powershell [Windows]
# Assuming EasyTier's startup parameters are -w abc
.\easytier-cli.exe service install --core-args -w abc
```

:::

To pass startup arguments to `easytier-core`, put `--core-args` after all service options. Everything after `--core-args` is passed to `easytier-core`.

After the service is successfully installed, you can use the following commands to manage the service:

- Start service:

  ::: code-group

  ```sh [Linux]
  sudo ./easytier-cli service start
  ```

  ```powershell [Windows]
  .\easytier-cli.exe service start
  ```

  :::

- Stop service:

  ::: code-group

  ```sh [Linux]
  sudo ./easytier-cli service stop
  ```

  ```powershell [Windows]
  .\easytier-cli.exe service stop
  ```

  :::

- Check status:

  ::: code-group

  ```sh [Linux]
  sudo ./easytier-cli service status
  ```

  ```powershell [Windows]
  .\easytier-cli.exe service status
  ```

  :::

- Uninstall service:

  ::: code-group

  ```sh [Linux]
  sudo ./easytier-cli service uninstall
  ```

  ```powershell [Windows]
  .\easytier-cli.exe service uninstall
  ```

  :::
