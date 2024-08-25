# Installation {#installation}

1. **Download the precompiled binary file**
   Visit the [GitHub Release page](https://github.com/EasyTier/EasyTier/releases) to download the binary file suitable for your operating system. Release includes both command-line programs and GUI programs in the compressed package.

2. **Install via crates.io**

   ::: code-group

   ```sh [cargo]
   cargo install easytier
   ```

   :::

3. **Install from source code**
   ::: code-group
   ```sh [cargo]
   cargo install --git https://github.com/EasyTier/EasyTier.git
   ```
   :::

4. **Install via Docker Compose**

   ::: code-group			
   
   ```yaml [docker-compose.yml]
   version: "3.8"
   services:
      watchtower: # Used to automatically update the easytier image, delete this part if not needed
            command: --interval 3600 --cleanup --label-enable
            container_name: watchtower
            environment:
                  - WATCHTOWER_NO_STARTUP_MESSAGE
            image: containrrr/watchtower
            restart: always
            volumes:
                  - /var/run/docker.sock:/var/run/docker.sock
      easytier:
            restart: always
            labels:
                  com.centurylinklabs.watchtower.enable: "true"        
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
            command: -i <ip> --network-name <user> --network-secret <password> -e tcp://<server address>:11010 -l <listen address>  
   ```
   :::

   5. One-Click Installation Script (For Linux Only)

    ```bash
    wget -O /tmp/easytier.sh "https://raw.githubusercontent.com/EasyTier/EasyTier/main/script/install.sh" && bash /tmp/easytier.sh install
    ```

# Frequently Asked Questions

## Question 1

Q: On Windows 7, I cannot create a network, the program crashes or fails to create a virtual network.

A: Windows 7 must be Service Pack 1 (SP1) or later, and you need to install the patches [KB3063858](https://www.microsoft.com/en-us/download/details.aspx?id=47409) and [KB4474419](https://www.catalog.update.microsoft.com/search.aspx?q=KB4474419).

## Question 2

Q: The command-line help in Linux is in English, how can I switch it to Chinese?

A: You need to set the environment variable `LANG=zh_CN`. Command: `export LANG=zh_CN`

## Question 3

Q: After starting, I get a TunError message.

A: Ensure that the TUN driver has been correctly loaded and that the file `/dev/net/tun` exists. If using Docker, make sure privilege mode is enabled. To load the Linux TUN driver:

```bash
modprobe tun
mkdir /dev/net
sudo mknod /dev/net/tun c 10 200
```
