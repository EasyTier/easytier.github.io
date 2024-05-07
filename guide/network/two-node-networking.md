
# 双节点组网

假设双节点的网络拓扑如下
   ```mermaid
   flowchart LR

   subgraph 节点 A IP 22.1.1.1
   nodeA[EasyTier\n10.144.144.1]
   end

   subgraph 节点 B
   nodeB[EasyTier\n10.144.144.2]
   end

   nodeA <-----> nodeB

   ```

1. 在节点 A 上执行：
   ```sh
   sudo easytier-core --ipv4 10.144.144.1
   ```
   命令执行成功会有如下打印。

   ```sh
   $ easytier-core --ipv4 10.144.144.1
   Starting easytier with config:
   ############### TOML ##############

   instance_name = "default"
   instance_id = "7294d13c-d119-49ae-a5f7-8c3a912538d7"
   ipv4 = "10.144.144.1"
   listeners = [
       "tcp://0.0.0.0:11010",
       "udp://0.0.0.0:11010",
       "wg://0.0.0.0:11011",
   ]
   peer = []
   rpc_portal = "127.0.0.1:15888"

   [network_identity]
   network_name = "default"
   network_secret = ""

   [flags]
   default_protocol = "tcp"
   enable_encryption = true
   enable_ipv6 = true

   -----------------------------------
   xxxx-xx-xx xx:xx:xx: tun device ready. dev: tun0
   xxxx-xx-xx xx:xx:xx: new listener added. listener: tcp://0.0.0.0:11010
   xxxx-xx-xx xx:xx:xx: new listener added. listener: udp://0.0.0.0:11010
   ````

2. 在节点 B 执行
   ```sh
   sudo easytier-core --ipv4 10.144.144.2 --peers udp://22.1.1.1:11010
   ```

3. 测试联通性

   两个节点应成功连接并能够在虚拟子网内通信
   ```sh
   ping 10.144.144.2
   ```

   使用 easytier-cli 查看子网中的节点信息
   ```sh
   easytier-cli peer
   ```
   | ipv4          | hostname | cost | lat_ms | loss_rate | rx_bytes | tx_bytes | tunnel_proto | nat_type | id        |
   | :------------ | :------- | :--- | :----- | :-------- | :------- | :------- | :----------- | :------- | :-------- |
   | 10.144.144.1  | abc-dec  | 1    | 3.452  | 0         | 17.33kB  | 20.42kB  | udp          | FullCone | 390879727 |
   
   ```sh
   easytier-cli route
   ```
   | ipv4         | hostname | proxy_cidrs | next_hop_ipv4 | next_hop_hostname | next_hop_lat | cost |
   | :----------- | :------- | :---------- | :------------ | :---------------- | :----------- | :--- |
   | 10.144.144.1 | abc-dec  |             | DIRECT        |                   | 3.646        | 1    |

---