# 安装为 Windows 服务

> 感谢 北辰℃ 提供的教程

在 Windows 系统中，将某些应用程序安装为服务可以使其在后台自动运行，无需用户手动干预，极大地提高了应用的运行稳定性和便捷性。本教程将以使用 NSSM（Non-Sucking Service Manager）工具将 easytier 应用安装为 Windows 服务为例，详细介绍整个操作流程。

## 一、前期准备

**下载 easytier 应用**：

找到最新版本的`easytier-windows-x86_64-v2.2.0.zip`文件下载链接，将其下载到本地。

下载完成后，将该压缩包解压到本地目录，比如`D:\EasyTier`。

**下载 NSSM**：

打开浏览器，访问 NSSM 官网 \[[ht](https://nssm.cc/download)[tps:/](https://nssm.cc/download)[/nssm](https://nssm.cc/download)[.cc/d](https://nssm.cc/download)[ownlo](https://nssm.cc/download)[ad](https://nssm.cc/download)]。

在官网页面中找到适用于你系统的版本（通常是最新版本），点击下载链接将其下载到本地。

下载完成后，将压缩包中的`nssm.exe`解压到`EasyTier`所在的本地目录，例如`D:\EasyTier`。

**创建脚本工具**

在`EasyTier`所在的本地目录创建`install.cmd`文件并写入以下内容：

```Batch
@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

:: 检查管理员权限
fltmc >nul 2>&1 || (
    echo 请使用管理员权限运行！
    pause
    exit /b
)

:: 交互式输入配置
echo 正在创建EasyTier服务配置...

set /p SERVICE_NAME=请输入服务名称(默认EasyTierService): 
if "%SERVICE_NAME%"=="" set SERVICE_NAME=EasyTierService

set /p DEV_NAME=请输入设备名称(默认EasyTierNET): 
if "%DEV_NAME%"=="" set DEV_NAME=EasyTierNET

:network_input
set /p NETWORK_NAME=请输入网络名称(必填): 
if "%NETWORK_NAME%"=="" (
    echo 错误：网络名称不能为空
    goto network_input
)

:secret_input
set /p NETWORK_SECRET=请输入网络密钥(必填): 
if "%NETWORK_SECRET%"=="" (
    echo 错误：网络密钥不能为空
    goto secret_input
)

set /p PEERS=请输入中继节点(多个节点用英文逗号[,]分隔，默认tcp://public.easytier.cn:11010,udp://public.easytier.cn:11010): 
if "%PEERS%"=="" set PEERS=tcp://public.easytier.cn:11010,udp://public.easytier.cn:11010

:: 可选功能配置
set OPTIONS=
set /p ENABLE_LATENCY=是否启用低延迟优先模式[Y/n]: 
if /i "!ENABLE_LATENCY!"=="Y" set OPTIONS=!OPTIONS! --latency-first

set /p ENABLE_MULTI_THREAD=是否启用多线程模式[Y/n]: 
if /i "!ENABLE_MULTI_THREAD!"=="Y" set OPTIONS=!OPTIONS! --multi-thread

set /p ENABLE_KCP=是否启用KCP代理[Y/n]: 
if /i "!ENABLE_KCP!"=="Y" set OPTIONS=!OPTIONS! --enable-kcp-proxy

set /p ENABLE_PROXY=是否启用系统代理转发[Y/n]: 
if /i "!ENABLE_PROXY!"=="Y" set OPTIONS=!OPTIONS! --proxy-forward-by-system

:: 转换PEERS为nssm需要的格式
set PEERS_PARAMS=
for %%p in (%PEERS%) do (
    set PEERS_PARAMS=!PEERS_PARAMS! --peers %%p
)

:: 安装服务
echo 正在安装服务 %SERVICE_NAME%...
"%~dp0nssm.exe" install %SERVICE_NAME% "easytier-core.exe"
"%~dp0nssm.exe" set %SERVICE_NAME% AppParameters "-d --dev-name %DEV_NAME% --no-listener !OPTIONS! --network-name %NETWORK_NAME% --network-secret %NETWORK_SECRET% %PEERS_PARAMS%"

:: 设置服务描述
"%~dp0nssm.exe" set %SERVICE_NAME% Description "EasyTier 核心服务"

:: 设置工作目录为当前目录
"%~dp0nssm.exe" set %SERVICE_NAME% AppDirectory %~dp0

:: 设置服务启动类型为自动
"%~dp0nssm.exe" set %SERVICE_NAME% Start SERVICE_AUTO_START

:: 启动服务
echo 正在启动服务 %SERVICE_NAME%...
"%~dp0nssm.exe" start %SERVICE_NAME%

echo 服务 %SERVICE_NAME% 安装完成

:: 保存服务名称供卸载脚本使用
echo %SERVICE_NAME% > "%~dp0service_name.txt"

:: 显示节点信息
"%~dp0easytier-cli.exe" node
pause
```

在`EasyTier`所在的本地目录创建`uninstall.cmd`文件并写入以下内容：

```Batch
@echo off
chcp 65001 >nul
setlocal

:: 检查管理员权限
fltmc >nul 2>&1 || (
    echo 请使用管理员权限运行！
    pause
    exit /b
)

:: 检查服务名称文件是否存在
if not exist "%~dp0service_name.txt" (
    echo 错误：找不到service_name.txt文件！
    echo 请检查是否正确安装。
    pause
    exit /b 1
)

:: 读取服务名称
set /p SERVICE_NAME=<"%~dp0service_name.txt"

:: 停止并删除服务
echo 正在停止服务 %SERVICE_NAME%...
"%~dp0nssm.exe" stop %SERVICE_NAME%
"%~dp0nssm.exe" remove %SERVICE_NAME% confirm

echo 服务 %SERVICE_NAME% 已卸载
pause

```

## 二、准备工作

1. 确保当前目录下包含以下文件：
   - `easytier-core.exe` (核心程序)
   - `easytier-cli.exe` (命令行工具)
   - `nssm.exe` (服务管理工具)
   - `install.cmd` (安装脚本)
   - `uninstall.cmd` (卸载脚本)

2. 建议将整个文件夹放在固定位置。

## 三、安装服务

1. **以管理员身份**运行`install.cmd`
2. 按照提示输入配置信息：
   - 服务名称 (默认: EasyTierService)
   - STUN设备名称 (默认: EasyTierNET)
   - 网络名称 (必填)
   - 网络密钥 (必填)
   - 中继节点 (默认: tcp://public.easytier.cn:11010,udp://public.easytier.cn:11010)
3. 选择可选功能：
   - 低延迟优先模式
   - 多线程模式  
   - KCP代理
   - 系统代理转发
4. 安装完成后会自动启动服务。

## 四、卸载服务

1. **以管理员身份**运行`uninstall.cmd`
2. 脚本会自动停止并删除服务

## 五、注意事项

1. 安装/卸载必须使用管理员权限
2. 安装后不要移动程序文件位置
3. 服务配置保存在`service_name.txt`中，请不要手动修改

## 六、常见问题

**Q: 如何修改服务配置？**
A: 先卸载服务，然后重新安装


> 提示：所有操作必须在EasyTier程序所在目录进行
