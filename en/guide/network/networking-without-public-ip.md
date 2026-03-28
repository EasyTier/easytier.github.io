# Networking Without Public IP

EasyTier supports networking using shared public nodes. Currently, the following shared public node has been deployed:

`tcp://public.easytier.top:11010`

When using shared nodes, each node entering the network needs to provide the same `--network-name` and `--network-secret` parameters as the unique identifier for the network.

For example, with two nodes:

Node A executes:

::: code-group

```sh [CLI Flags]
sudo easytier-core -i 10.144.144.1 --network-name abc --network-secret abc -p tcp://<Shared Node IP>:11010
```

```toml [Config File]
ipv4 = "10.144.144.1"

[network_identity]
network_name = "abc"
network_secret = "abc"

[[peer]]
uri = "tcp://<Shared Node IP>:11010"
```

:::

Save the configuration above as `node-a.toml`, then start it with `sudo easytier-core -c ./node-a.toml`.

Node B executes:

::: code-group

```sh [CLI Flags]
sudo easytier-core --ipv4 10.144.144.2 --network-name abc --network-secret abc -p tcp://<Shared Node IP>:11010
```

```toml [Config File]
ipv4 = "10.144.144.2"

[network_identity]
network_name = "abc"
network_secret = "abc"

[[peer]]
uri = "tcp://<Shared Node IP>:11010"
```

:::

Save the configuration above as `node-b.toml`, then start it with `sudo easytier-core -c ./node-b.toml`.

After successful execution, Node A can access Node B via the virtual IP `10.144.144.2`.

`--ipv4 x.x.x.x` can be replaced with `-d` to enable DHCP functionality, allowing EasyTier to automatically allocate the IP address of this node based on other existing virtual IPs within the virtual network.

Nodes can connect to multiple public servers. If one public server fails, nodes can still communicate using other active public servers. Simply specify multiple `-p` parameters, such as `-p tcp://1.1.1.1:11010 -p udp://1.1.1.2:11011`. Note that each node in the virtual network must specify the same list of public servers; otherwise, networking may not function properly.

---
