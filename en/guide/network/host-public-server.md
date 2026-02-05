# Setting Up a Shared Node

Users can use their own public nodes to set up a public shared node for networking without a public IP, making it easier for other users without a public IP to network. Simply start EasyTier without any parameters, and the node can be used as a public server (no root privileges required):

```
easytier-core
```

Additionally, EasyTier supports shared node clusters. Each virtual network (created with the same network name and key) can act as a shared node cluster, and nodes from other networks can connect to any node in the shared node cluster, discovering each other without a public IP. Running a self-built public server cluster is the same as running a virtual network, but you can skip configuring the IPv4 address.

If you wish to contribute a public server to the EasyTier community, you can contact the administrator, and we will inform you how to add your node to the community shared node list. Of course, this requires your node to have a certain level of bandwidth and stability.

## Disable Forwarding

By default, each EasyTier node allows forwarding services for other virtual networks, even if the node has specified a network name (`--network-name`) and network key (`--network-secret`), and has joined a virtual network.

To change this behavior, you can use the `--relay-network-whitelist` parameter to specify a whitelist of network names that can be forwarded (a space-separated list of wildcards, such as `"ab* abc"`). When this parameter's list is empty, it will not provide forwarding services for any other networks.

EasyTier can avoid forwarding network packets for other virtual networks and only help them establish P2P links by setting the whitelist to empty and configuring it to only forward RPC traffic. The reference command is:

```
easytier-core --relay-network-whitelist --relay-all-peer-rpc
```

## Private Mode

If you want EasyTier to only provide services in your virtual network and don't want nodes from other virtual networks to connect to your node, you can start EasyTier with the `--private-mode true` parameter.

```
sudo easytier-core --private-mode true --network-name my-network --network-secret my-secret
```

This will only allow nodes with network name `my-network` and key `my-secret` to connect to this EasyTier node.
