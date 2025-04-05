# 安装 {#installation}

## 安装方式

1. **下载预编译的二进制文件（推荐）**

   访问 [⬇️下载页面](./download) 下载适用于您操作系统的二进制文件或安装包。

2. **通过 crates.io 安装**

   ```sh [cargo]
   cargo install easytier
   ```

3. **DockerHub**

   [DockerHub 镜像地址](https://hub.docker.com/layers/easytier/easytier)

   ```sh [docker]
   # docker.io 镜像
   docker pull easytier/easytier:latest

   # 国内用户可以使用 DaoCloud 镜像
   docker pull m.daocloud.io/docker.io/easytier/easytier:latest
   ```

4. **通过Docker Compose安装**

   ::: details docker-compose.yml

   ```yaml [docker-compose.yml]
   services:
     watchtower: # 用于自动更新easytier镜像，若不需要请删除这部分
       command: --interval 3600 --cleanup --label-enable
       container_name: watchtower
       environment:
         - TZ=Asia/Shanghai
         - WATCHTOWER_NO_STARTUP_MESSAGE
       image: containrrr/watchtower
       restart: always
       volumes:
         - /var/run/docker.sock:/var/run/docker.sock
     easytier:
       restart: always
       labels:
         com.centurylinklabs.watchtower.enable: 'true'
       privileged: true
       mem_limit: 0m
       container_name: easytier
       hostname: easytier
       network_mode: host
       volumes:
         - /etc/easytier:/root
       environment:
         - TZ=Asia/Shanghai
       image: easytier/easytier:latest # 国内用户可以使用 m.daocloud.io/docker.io/easytier/easytier:latest
       command: -i <ip> --network-name <用户> --network-secret <密码> -p tcp://<服务器地址>:11010
   ```

   :::

5. **一键安装脚本 （仅 Linux）**

   ```bash
   wget -O /tmp/easytier.sh "https://raw.githubusercontent.com/EasyTier/EasyTier/main/script/install.sh" && bash /tmp/easytier.sh install
   ```

6. **通过源码安装**

   ```sh [cargo]
   cargo install --git https://github.com/EasyTier/EasyTier.git easytier
   ```

## 第三方工具

- [EasyTier Game ( Windows )](/guide/gui/easytier-game)
- [EasyTier Manager ( Windows )](/guide/gui/easytier-manager)
- [luci-app-easytier ( OpenWrt )](https://github.com/EasyTier/luci-app-easytier)

## 常见问题 {#faq}

### 问题 1

Q: Windows 7 无法创建网络，程序崩溃或者报错无法创建虚拟网。

A: win7 需要是 SP1 及以上, 并且需要安装 [KB3063858](https://www.microsoft.com/en-us/download/details.aspx?id=47409)、 [KB4474419](https://www.catalog.update.microsoft.com/search.aspx?q=KB4474419) 这两个补丁

### 问题 2

Q: Linux 命令行帮助是英文，如何调整为中文。

A: 需要设置环境变量 LANG=zh_CN，命令： `export LANG=zh_CN`

### 问题 3

Q: 启动后提示 TunError

A: 确认 TUN 驱动已经被正确加载，并且 `/dev/net/tun` 文件存在，如果使用 Docker，需要确保开启了特权模式。Linux TUN 驱动加载方法为：

```bash
modprobe tun
mkdir /dev/net
sudo mknod /dev/net/tun c 10 200
```
