# Install as a Windows Service

After EasyTier is installed as a Windows service, it can run in the background and start automatically with the system. This is useful for long-running or unattended deployments.

The recommended approach is to use the official `install.cmd` script for installation, updates, and removal. You no longer need to prepare NSSM manually.

> Thanks to BeiChen℃ for the original tutorial and dawn-lc for the one-click install/uninstall script.

## Quick Start

Open PowerShell in the directory where you want to install EasyTier and run:

```PowerShell
iwr "https://raw.githubusercontent.com/EasyTier/EasyTier/main/script/install.cmd" -OutFile "install.cmd"; .\install.cmd
```

If GitHub is not accessible, use the mirror proxy command instead:

```PowerShell
iwr "https://ghfast.top/https://raw.githubusercontent.com/EasyTier/EasyTier/main/script/install.cmd" -OutFile "install.cmd"; .\install.cmd -ughp
```

The script will guide you through the setup and start the service automatically after installation succeeds.

## Installation Steps

1. Open PowerShell in the directory where you want to install EasyTier.
2. Run the install script:

   ```PowerShell
   .\install.cmd
   ```

3. Choose a configuration mode and provide the required values when prompted.
4. After the script finishes, the Windows service is created and started automatically.

## Configuration Modes

- `File`: use a local configuration file. Best when you already have a config file prepared.
- `Remote`: use centralized management from a remote server. Best for managing multiple devices.
- `CLI`: pass parameters directly on the command line. Best for quick testing or custom startup arguments.

## Common Commands

- Install the service:

  ```PowerShell
  .\install.cmd
  ```

- Uninstall the service:

  ```PowerShell
  .\install.cmd -Uninstall
  ```

- Update EasyTier:

  ```PowerShell
  .\install.cmd -Update
  ```

## Parameter Reference

### Basic

- `-H` / `-?` / `-Help`: show help information and exit.

### Service Actions

- `-U` / `-Update`: update EasyTier to the latest version.
- `-X` / `-Uninstall`: uninstall the EasyTier service.

### Download Proxies

- `-UGHP` / `-UseGitHubProxy`: download through a GitHub mirror proxy. Default: `$false`.
- `-GHP` / `-GitHubProxy <proxy>`: specify the GitHub mirror proxy address. Default: `https://ghfast.top/`.
- `-UP` / `-UseProxy`: use a custom proxy. Default: `$false`.
- `-P` / `-Proxy <proxy>`: specify the custom proxy address. Default: `http://127.0.0.1:7890`.

### Configuration and Service Name

- `-C` / `-ConfigType <type>`: set the configuration mode. Supported values: `File`, `Remote`, `CLI`.
- `-N` / `-ServiceName <name>`: set the installed service name. Default: `EasyTierService`.
- `<other arguments...>`: when `CLI` mode is used, any remaining arguments are passed to EasyTier.

## FAQ

**Q: How do I change the service configuration?**

A: First run `.\install.cmd -Uninstall`, then install the service again with the new configuration.

**Q: Why should I keep the directory in the same place after installation?**

A: The Windows service stores the paths to the EasyTier executables and script. If the directory moves, the service may fail to start.
