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
