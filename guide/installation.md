# 安装 {#installation}

1. **下载预编译的二进制文件**
   访问 [GitHub Release 页面](https://github.com/EasyTier/EasyTier/releases) 下载适用于您操作系统的二进制文件。Release 压缩包中同时包含命令行程序和图形界面程序。

2. **通过 crates.io 安装**

   ::: code-group

   ```sh [cargo]
   cargo install easytier
   ```

   :::

3. **通过源码安装**
   ::: code-group
   ```sh [cargo]
   cargo install --git https://github.com/EasyTier/EasyTier.git
   ```
   :::

4. **通过Docker Compose安装**  

   ::: code-group			
   
   ```yaml [docker-compose.yml]
   version: "3.8"
   services:
      watchtower: #用于自动更新easytier镜像，若不需要请删除这部分
            command: --interval 3600 --cleanup --label-enable
            container_name: watchtower
            environment:
                  - TZ=Asia/Shanghai
                  - WATCHTOWER_NO_STARTUP_MESSAGE
            image: containrrr/watchtower
            networks:
                  - 1panel-network
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
            command: -i <ip> --network-name <用户> --network-secret <密码> -e tcp://<服务器地址>:11010 -l <监听地址>  
   ```
   :::
