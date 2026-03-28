# Install as a Windows Service

**One-click install command**

```PowerShell
iwr "https://raw.githubusercontent.com/EasyTier/EasyTier/main/script/install.cmd" -OutFile "install.cmd"; .\install.cmd
```

If GitHub is not accessible, use this command instead:

```PowerShell
iwr "https://ghfast.top/https://raw.githubusercontent.com/EasyTier/EasyTier/main/script/install.cmd" -OutFile "install.cmd"; .\install.cmd -ughp
```

**Available parameters**

    -H / -? / -Help
        Display this help message and exit.

    -U / -Update
        Update EasyTier to the latest version.

    -X / -Uninstall
        Uninstall the EasyTier service.

    -UGHP / -UseGitHubProxy
        Download through a GitHub mirror proxy (default: $false).

    -GHP / -GitHubProxy <proxy>
        Specify the GitHub mirror proxy address (default: https://ghfast.top/).

    -UP / -UseProxy
        Use a custom proxy (default: $false).

    -P / -Proxy <proxy>
        Specify the custom proxy address (default: http://127.0.0.1:7890).

    -C / -ConfigType <type>
        Specify the configuration mode. Available values:
        * File   Local config file
        * Remote Centrally managed by a remote server
        * CLI    Pass arguments directly on the command line

    -N / -ServiceName <name>
        Specify the installed service name (default: EasyTierService).

    <other arguments...>
        Used to pass custom arguments when CLI mode is selected.

Original tutorial below.

> Thanks to BeiChen℃ for providing the tutorial, and dawn-lc for providing the one-click install/uninstall script

On Windows systems, installing certain applications as services allows them to run automatically in the background without manual intervention, greatly improving the stability and convenience of the application.

## 1. Preparation

**Download EasyTier CLI**:

Download the latest version of the `Windows` operating system `command line program` compressed package.

After downloading, extract the compressed package to a local directory, such as `D:\EasyTier`.

The current directory should contain at least the following files:

- `easytier-core.exe` (core program)
- `easytier-cli.exe` (command line tool)
- `Packet.dll` (runtime library)
- `wintun.dll` (runtime library)

**Download the Install Script**:

Start PowerShell in the current directory and execute the following commands:

`iwr "https://github.com/EasyTier/EasyTier/raw/refs/heads/main/script/install.cmd" -OutFile "install.cmd"`

## 2. Preparation Work

1. Ensure the current directory contains the following files:

   - `easytier-core.exe` (core program)
   - `easytier-cli.exe` (command line tool)
   - `Packet.dll` (runtime library)
   - `wintun.dll` (runtime library)
   - `install.cmd` (install script)

2. Place the entire folder in a fixed location.

## 3. Install Service

1. Run `install.cmd`
2. Follow the prompts to enter configuration information.
3. After installation is complete, the service will start automatically.

## 4. Uninstall Service

1. Run `install.cmd -Uninstall`
2. The script will automatically stop and delete the service.

## 5. Notes

1. Do not move the program file location after installation

## 6. Common Questions

**Q: How to modify service configuration?**

A: First uninstall the service, then reinstall it
