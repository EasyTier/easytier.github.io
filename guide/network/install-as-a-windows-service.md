# 安装为 Windows 服务

> 感谢 北辰℃ 提供的教程

在 Windows 系统中，将某些应用程序安装为服务可以使其在后台自动运行，无需用户手动干预，极大地提高了应用的运行稳定性和便捷性。本教程将以使用 NSSM（Non-Sucking Service Manager）工具将 easytier 应用安装为 Windows 服务为例，详细介绍整个操作流程。

## 一、前期准备

**下载 NSSM**：

打开浏览器，访问 NSSM 官网 \[[ht](https://nssm.cc/download)[tps:/](https://nssm.cc/download)[/nssm](https://nssm.cc/download)[.cc/d](https://nssm.cc/download)[ownlo](https://nssm.cc/download)[ad](https://nssm.cc/download)]。

在官网页面中找到适用于你系统的版本（通常是最新版本），点击下载链接将其下载到本地。

下载完成后，将压缩包解压到你指定的本地目录，例如`D:\NSSM`。

**下载 easytier 应用**：

找到最新版本的`easytier-windows-x86_64-v2.2.0.zip`文件下载链接，将其下载到本地。

下载完成后，将该压缩包解压到本地目录，比如`D:\Program Files\EasyTier`。

## 二、安装为 Windows 服务

**打开命令提示符或 PowerShell**：

按下`Win + R`组合键，打开 “运行” 对话框。

在对话框中输入`cmd`（打开命令提示符）或`powershell`（打开 PowerShell），然后点击 “确定” 按钮。

**切换到 NSSM 解压目录**：

在命令提示符或 PowerShell 中，使用`cd`命令切换到 NSSM 解压后的目录。例如，如果 NSSM 解压到了`D:\NSSM`，则输入`cd D:\NSSM`，然后按下回车键。

**安装服务**：

在命令提示符或 PowerShell 中输入`nssm.exe install easytier_service`，然后按下回车键。此时会弹出一个 NSSM 配置窗口。

## 三、配置服务参数

**设置 Path**：

在 NSSM 配置窗口中，找到 “Path” 字段。

将`easytier-core.exe`的完整路径填入该字段。例如，如果`easytier-core.exe`位于`D:\Program Files\EasyTier`目录下，则填写`D:\Program Files\EasyTier\easytier-core.exe`。

**设置 Startup directory**：

找到 “Startup directory” 字段。

填入`easytier-core.exe`所在的目录，即`D:\Program Files\EasyTier`。

**设置 Arguments**：

在 “Arguments” 字段中，填入你需要的启动参数。例如`-i 10.10.10.2 --network-name easytier --network-secret easytier --peers tcp://public.easytier.top:11010`。这些参数根据你的实际需求进行配置。

![easytier nssm](/assets/win-service.png)

**保存配置并关闭窗口**：

完成上述参数设置后，点击 NSSM 配置窗口中的 “Edit service” 按钮，保存配置并关闭窗口。此时，`easytier_service`服务已经安装并配置完成。

## 四、删除服务

如果需要删除已安装的服务，可以按照以下步骤操作：

**打开命令提示符或 PowerShell**：

按下`Win + R`组合键，打开 “运行” 对话框。

在对话框中输入`cmd`（打开命令提示符）或`powershell`（打开 PowerShell），然后点击 “确定” 按钮。

**切换到 NSSM 解压目录**：

使用`cd`命令切换到 NSSM 解压后的目录。例如，如果 NSSM 解压到了`D:\NSSM`，则输入`cd D:\NSSM`，然后按下回车键。

**删除服务**：

在命令提示符或 PowerShell 中输入`nssm.exe remove easytier_service`，然后按下回车键。根据提示完成服务的删除操作。

## 五、查看连接情况

为了方便执行`easytier-cli.exe`查看连接情况，可以采用以下两种方法：

**注册到环境变量**：

右键点击 “此电脑”，选择 “属性”。

在弹出的窗口中，点击左侧的 “高级系统设置”。

在 “系统属性” 窗口中，点击 “高级” 选项卡，然后点击 “环境变量” 按钮。

在 “环境变量” 窗口中，找到 “系统变量” 下的 “Path” 变量，点击 “编辑”。

在弹出的 “编辑环境变量” 窗口中，点击 “新建”，然后将`easytier-cli.exe`所在的目录路径添加进去。例如，如果`easytier-cli.exe`位于`D:\Program Files\EasyTier`目录下，则添加`D:\Program Files\EasyTier`。

点击 “确定” 按钮保存设置，关闭所有窗口。

**存放到指定目录**：

将`easytier-cli.exe`文件复制到`C:\Users\Administrator`目录下（`Administrator`请替换为你自己的 Windows 用户名）。

打开任意一个命令提示符或 PowerShell 窗口，输入`easytier-cli.exe peer`，按下回车键即可查看连接情况。

## 六、注意事项

注册成服务后，程序（指`easytier-core.exe`）不能随意修改、删除或移动。如果需要进行这些操作，需要先删除服务，然后重新注册或修改 Windows 注册表。

在配置服务参数时，确保参数的正确性，否则可能导致服务无法正常启动。

在设置环境变量时，要小心操作，避免误删或误改其他重要的环境变量。
