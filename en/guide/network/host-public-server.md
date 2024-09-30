# Self-Hosted Public Server

Users can use their own public IP nodes to host a public server, making it convenient for other users without public IPs to form networks. To start EasyTier as a public server, simply launch `easytier-core` without any parameters (no root permissions required):

```
easytier-core
```

EasyTier supports public server clusters. Each virtual network (created using the same network name and key) can function as a public server cluster. Nodes from other networks can connect to any node in the public server cluster and discover each other without the need for a public IP. Running a self-hosted public server cluster is identical to running a virtual network, except you can skip configuring an IPv4 address.

You can also use the following command to join the official public server cluster. In the future, load balancing between nodes in the public server cluster will be implemented:

```
sudo easytier-core --network-name easytier --network-secret easytier -p tcp://public.easytier.top:11010
```

## Disable Forwarding

By default, every node of EasyTier is capable of providing forwarding services for other virtual networks, even if the node has specified a `--network-name` and `--network-secret` and has joined a virtual network.

If you wish to change this behavior, you can use the `--relay-network-whitelist` parameter to define a whitelist of network names (a space-separated list of wildcard patterns, e.g., `"ab* abc"`). When the list for this parameter is empty, the node will not provide forwarding services for all other networks.

EasyTier can be configured not to forward packets from other virtual networks but instead help establish P2P connections by leaving the whitelist empty and setting it to only forward RPC traffic. The reference command is:

```
easytier-core --relay-network-whitelist --relay-all-peer-rpc
```