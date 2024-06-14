# 安装为windows服务﻿
1. 前往NSSM官网[https://nssm.cc/download]下载NSSM并解压到本地目录
2. 下载好命令行版easytier-core.exe，记住存放目录，如`D:\Software\Easytier\cli\easytier-core.exe`
3. 将其注册为windows服务，如命名为`easytier_service`：
    - `nssm.exe install easytier_service D:\Software\Easytier\cli\easytier-core.exe --ipv4 10.144.144.2 --network-name abc --network-secret abc -e tcp://easytier.public.kkrainbow.top:11010`
4. 运行 `services.msc`，找到easytier_service服务，启用并将其设置为延时启动
5. 如要删除服务：`nssm.exe remove easytier_service`
6. 注意注册成服务后程序(指easytier-core.exe)不能修改、删除或移动，否则需要删除以重新注册或修改win注册表
7. 为方便执行`easytier-cli.exe`查看连接情况，可将其存放到`C:\Users\Administrator`(Administrator是你windows用户名)底下，随意打开cmd或powershell即可执行，如：`easytier-cli.exe peer`
