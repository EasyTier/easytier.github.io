# 无公网IP组网

EasyTier 支持共享公网节点进行组网。目前已部署共享的公网节点

`tcp://public.easytier.top:11010`

使用共享节点时，需要每个入网节点提供相同的 `--network-name` 和 `--network-secret` 参数，作为网络的唯一标识。

以双节点为例，节点 A 执行：

```sh
sudo easytier-core -i 10.144.144.1 --network-name abc --network-secret abc -p tcp://<共享节点IP>:11010
```

节点 B 执行

```sh
sudo easytier-core --ipv4 10.144.144.2 --network-name abc --network-secret abc -p tcp://<共享节点IP>:11010
```

命令执行成功后，节点 A 即可通过虚拟 IP 10.144.144.2 访问节点 B。

`--ipv4 x.x.x.x` 可以替换为 `-d` 开启 DHCP 功能，由 EasyTier 根据虚拟网内已经存在的其他虚拟 IP 自动的分配本节点的 IP 地址。


节点可以连接到多个公共服务器，当其中一个公共服务器失效后，节点间依然可以使用其他存活的公共服务器通信。只需要指定多个 -p 参数即可，如：`-p tcp://1.1.1.1:11010 -p udp://1.1.1.2:11011`。需要注意，虚拟网中每个节点都要指定相同的公共服务器列表，否则可能无法正常组网。

---
