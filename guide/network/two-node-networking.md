
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

   ![alt text](/assets/image-2.png)

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
   ![alt text](/assets/image.png)
   ```sh
   easytier-cli route
   ```
   ![alt text](/assets/image-1.png)

---