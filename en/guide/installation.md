# Installation (Command Line Program) {#installation}

This section only introduces installation methods. Please read the [Quick Networking](/en/guide/network/quick-networking) documentation to understand parameter meanings and usage methods.

## Installation Methods

1. **Manual Download of Command Line Program**

   Visit the [⬇️Download Page](./download) to download the EasyTier command line program suitable for your operating system and hardware architecture. After downloading, it's a ZIP compressed package that can be used directly after extraction.

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

   [DockerHub Image Address](https://hub.docker.com/r/easytier/easytier)

   ```sh [docker]
   # docker.io image
   docker pull easytier/easytier:latest
   docker run -d --privileged --network host easytier/easytier:latest

   # Domestic users can use DaoCloud image
   docker pull m.daocloud.io/docker.io/easytier/easytier:latest
   docker run -d --privileged --network host m.daocloud.io/docker.io/easytier/easytier:latest
   ```

   Please continue reading the [Quick Networking](/en/guide/network/quick-networking) documentation to understand parameter meanings and usage methods.

   ***

3. **Install via Docker Compose**

   ::: details docker-compose.yml

   ```yaml [docker-compose.yml]
   services:
     watchtower: # Used to automatically update easytier image, delete this part if not needed
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
       image: easytier/easytier:latest # Domestic users can use m.daocloud.io/docker.io/easytier/easytier:latest
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
         - /etc/machine-id:/etc/machine-id:ro # Map host machine code
       command: -d --network-name abc --network-secret abc -p tcp://public.easytier.cn:11010
   ```

   :::

   ***

4. **One-Click Installation Script (Linux Only)**

   Note: The one-click script depends on `unzip`, please download and install it in advance.

   ```bash
   wget -O /tmp/easytier.sh "https://raw.githubusercontent.com/EasyTier/EasyTier/main/script/install.sh" && sudo bash /tmp/easytier.sh install --gh-proxy https://ghfast.top/
   ```

   After the script executes successfully, EasyTier's binary programs will be installed in the `/opt/easytier` directory, and the configuration file is located at `/opt/easytier/config/default.conf`.

   The configuration file can be generated through the [Configuration File Generator](https://easytier.cn/web/index.html#/config_generator).

   EasyTier will be registered as a system service and can be managed with the following commands:

   ```bash
   systemctl start easytier@default
   ```

   ***

5. **Install from Source**

   ```sh [cargo]
   cargo install --git https://github.com/EasyTier/EasyTier.git easytier
   ```

   Source installation requires Rust environment and LLVM installation.
