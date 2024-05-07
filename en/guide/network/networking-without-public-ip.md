# Networking without Public IP

EasyTier supports networking using shared public nodes. The currently deployed shared public node is

`tcp://easytier.public.kkrainbow.top:11010`

When using shared nodes, each node entering the network needs to provide the same `--network-name` and `--network-secret` parameters as the unique identifier of the network.

Taking two nodes as an example, Node A executes:

```sh
sudo easytier-core -i 10.144.144.1 --network-name abc --network-secret abc -e tcp://easytier.public.kkrainbow.top:11010
```

Node B executes

```sh
sudo easytier-core --ipv4 10.144.144.2 --network-name abc --network-secret abc -e tcp://easytier.public.kkrainbow.top:11010
```

After the command is successfully executed, Node A can access Node B through the virtual IP 10.144.144.2.
