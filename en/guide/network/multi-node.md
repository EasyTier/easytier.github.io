# Multi-node Networking

Based on the two-node networking example just now, if more nodes need to join the virtual network, you can use the following command.

```
sudo easytier-core --ipv4 10.144.144.2 --peers udp://22.1.1.1:11010
```

The `--peers` parameter can fill in the listening address of any node already in the virtual network.

---