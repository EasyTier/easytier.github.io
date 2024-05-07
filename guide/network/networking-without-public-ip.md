# 无公网IP组网

EasyTier 支持共享公网节点进行组网。目前已部署共享的公网节点

`tcp://easytier.public.kkrainbow.top:11010`

使用共享节点时，需要每个入网节点提供相同的 `--network-name` 和 `--network-secret` 参数，作为网络的唯一标识。

以双节点为例，节点 A 执行：

```sh
sudo easytier-core -i 10.144.144.1 --network-name abc --network-secret abc -e tcp://easytier.public.kkrainbow.top:11010
```

节点 B 执行

```sh
sudo easytier-core --ipv4 10.144.144.2 --network-name abc --network-secret abc -e tcp://easytier.public.kkrainbow.top:11010
```

命令执行成功后，节点 A 即可通过虚拟 IP 10.144.144.2 访问节点 B。

---
