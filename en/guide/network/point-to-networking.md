# Subnet Proxy (Point-to-Network)

Assume the network topology is as follows, and node B wants to share its accessible subnet 10.1.1.0/24 with other nodes.

```mermaid
flowchart LR

subgraph Node A IP 22.1.1.1
nodeA[EasyTier</br>10.144.144.1]
end

subgraph Node B
nodeB[EasyTier</br>10.144.144.2]
end

id1[[10.1.1.0/24]]

nodeA <--> nodeB <-.-> id1

```

The startup parameters for node B's easytier are as follows (add the -n parameter)

```sh
sudo easytier-core --ipv4 10.144.144.2 -n 10.1.1.0/24
```

The subnet proxy information will be automatically synchronized to each node in the virtual network, and each node will automatically configure the corresponding routes. Node A can check if the subnet proxy is effective with the following command.

1. Check if the routing information has been synchronized. The proxy_cidrs column shows the proxied subnets.

   ```sh
   easytier-cli route
   ```

   | ipv4         | hostname | proxy_cidrs | next_hop_ipv4 | next_hop_hostname | next_hop_lat | cost |
   | :----------- | :------- | :---------- | :------------ | :---------------- | :----------- | :--- |
   | 10.144.144.1 | abc-dec  | 10.1.1.0/24 | DIRECT        |                   | 3.25         | 1    |

2. Test if node A can access the nodes under the proxied subnet

   ```sh
   ping 10.1.1.2
   ```

::: warning Note
The -n parameter for subnet proxy can be specified multiple times to proxy multiple subnets; you can also set the mask to 32 to proxy a single IP address.

```sh
easytier-core -n 10.1.1.0/24 -n 10.2.0.0/16 -n 10.3.3.3/32
```

:::

## Manually Specifying Routes

By default, when a node in the virtual network configures a subnet proxy, the subnet proxy segment will be synchronized to all nodes in the virtual network, and a route will be automatically generated to forward packets destined for these segments to the virtual network.

This can simplify networking in most cases, but in some scenarios, users may not want EasyTier to automatically configure routes on the nodes. Users can manually configure the traffic to be forwarded to the virtual network using the `--manual-routes` parameter.

When using `--manual-routes`, only the segments configured with this parameter will enter the virtual network. If the list after this parameter is empty, EasyTier will not handle any traffic for non-virtual network segments.

## Firewall

Since proxy traffic needs to use the system's network stack, the subnet proxy requires the firewall on the virtual network card to be disabled (this applies to both Linux and Windows).

If disabling the firewall is not possible, you can try using a user-space network stack for the subnet proxy, which can avoid the need to configure the firewall. Simply add the `--use-smoltcp` parameter when starting EasyTier.

::: warning Note

The user-space protocol stack will be inferior to the kernel protocol stack in terms of performance, congestion control, etc.

Currently, the `--use-smoltcp` parameter only affects the TCP protocol. UDP and ICMP will use the user-space protocol stack regardless of whether this parameter is used.

:::

## Disabling Built-in NAT

By default, the built-in NAT is enabled in the subnet proxy, which handles packet forwarding in user space. This allows non-gateway devices to act as subnet entry points while circumventing the limitations on packet forwarding across different operating systems.

If Easytier is operating on a gateway device, users can use the --proxy-forward-by-system parameter to delegate the forwarding of subnet proxy packets to the system kernel, in which case the built-in NAT will be disabled.

It is important to note that when this option is enabled, the packet forwarding of the subnet proxy will rely entirely on the operating system. Therefore, please ensure that the operating system's firewall, forwarding rules, routing rules, and other configurations are correctly set up.

---
