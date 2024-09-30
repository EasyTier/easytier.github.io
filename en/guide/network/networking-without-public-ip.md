# Networking without Public IP

EasyTier supports networking using shared public nodes. The currently deployed shared public node is

`tcp://public.easytier.top:11010`

When using shared nodes, each node entering the network needs to provide the same `--network-name` and `--network-secret` parameters as the unique identifier of the network.

Taking two nodes as an example, Node A executes:

```sh
sudo easytier-core -i 10.144.144.1 --network-name abc --network-secret abc -p tcp://public.easytier.top:11010
```

Node B executes

```sh
sudo easytier-core --ipv4 10.144.144.2 --network-name abc --network-secret abc -p tcp://public.easytier.top:11010
```

After the command is successfully executed, Node A can access Node B through the virtual IP 10.144.144.2.

`--ipv4 x.x.x.x` can be replaced with `-d` to enable the DHCP function, allowing EasyTier to automatically assign the node's IP address based on other existing virtual IPs within the virtual network.

Nodes can connect to multiple public servers, and even if one public server fails, nodes can still communicate using other active public servers. Simply specify multiple `-p` parameters, such as: `-p tcp://1.1.1.1:11010 -p udp://1.1.1.2:11011`. It is important to note that each node in the virtual network must specify the same list of public servers; otherwise, proper networking may not be achieved.
