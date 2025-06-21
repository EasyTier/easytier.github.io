# 安装 (命令行程序) {#installation}

本章节组仅介绍安装方式，阅读 [快速组网](/guide/network/quick-networking) 文档以了解参数含义和使用方法。

## 安装方式

1. **手动下载命令行程序**

   访问 [⬇️下载页面](./download) 下载适用于您操作系统和硬件架构的 EasyTier 命令行程序。下载后为 ZIP 压缩包，解压后既可直接使用。

   ::: code-group

   ```bash [Linux / MacOS / FreeBSD]
   ./easytier-core --version
   ```

   ```powershell [Windows]
   .\easytier-core.exe --version
   ```

   :::

   ***

2. **DockerHub**

   [DockerHub 镜像地址](https://hub.docker.com/r/easytier/easytier)

   ```sh [docker]
   # docker.io 镜像
   docker pull easytier/easytier:latest
   docker run -d --privileged --network host easytier/easytier:latest

   # 国内用户可以使用 DaoCloud 镜像
   docker pull m.daocloud.io/docker.io/easytier/easytier:latest
   docker run -d --privileged --network host m.daocloud.io/docker.io/easytier/easytier:latest
   ```

   请继续阅读 [快速组网](/guide/network/quick-networking) 文档以了解参数含义和使用方法。

   ***

3. **通过Docker Compose安装**

   ::: details docker-compose.yml

   ```yaml [docker-compose.yml]
   services:
     watchtower: # 用于自动更新easytier镜像，若不需要请删除这部分
       image: containrrr/watchtower
       container_name: watchtower
       restart: unless-stopped
       environment:
         - TZ=Asia/Shanghai
         - WATCHTOWER_NO_STARTUP_MESSAGE
       volumes:
         - /var/run/docker.sock:/var/run/docker.sock
       command: --interval 3600 --cleanup --label-enable
     easytier:
       image: easytier/easytier:latest # 国内用户可以使用 m.daocloud.io/docker.io/easytier/easytier:latest
       hostname: easytier
       container_name: easytier
       labels:
         com.centurylinklabs.watchtower.enable: 'true'
       restart: unless-stopped
       network_mode: host
       cap_add:
         - NET_ADMIN
         - NET_RAW
       environment:
         - TZ=Asia/Shanghai
       devices:
         - /dev/net/tun:/dev/net/tun
       volumes:
         - /etc/easytier:/root
         - /etc/machine-id:/etc/machine-id:ro # 映射宿主机机器码
       command: -d --network-name <用户> --network-secret <密码> -p tcp://public.easytier.cn:11010
   ```

   :::

   ***

4. **一键安装脚本（仅 Linux）**

   注意：一键脚本依赖 `unzip`，请提前下载并安装。

   ```bash
   wget -O /tmp/easytier.sh "https://raw.githubusercontent.com/EasyTier/EasyTier/main/script/install.sh" && sudo bash /tmp/easytier.sh install --gh-proxy https://ghfast.top/
   ```

   脚本执行成功后，EasyTier 的二进程程序会安装到 `/opt/easytier` 目录下，配置文件位于 `/opt/easytier/config/default.conf`。

   配置文件可通过 [配置文件生成器](https://easytier.cn/web/index.html#/config_generator) 生成。

   EasyTier 会被注册为系统服务，可以通过以下命令管理：

   ```bash
   systemctl start easytier@default
   ```

   ***

5. **通过源码安装**

   ```sh [cargo]
   cargo install --git https://github.com/EasyTier/EasyTier.git easytier
   ```

   源码安装需要 Rust 环境，并且安装 LLVM。
