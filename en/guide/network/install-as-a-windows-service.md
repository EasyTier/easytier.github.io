# Install as a Windows Service

> Thanks to BeiChen℃ for providing the tutorial, and dawn-lc for providing the one-click install/uninstall script

On Windows systems, installing certain applications as services allows them to run automatically in the background without manual intervention, greatly improving the stability and convenience of the application.

This tutorial will use NSSM (Non-Sucking Service Manager) to install the EasyTier application as a Windows service as an example, and provide a detailed explanation of the entire operation process.

## 1. Preparation

**Download EasyTier Application**:

Download the latest version of the `Windows` operating system `command line program` compressed package.

After downloading, extract the compressed package to a local directory, such as `D:\EasyTier`.

The current directory should contain at least the following files:

- `easytier-core.exe` (core program)
- `easytier-cli.exe` (command line tool)
- `Packet.dll` (runtime library)
- `wintun.dll` (runtime library)

**Download NSSM**:

Open your browser and visit the NSSM official website [https://nssm.cc/](https://nssm.cc/download).

On the official website page, find the version suitable for your system (usually the latest version), click the download link to download it locally.

After downloading, find the version corresponding to your device architecture (such as: `win64`), and extract the `nssm.exe` from it to the local directory where `EasyTier` is located.

**Download Install/Uninstall Script**:

Start PowerShell in the current directory and execute the following commands:

`iwr "https://github.com/EasyTier/EasyTier/raw/refs/heads/main/script/install.cmd" -OutFile "install.cmd"`

`iwr "https://github.com/EasyTier/EasyTier/raw/refs/heads/main/script/uninstall.cmd" -OutFile "uninstall.cmd"`

## 2. Preparation Work

1. Ensure the current directory contains the following files:

   - `easytier-core.exe` (core program)
   - `easytier-cli.exe` (command line tool)
   - `nssm.exe` (service management tool)
   - `Packet.dll` (runtime library)
   - `wintun.dll` (runtime library)
   - `install.cmd` (install script)
   - `uninstall.cmd` (uninstall script)

2. Place the entire folder in a fixed location.

## 3. Install Service

1. Run `install.cmd`
2. Follow the prompts to enter configuration information.
3. After installation is complete, the service will start automatically.

## 4. Uninstall Service

1. Run `uninstall.cmd`
2. The script will automatically stop and delete the service.

## 5. Notes

1. Do not move the program file location after installation

## 6. Common Questions

**Q: How to modify service configuration?**

A: First uninstall the service, then reinstall it
