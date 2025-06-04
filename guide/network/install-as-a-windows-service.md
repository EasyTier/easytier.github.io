# 安装为 Windows 服务

> 感谢 北辰℃ 提供的教程，以及由 dawn-lc 提供的一键安装/卸载脚本

在 Windows 系统中，将某些应用程序安装为服务可以使其在后台自动运行，无需用户手动干预，极大地提高了应用的运行稳定性和便捷性。

本教程将以使用 NSSM（Non-Sucking Service Manager）工具将 EasyTier 应用安装为 Windows 服务为例，详细介绍整个操作流程。

一键安装/卸载脚本无法在 Windows 7 或 Windows Server 2008 以及 其他无法运行 PowerShell 3 的操作系统上工作，请升级您的系统或更新PowerShell。

## 一、前期准备

**下载 EasyTier 应用**：

下载最新版本的`Windows`操作系统的`命令行程序`压缩包。

下载完成后，将该压缩包解压到本地目录，比如`D:\EasyTier`。

当前目录下应包含以下文件：
   - `easytier-core.exe` (核心程序)
   - `easytier-cli.exe` (命令行工具)
   - `Packet.dll` (运行库)
   - `wintun.dll` (运行库)

**下载 NSSM**：

打开浏览器，访问 NSSM 官网 [https://nssm.cc/](https://nssm.cc/download)。

在官网页面中找到适用于你系统的版本（通常是最新版本），点击下载链接将其下载到本地。

下载完成后，找到对应您设备架构的版本（如：`win64`），将其中的`nssm.exe`解压到`EasyTier`所在的本地目录。

## 二、准备工作

1. 确保当前目录下包含以下文件：
   - `easytier-core.exe` (核心程序)
   - `easytier-cli.exe` (命令行工具)
   - `nssm.exe` (服务管理工具)
   - `Packet.dll` (运行库)
   - `wintun.dll` (运行库)

2. 创建脚本工具

在当前目录下创建`install.cmd`文件并写入以下内容：

```PowerShell
@ECHO off
TITLE Starting script...
WHERE /q PowerShell 
IF %ERRORLEVEL% NEQ 0 ECHO PowerShell is not installed. && PAUSE > NUL && EXIT
PowerShell -NoProfile -ExecutionPolicy Bypass -Command "if ($PSVersionTable.PSVersion.Major -lt 3) {throw 'Requires PowerShell 3.0 or higher.'}; $content = Get-Content -Path '%~f0' -Raw -Encoding UTF8; $mainIndex = $content.LastIndexOf('#POWERSHELL#'); if ($mainIndex -lt 0) {throw 'PowerShell script not found.'}; $code = $content.Substring($mainIndex + '#POWERSHELL#'.Length); $script = [ScriptBlock]::Create($code); & $script @args -- %*"
EXIT
#POWERSHELL#
[System.Threading.Thread]::CurrentThread.CurrentCulture = [System.Globalization.CultureInfo]::GetCultureInfo("zh-CN")
[System.Threading.Thread]::CurrentThread.CurrentUICulture = [System.Globalization.CultureInfo]::GetCultureInfo("zh-CN")
function Show-Pause {
    param(
        [string]$Text = "按任意键继续...",
        [string]$Color = "Cyan"
    )
    Write-Host "`n$Text" -ForegroundColor $Color
    [System.Console]::ReadKey($true) > $null
}
function Show-YesNoPrompt {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Message,
        [string]$Title = "",
        [int]$DefaultIndex = 0,
        [string[]]$Labels = @("&Yes", "&No"),
        [string[]]$Helps = @("是", "否")
    )
    if ($Labels.Count -ne $Helps.Count) {
        throw "Labels 和 Helps 的数量必须相同。"
    }
    $choices = for ($i = 0; $i -lt $Labels.Count; $i++) {
        [System.Management.Automation.Host.ChoiceDescription]::new($Labels[$i], $Helps[$i])
    }
    return $Host.UI.PromptForChoice($Title, $Message, $choices, $DefaultIndex) -eq 0
}
function Show-MultipleChoicePrompt {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Message,
        [Parameter(Mandatory = $true)]
        [string[]]$Options,
        [string[]]$Helps = @(),
        [string]$Title = "",
        [int]$DefaultIndex = 0
    )
    if ($Helps.Count -eq 0) {
        $Helps = @("")
        for ($i = 1; $i -lt $Options.Count; $i++) {
            $Helps += ""
        }
    }
    if ($Options.Count -ne $Helps.Count) {
        throw "Options 和 Helps 的数量必须相同。"
    }
    $choices = for ($i = 0; $i -lt $Options.Count; $i++) {
        [System.Management.Automation.Host.ChoiceDescription]::new("&$i.$($Options[$i])", $Helps[$i])
    }
    return $Host.UI.PromptForChoice($Title, $Message, $choices, $DefaultIndex)
}
function Get-InputWithNoNullOrWhiteSpace {
    param(
        [string]$Prompt
    )
    while ($true) {
        $response = Read-Host "请输入${Prompt}(必填)"
        if ([string]::IsNullOrWhiteSpace($response)) {
            Write-Host "${Prompt}不能为空！" -ForegroundColor Red
        }
        else {
            return $response
        }
    }
}
function Get-InputWithDefault {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Prompt,

        [Parameter(Mandatory = $true)]
        [string]$DefaultValue
    )
    $response = Read-Host "${Prompt}(默认: ${DefaultValue})"
    if ([string]::IsNullOrWhiteSpace($response)) {
        return $DefaultValue
    }
    return $response
}
Set-Location -Path $pwd
$ScriptRoot = (Get-Location).Path
$host.ui.rawui.WindowTitle = "安装EasyTier服务"
if (-not ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    Write-Host "请使用管理员权限运行！" -ForegroundColor Red
    Show-Pause -Text "按任意键退出..."
    exit 1
}
$RequiredFiles = @("easytier-core.exe", "easytier-cli.exe", "nssm.exe", "Packet.dll", "wintun.dll")
foreach ($file in $RequiredFiles) {
    if (-not (Test-Path (Join-Path $ScriptRoot $file))) {
        Write-Host "缺少必要文件: ${file}" -ForegroundColor Red
        Show-Pause -Text "按任意键退出..."
        exit 1
    }
}
Write-Host "`n正在创建EasyTier服务配置...`n" -ForegroundColor Cyan
$SERVICE_NAME = "EasyTierService"
$OPTIONS = @()
if (Show-YesNoPrompt -Message "是否使用配置文件方案？" -DefaultIndex 1) {
    $OPTIONS += "--config-file $(Get-InputWithNoNullOrWhiteSpace -Prompt "配置文件路径")"
} 
elseif (Show-YesNoPrompt -Message "是否使用配置服务器？" -DefaultIndex 1) {
    $configServer = Get-InputWithDefault -Prompt "配置服务器地址（格式：协议://IP:端口/用户）" -DefaultValue "udp://127.0.0.1:22020/admin"
    $OPTIONS += "--config-server $configServer"
}
else {
    $OPTIONS += "--network-name $(Get-InputWithNoNullOrWhiteSpace -Prompt "网络名称")"
    $OPTIONS += "--network-secret $(Get-InputWithNoNullOrWhiteSpace -Prompt "网络密钥")"
    if (Show-YesNoPrompt -Message "是否指定当前设备名称？" -DefaultIndex 1) {
        $OPTIONS += "--hostname $(Get-InputWithNoNullOrWhiteSpace -Prompt "设备名称")"
    }
    if (Show-YesNoPrompt -Message "是否添加公共节点？") {
        $OPTIONS += "--external-node $(Get-InputWithDefault -Prompt "公共节点地址" -DefaultValue "tcp://public.easytier.cn:11010")"
    }
    if (Show-YesNoPrompt -Message "是否添加对等节点？") {
        $peers = @()
        do {
            $peers += Get-InputWithDefault -Prompt "对等节点地址" -DefaultValue "tcp://public.easytier.cn:11010"
        } while (Show-YesNoPrompt -Message "是否继续添加对等节点？" -DefaultIndex 1)
        if ($peers.Count -gt 0) {
            $OPTIONS += ($peers | ForEach-Object { "--peers $($_.Trim())" }) -join ' '
        }
    }
    $ipChoice = Show-MultipleChoicePrompt -Message "请选择IP分配方式" `
        -Options @("手动指定IPv4", "自动DHCP", "不设置IP") `
        -Helps @("指定当前设备在网络中的IP地址", "自动分配网络中的地址", "将仅转发数据包，不会创建TUN设备") `
        -DefaultIndex 1
    switch ($ipChoice) {
        0 { 
            $OPTIONS += "--ipv4 $(Get-InputWithNoNullOrWhiteSpace -Prompt "IPv4地址")" 
            break
        }
        1 { 
            $OPTIONS += "--dhcp"
            break
        }
        2 { break }
    }
    if (Show-YesNoPrompt -Message "是否启用端口监听？" -DefaultIndex 1) {
        $listeners = @()
        do {
            $listener = Get-InputWithDefault -Prompt "监听器地址（格式：协议://IP:端口）" -DefaultValue "11010"
            $listeners += $listener
        } while (Show-YesNoPrompt -Message "是否添加更多监听器？" -DefaultIndex 1)
        $OPTIONS += "--listeners $($listeners -join ' ')"

        if (Show-YesNoPrompt -Message "是否手动指定公网映射地址？") {
            $mapped = Get-InputWithNoNullOrWhiteSpace -Prompt "公网地址（格式：协议://IP:端口）"
            $OPTIONS += "--mapped-listeners $mapped"
        }
    }
    else {
        $OPTIONS += "--no-listener"
    }
    if (Show-YesNoPrompt -Message "是否启用多线程运行？") {
        $OPTIONS += "--multi-thread"
    }
    if (Show-YesNoPrompt -Message "是否启用延迟优先模式？") {
        $OPTIONS += "--latency-first"
    }
    if (Show-YesNoPrompt -Message "是否通过系统内核转发？" -DefaultIndex 1) {
        $OPTIONS += "--proxy-forward-by-system"
    }
    if (Show-YesNoPrompt -Message "是否启用KCP代理？") {
        $OPTIONS += "--enable-kcp-proxy"
    }
    if (Show-YesNoPrompt -Message "是否指定TUN设备名称？" -DefaultIndex 1) {
        $OPTIONS += "--dev-name $(Get-InputWithNoNullOrWhiteSpace -Prompt "设备名称")"
    }
    if (Show-YesNoPrompt -Message "是否设置转发网络白名单？" -DefaultIndex 1) {
        $whitelist = Get-InputWithDefault -Prompt "白名单网络（空格分隔，*表示全部）" -DefaultValue "*"
        $OPTIONS += "--relay-network-whitelist `"$whitelist`""
    }
    if (Show-YesNoPrompt -Message "是否调整高级选项？" -DefaultIndex 1) {
        if (Show-YesNoPrompt -Message "是否开启日志？" -DefaultIndex 1) {
            $logChoice = Show-MultipleChoicePrompt -Message "请选择日志级别" -Options @("DEBUG", "INFO", "WARN", "ERROR")
            $logLevels = @("debug", "info", "warn", "error")
            $OPTIONS += "--console-log-level $($logLevels[$logChoice])"
        }
        if (Show-YesNoPrompt -Message "是否修改RPC配置？" -DefaultIndex 1) {
            $OPTIONS += "--rpc-portal $(Get-InputWithNoNullOrWhiteSpace -Prompt "RPC配置（格式：监听地址:端口）")"
        }
        if (Show-YesNoPrompt -Message "是否修改默认协议？" -DefaultIndex 1) {
            $protoChoice = Show-MultipleChoicePrompt -Message "请选择默认协议" `
                -Options @("TCP", "UDP", "WebSocket", "WireGuard") `
                -Helps @("可靠传输，适合高延迟网络", "低延迟，适合稳定网络", "穿透性强，适合受限网络", "高性能VPN协议") `
                -DefaultIndex 0
            $protocols = @("tcp", "udp", "ws", "wg")
            $OPTIONS += "--default-protocol $($protocols[$protoChoice])"
        }
        if (Show-YesNoPrompt -Message "是否禁用IPv6？" -DefaultIndex 1) {
            $OPTIONS += "--disable-ipv6"
        }
        if (Show-YesNoPrompt -Message "是否启用出口节点？" -DefaultIndex 1) {
            $OPTIONS += "--enable-exit-node"
        }
        if (Show-YesNoPrompt -Message "是否启用SOCKS5代理？" -DefaultIndex 1) {
            $OPTIONS += "--socks5 $(Get-InputWithDefault -Prompt "SOCKS5端口" -DefaultValue "1080")"
        }
        if (Show-YesNoPrompt -Message "是否设置自定义MTU？" -DefaultIndex 1) {
            $OPTIONS += "--mtu $(Get-InputWithDefault -Prompt "MTU值" -DefaultValue "1380")"
        }
        if (Show-YesNoPrompt -Message "是否导出本地网络到VPN？" -DefaultIndex 1) {
            $proxyNets = @()
            do {
                $proxyNets += Get-InputWithDefault -Prompt "本地网络CIDR（如192.168.1.0/24）" -DefaultValue "192.168.0.0/24"
            } while (Show-YesNoPrompt -Message "是否添加更多本地网络？")
            $OPTIONS += "--proxy-networks $($proxyNets -join ' ')"
        }
        if (Show-YesNoPrompt -Message "是否设置实例名称？" -DefaultIndex 1) {
            $OPTIONS += "--instance-name $(Get-InputWithDefault -Prompt "实例名称" -DefaultValue "default")"
        }
        if (Show-YesNoPrompt -Message "是否设置VPN地址？" -DefaultIndex 1) {
            $vpnPortal = Get-InputWithNoNullOrWhiteSpace -Prompt "VPN地址（格式：协议://IP:端口/网络）"
            $OPTIONS += "--vpn-portal $vpnPortal"
        }
        if (Show-YesNoPrompt -Message "是否禁用通信加密？" -DefaultIndex 1) {
            $OPTIONS += "--disable-encryption"
        }
        if (Show-YesNoPrompt -Message "是否禁用TUN设备？" -DefaultIndex 1) {
            $OPTIONS += "--no-tun"
        }
        if (Show-YesNoPrompt -Message "是否使用smoltcp协议栈？" -DefaultIndex 1) {
            $OPTIONS += "--use-smoltcp"
        }
        if (Show-YesNoPrompt -Message "是否转发所有RPC流量？" -DefaultIndex 1) {
            $OPTIONS += "--relay-all-peer-rpc"
        }
        if (Show-YesNoPrompt -Message "是否禁用KCP输入？" -DefaultIndex 1) {
            $OPTIONS += "--disable-kcp-input"
        }
        if (Show-YesNoPrompt -Message "是否绑定到物理设备？" -DefaultIndex 1) {
            $OPTIONS += "--bind-device true"
        }
        if (Show-YesNoPrompt -Message "是否禁用P2P通信？" -DefaultIndex 1) {
            $OPTIONS += "--disable-p2p"
        }
        if (Show-YesNoPrompt -Message "是否禁用UDP打洞？" -DefaultIndex 1) {
            $OPTIONS += "--disable-udp-hole-punching"
        }
        if (Show-YesNoPrompt -Message "是否配置压缩算法？" -DefaultIndex 1) {
            $compressChoice = Show-MultipleChoicePrompt -Message "请选择压缩算法" `
                -Options @("不压缩", "ZSTD") `
                -DefaultIndex 0
            $compressAlgos = @("none", "zstd")
            $OPTIONS += "--compression $($compressAlgos[$compressChoice])"
        }
        if (Show-YesNoPrompt -Message "是否设置手动路由？" -DefaultIndex 1) {
            $routes = @()
            do {
                $routes += Get-InputWithDefault -Prompt "路由CIDR（如10.0.0.0/8）" -DefaultValue "10.0.0.0/8"
            } while (Show-YesNoPrompt -Message "是否添加更多路由？" -DefaultIndex 1)
            $OPTIONS += "--manual-routes $($routes -join ' ')"
        }
    }
}
try {
    $nssm = Join-Path $ScriptRoot "nssm.exe"
    $arguments = $OPTIONS -join ' '
    Write-Host "`n生成的配置参数如下：" -ForegroundColor Yellow
    Write-Host ($OPTIONS -join " ") -ForegroundColor DarkGray
    if (Show-YesNoPrompt -Message "`n确认安装配置？" -DefaultIndex 1) {
        & $nssm install $SERVICE_NAME (Join-Path $ScriptRoot "easytier-core.exe")
        & $nssm set $SERVICE_NAME AppParameters $arguments
        & $nssm set $SERVICE_NAME Description "EasyTier 核心服务"
        & $nssm set $SERVICE_NAME AppDirectory $ScriptRoot
        & $nssm set $SERVICE_NAME Start SERVICE_AUTO_START
        & $nssm start $SERVICE_NAME
        Write-Host "`n服务安装完成，如需查看节点信息请执行：easytier-cli.exe node" -ForegroundColor Green
    }
    else {
        Write-Host "安装已取消。" -ForegroundColor Yellow
        Show-Pause -Text "按任意键退出..."
        exit
    }
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
@ECHO off
TITLE Starting script...
WHERE /q PowerShell 
IF %ERRORLEVEL% NEQ 0 ECHO PowerShell is not installed. && PAUSE > NUL && EXIT
PowerShell -NoProfile -ExecutionPolicy Bypass -Command "if ($PSVersionTable.PSVersion.Major -lt 3) {throw 'Requires PowerShell 3.0 or higher.'}; $content = Get-Content -Path '%~f0' -Raw -Encoding UTF8; $mainIndex = $content.LastIndexOf('#POWERSHELL#'); if ($mainIndex -lt 0) {throw 'PowerShell script not found.'}; $code = $content.Substring($mainIndex + '#POWERSHELL#'.Length); $script = [ScriptBlock]::Create($code); & $script @args -- %*"
EXIT
#POWERSHELL#
[System.Threading.Thread]::CurrentThread.CurrentCulture = [System.Globalization.CultureInfo]::GetCultureInfo("zh-CN")
[System.Threading.Thread]::CurrentThread.CurrentUICulture = [System.Globalization.CultureInfo]::GetCultureInfo("zh-CN")
function Show-Pause {
    param(
        [string]$Text = "按任意键继续...",
        [string]$Color = "Cyan"
    )
    Write-Host "`n$Text" -ForegroundColor $Color
    [System.Console]::ReadKey($true) > $null
}
# 初始化路径
Set-Location -Path $pwd
$ScriptRoot = (Get-Location).Path

# 修改标题
$host.ui.rawui.WindowTitle = "卸载EasyTier服务"

# 检查管理员权限
if (-not ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    Write-Host "请使用管理员权限运行！" -ForegroundColor Red
    Show-Pause -Text "按任意键退出..."
    exit 1
}

# 必要文件检查
$RequiredFiles = @("nssm.exe")
foreach ($file in $RequiredFiles) {
    if (-not (Test-Path (Join-Path $ScriptRoot $file))) {
        Write-Host "缺少必要文件: $file" -ForegroundColor Red
        Show-Pause -Text "按任意键退出..."
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
    Show-Pause -Text "按任意键退出..."
    exit 1
}

Show-Pause -Text "按任意键退出..."
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
