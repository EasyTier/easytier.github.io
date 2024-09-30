# 自建公共服务器

用户可以使用自己的公网节点自建用于无公网 IP 组网的公共服务器，方便其他无公网 IP 的用户组网。 需要不带任何参数启动 EasyTier，该节点就可作为公共服务器使用（不需要 root 权限）：

```
easytier-core
```

另外 EasyTier 支持服务器集群。每个虚拟网络（通过相同的网络名称和密钥建链）都可以充当公共服务器集群，其他网络的节点可以连接到公共服务器集群中的任意节点，无需公共 IP 即可发现彼此。运行自建的公共服务器集群与运行虚拟网络完全相同，不过可以跳过配置 ipv4 地址。

也可以使用以下命令加入官方公共服务器集群，后续将实现公共服务器集群的节点间负载均衡：

```
sudo easytier-core --network-name easytier --network-secret easytier -p tcp://public.easytier.top:11010
```

## 关闭转发

另外，默认情况下， EasyTier 的每个节点都允许为其他虚拟网提供转发服务，即使该节点已经指定了 网络名 (`--network-name`) 和 网络密钥 (`--network-secret`)、并已加入一个虚拟网。

若需改变此行为，可通过 `--relay-network-whitelist` 参数限定可被转发的网络名白名单（空格分割的通配符列表，如 ` "ab* abc" `）。当该参数的列表为空时，就不会为所有其他网络提供转发服务。

EasyTier 可以做到不转发其他虚拟网的网络包，而是只帮助他们建立 P2P 链接，只需将白名单置空，并设置仅转发 RPC 流量即可。参考命令为：

```
easytier-core --relay-network-whitelist --relay-all-peer-rpc
```
