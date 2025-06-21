# 搭建共享节点

用户可以使用自己的公网节点自建用于无公网 IP 组网的公共共享节点，方便其他无公网 IP 的用户组网。 需要不带任何参数启动 EasyTier，该节点就可作为公共服务器使用（不需要 root 权限）：

```
easytier-core
```

另外 EasyTier 支持共享节点集群。每个虚拟网络（通过相同的网络名称和密钥建链）都可以充当共享节点集群，其他网络的节点可以连接到共享节点集群中的任意节点，无需公共 IP 即可发现彼此。运行自建的公共服务器集群与运行虚拟网络完全相同，不过可以跳过配置 ipv4 地址。

如果你希望为 EasyTier 社区贡献公共服务器，可以联系管理员，我们将告知你如何将你的节点添加到社区共享节点列表中。当然这需要你的节点有一定的带宽和稳定性。

## 关闭转发

另外，默认情况下， EasyTier 的每个节点都允许为其他虚拟网提供转发服务，即使该节点已经指定了 网络名 (`--network-name`) 和 网络密钥 (`--network-secret`)、并已加入一个虚拟网。

若需改变此行为，可通过 `--relay-network-whitelist` 参数限定可被转发的网络名白名单（空格分割的通配符列表，如 `"ab* abc"`）。当该参数的列表为空时，就不会为所有其他网络提供转发服务。

EasyTier 可以做到不转发其他虚拟网的网络包，而是只帮助他们建立 P2P 链接，只需将白名单置空，并设置仅转发 RPC 流量即可。参考命令为：

```
easytier-core --relay-network-whitelist --relay-all-peer-rpc
```

## 私有模式

如果你希望 EasyTier 仅在你的虚拟网络中提供服务，而不希望其他虚拟网的节点连接到你的节点，可以使用 `--private-mode true` 参数启动 EasyTier。

```
sudo easytier-core --private-mode true --network-name my-network --network-secret my-secret
```

这会仅允许网络名为 `my-network` 且密钥为 `my-secret` 的节点连接到该 EasyTier 节点。