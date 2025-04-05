# Installation {#installation}

## Installation Methods

1. **Download Precompiled Binaries (Recommended)**

   Visit the [⬇️Download Page](./download) to download the binaries or installation packages for your operating system.

2. **Install via crates.io**

   ```sh [cargo]
   cargo install easytier
   ```

3. **DockerHub**

   [DockerHub Image](https://hub.docker.com/layers/easytier/easytier)

   ```sh [docker]
   docker pull easytier/easytier:latest
   ```

4. **Install via Docker Compose**

   ::: details docker-compose.yml

   ```yaml [docker-compose.yml]
   services:
     watchtower: # Used to automatically update the easytier image, delete this part if not needed
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
       image: easytier/easytier:latest
       command: -i <ip> --network-name <user> --network-secret <password> -p tcp://<server_address>:11010
   ```

   :::

5. **One-Click Installation Script (Linux Only)**

   ```bash
   wget -O /tmp/easytier.sh "https://raw.githubusercontent.com/EasyTier/EasyTier/main/script/install.sh" && bash /tmp/easytier.sh install
   ```

6. **Install from Source**

   ```sh [cargo]
   cargo install --git https://github.com/EasyTier/EasyTier.git easytier
   ```

## Third-Party Tools

- [EasyTier Game (Windows)](/guide/gui/easytier-game)
- [EasyTier Manager (Windows)](/guide/gui/easytier-manager)
- [luci-app-easytier (OpenWrt)](https://github.com/EasyTier/luci-app-easytier)

## FAQ {#faq}

### Question 1

Q: Unable to create a network on Windows 7, the program crashes or reports an error that it cannot create a virtual network.

A: Windows 7 requires SP1 or above, and the installation of [KB3063858](https://www.microsoft.com/en-us/download/details.aspx?id=47409) and [KB4474419](https://www.catalog.update.microsoft.com/search.aspx?q=KB4474419) patches.

### Question 2

Q: The Linux command line help is in English, how to change it to Chinese?

A: You need to set the environment variable LANG=zh_CN, command: `export LANG=zh_CN`

### Question 3

Q: TunError is prompted after startup.

A: Ensure that the TUN driver is correctly loaded and the `/dev/net/tun` file exists. If using Docker, make sure to enable privileged mode. The method to load the Linux TUN driver is:

```bash
modprobe tun
mkdir /dev/net
sudo mknod /dev/net/tun c 10 200
```
