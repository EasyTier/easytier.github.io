# 安装为 Windows 服务

> 感谢 北辰℃ 提供的教程，以及由 dawn-lc 实现的一键安装/卸载服务脚本。

在 Windows 系统中，将某些应用程序安装为服务可以使其在后台自动运行，无需用户手动干预，极大地提高了应用的运行稳定性和便捷性。

本教程将以使用 NSSM（Non-Sucking Service Manager）工具将 EasyTier 应用安装为 Windows 服务为例，详细介绍整个操作流程。

## 一、前期准备

**下载 EasyTier 应用**：

下载最新版本的`Windows`操作系统的`命令行程序`压缩包。

下载完成后，将该压缩包解压到本地目录，例如`D:\EasyTier`。

此时当前目录下应至少包含以下文件：
   - `easytier-core.exe` (核心程序)
   - `easytier-cli.exe` (命令行工具)
   - `Packet.dll` (运行库)
   - `wintun.dll` (运行库)

**下载 NSSM**：

打开浏览器，访问 NSSM 官网 [https://nssm.cc/](https://nssm.cc/download)。

在官网页面中找到适用于你系统的版本（通常是最新版本），点击下载链接将其下载到本地。

下载完成后，找到对应您设备架构的版本（如：`win64`），将其中的`nssm.exe`解压到`EasyTier`所在的本地目录。

## 二、准备工作

1. 确保当前目录下至少包含以下文件：
   - `easytier-core.exe` (核心程序)
   - `easytier-cli.exe` (命令行工具)
   - `nssm.exe` (服务管理工具)
   - `Packet.dll` (运行库)
   - `wintun.dll` (运行库)

2. 创建脚本工具

在当前目录下创建`install.cmd`文件并写入以下内容：

```PowerShell
@echo off
@chcp 65001 > nul
cd /d "%~dp0"
title 正在启动脚本...
where /q powershell 
if %ERRORLEVEL% NEQ 0 echo PowerShell is not installed. && pause > nul && exit
powershell -command "if ($PSVersionTable.PSVersion.Major -lt 3) {throw 'Requires PowerShell 3.0 or higher.'}; $content = Get-Content -Path '%0' -Raw -Encoding UTF8; $mainIndex = $content.LastIndexOf('#powershell#'); if ($mainIndex -le 0) {throw 'PowerShell script not found.'}; $content = $content.Substring($mainIndex + '#powershell#'.Length); $content = [ScriptBlock]::Create($content); Invoke-Command -ScriptBlock $content -ArgumentList (('%*' -split ' ') + @((Get-Location).Path));"
exit
#powershell#
function Pause {
    param (
        [string]$Text = "按任意键继续..."
    )
    Write-Host $Text -ForegroundColor Yellow
    [System.Console]::ReadKey($true) > $null
}

# 初始化路径
Set-Location -Path $args[-1]
$ScriptRoot = (Get-Location).Path

# 修改标题
$host.ui.rawui.WindowTitle = "安装EasyTier服务"

# 检查管理员权限
if (-not ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    Write-Host "请使用管理员权限运行！" -ForegroundColor Red
    Pause -Text "按任意键退出..."
    exit 1
}

# 必要文件检查
$RequiredFiles = @("easytier-core.exe", "easytier-cli.exe", "nssm.exe", "Packet.dll", "wintun.dll")
foreach ($file in $RequiredFiles) {
    if (-not (Test-Path (Join-Path $ScriptRoot $file))) {
        Write-Host "缺少必要文件: $file" -ForegroundColor Red
        Pause -Text "按任意键退出..."
        exit 1
    }
}

# 交互式配置部分
Write-Host "`n正在创建EasyTier服务配置...`n" -ForegroundColor Cyan

# 服务名称设置
$SERVICE_NAME = "EasyTierService"

# 网络名称验证
do {
    $NETWORK_NAME = Read-Host "请输入网络名称(必填)"
    if ([string]::IsNullOrWhiteSpace($NETWORK_NAME)) {
        Write-Host "名称不能为空！" -ForegroundColor Red
    }
    elseif ($NETWORK_NAME -match '\s') {
        # 检查包含空格
        Write-Host "名称不能包含空格！" -ForegroundColor Red
    }
} while ([string]::IsNullOrWhiteSpace($NETWORK_NAME) -or ($NETWORK_NAME -match '\s'))

# 网络密钥验证
do {
    $NETWORK_SECRET = Read-Host "请输入网络密钥(必填)"
    if ([string]::IsNullOrWhiteSpace($NETWORK_SECRET)) {
        Write-Host "密钥不能为空！" -ForegroundColor Red
    }
    elseif ($NETWORK_SECRET -match '\s') {
        # 检查包含空格
        Write-Host "密钥不能包含空格！" -ForegroundColor Red
    }
} while ([string]::IsNullOrWhiteSpace($NETWORK_SECRET) -or ($NETWORK_SECRET -match '\s'))

# 配置选项
$OPTIONS = @()

# 公共节点处理
if ((Read-Host "是否指定公共节点？(默认使用【tcp://public.easytier.cn:11010】，如需指定请按Y)[y/N]") -match '^[Yy]$') {
    do {
        $EXTERNAL_NODE = Read-Host "请输入公共节点地址(必填)"
        if ([string]::IsNullOrWhiteSpace($EXTERNAL_NODE)) {
            Write-Host "公共节点地址不能为空！" -ForegroundColor Red
        }
        elseif ($EXTERNAL_NODE -match '\s') {
            Write-Host "公共节点地址不能包含空格！" -ForegroundColor Red
        }
    } while ([string]::IsNullOrWhiteSpace($EXTERNAL_NODE) -or ($EXTERNAL_NODE -match '\s'))
    $OPTIONS += "--external-node $EXTERNAL_NODE"
}
else {
    $OPTIONS += "--external-node tcp://public.easytier.cn:11010"
}

# 对等节点处理
if ((Read-Host "是否添加对等节点？(默认添加【tcp://public.easytier.cn:11010】，如需添加请按Y)[y/N]") -match '^[Yy]$') {
    do {
        $PEERS = Read-Host "请输入对等节点地址(必填)"
        if ([string]::IsNullOrWhiteSpace($PEERS)) {
            Write-Host "对等节点地址不能为空！" -ForegroundColor Red
        }
        elseif ($PEERS -match '\s') {
            Write-Host "对等节点地址不能包含空格！" -ForegroundColor Red
        }
    } while ([string]::IsNullOrWhiteSpace($PEERS) -or ($PEERS -match '\s'))
    $OPTIONS += ($PEERS -split ',' | ForEach-Object { "--peers $($_.Trim())" }) -join ' '
}
else {
    $OPTIONS += "--peers tcp://public.easytier.cn:11010"
}

# 当前节点名称处理
if ((Read-Host "是否指定当前节点名称？(默认使用计算机名，如需指定请按Y)[y/N]") -match '^[Yy]$') {
    do {
        $HOSTNAME = Read-Host "请输入节点名称(必填)"
        if ([string]::IsNullOrWhiteSpace($HOSTNAME)) {
            Write-Host "节点名称不能为空！" -ForegroundColor Red
        }
        elseif ($HOSTNAME -match '\s') {
            Write-Host "节点名称不能包含空格！" -ForegroundColor Red
        }
    } while ([string]::IsNullOrWhiteSpace($HOSTNAME) -or ($HOSTNAME -match '\s'))
    $OPTIONS += "--hostname $HOSTNAME"
}

if ((Read-Host "是否使用自动分配地址？(默认使用自动分配地址，如需指定地址请按Y)[Y/n]") -match '^[Yy]$') {
    # 当前节点IP地址验证
    do {
        $IP = Read-Host "请输入节点IP地址(必填)"
        if ([string]::IsNullOrWhiteSpace($IP)) {
            Write-Host "节点IP地址不能为空！" -ForegroundColor Red
        }
        elseif ($IP -match '\s') {
            # 检查包含空格
            Write-Host "节点IP地址不能包含空格！" -ForegroundColor Red
        }
    } while ([string]::IsNullOrWhiteSpace($IP) -or ($IP -match '\s'))
    $OPTIONS += "--ipv4 $IP"
}
else {
    $OPTIONS += "--dhcp"
}

if ((Read-Host "是否启用低延迟优先模式？[Y/n]") -match '^[Yy]?$') { $OPTIONS += "--latency-first" }
if ((Read-Host "是否启用多线程模式？[Y/n]") -match '^[Yy]?$') { $OPTIONS += "--multi-thread" }
if ((Read-Host "是否启用KCP代理？[Y/n]") -match '^[Yy]?$') { $OPTIONS += "--enable-kcp-proxy" }
if ((Read-Host "是否启用系统代理转发？[Y/n]") -match '^[Yy]?$') { $OPTIONS += "--proxy-forward-by-system" }

# 服务安装部分
try {
    $nssm = Join-Path $ScriptRoot "nssm.exe"

    # 配置服务参数
    $arguments = @(
        "--dev-name EasyTier_NET",
        "--no-listener",
        "--network-name $NETWORK_NAME",
        "--network-secret $NETWORK_SECRET"
    ) + $OPTIONS -join ' '
    
    Write-Host "`n$arguments`n"
    Pause -Text "请确认以上配置是否正确，按任意键继续..."

    # 创建服务
    & $nssm install $SERVICE_NAME (Join-Path $ScriptRoot "easytier-core.exe")
    & $nssm set $SERVICE_NAME AppParameters $arguments
    & $nssm set $SERVICE_NAME Description "EasyTier 核心服务"
    & $nssm set $SERVICE_NAME AppDirectory $ScriptRoot
    & $nssm set $SERVICE_NAME Start SERVICE_AUTO_START
    
    # 启动服务
    & $nssm start $SERVICE_NAME
    
    Write-Host "`n服务安装完成，如需查看节点信息请执行：easytier-cli.exe node" -ForegroundColor Green
}
catch {
    Write-Host "`n安装过程中发生错误: $_" -ForegroundColor Red
    Pause -Text "按任意键退出..."
    exit 1
}
Pause -Text "按任意键退出..."
exit
```

在当前目录下创建`uninstall.cmd`文件并写入以下内容：

```PowerShell
@echo off
@chcp 65001 > nul
cd /d "%~dp0"
title 正在启动脚本...
where /q powershell 
if %ERRORLEVEL% NEQ 0 echo PowerShell is not installed. && pause > nul && exit
powershell -command "if ($PSVersionTable.PSVersion.Major -lt 3) {throw 'Requires PowerShell 3.0 or higher.'}; $content = Get-Content -Path '%0' -Raw -Encoding UTF8; $mainIndex = $content.LastIndexOf('#powershell#'); if ($mainIndex -le 0) {throw 'PowerShell script not found.'}; $content = $content.Substring($mainIndex + '#powershell#'.Length); $content = [ScriptBlock]::Create($content); Invoke-Command -ScriptBlock $content -ArgumentList (('%*' -split ' ') + @((Get-Location).Path));"
exit
#powershell#
function Pause {
    param (
        [string]$Text = "按任意键继续..."
    )
    Write-Host $Text -ForegroundColor Yellow
    [System.Console]::ReadKey($true) > $null
}

# 初始化路径
Set-Location -Path $args[-1]
$ScriptRoot = (Get-Location).Path

# 修改标题
$host.ui.rawui.WindowTitle = "卸载EasyTier服务"

# 检查管理员权限
if (-not ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    Write-Host "请使用管理员权限运行！" -ForegroundColor Red
    Pause -Text "按任意键退出..."
    exit 1
}

# 必要文件检查
$RequiredFiles = @("nssm.exe")
foreach ($file in $RequiredFiles) {
    if (-not (Test-Path (Join-Path $ScriptRoot $file))) {
        Write-Host "缺少必要文件: $file" -ForegroundColor Red
        Pause -Text "按任意键退出..."
        exit 1
    }
}

$SERVICE_NAME = "EasyTierService"
# 服务卸载部分
try {
    $nssm = Join-Path $ScriptRoot "nssm.exe"
    
	# 停止服务
	Write-Host "正在停止服务 $SERVICE_NAME ..."
	& $nssm stop $SERVICE_NAME

	# 删除服务（自动确认）
	Write-Host "正在移除服务 $SERVICE_NAME ..."
	& $nssm remove $SERVICE_NAME confirm

	Write-Host "`n服务 $SERVICE_NAME 已卸载" -ForegroundColor Green
}
catch {
    Write-Host "`n卸载过程中发生错误: $_" -ForegroundColor Red
    Pause -Text "按任意键退出..."
    exit 1
}

Pause -Text "按任意键退出..."
exit
```

3. 将整个文件夹放在固定位置。

## 三、安装服务

1. **以管理员身份**运行`install.cmd`
2. 按照提示输入配置信息：
   - 网络名称 (必填)
   - 网络密钥 (必填)
   - 中继节点 (默认: tcp://public.easytier.cn:11010)
   - TUN设备名称 (默认: EasyTierNET)
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

## 六、常见问题

**Q: 如何修改服务配置？**
A: 先卸载服务，然后重新安装
