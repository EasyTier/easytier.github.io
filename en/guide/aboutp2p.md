# What is P2P?

P2P (Peer-to-Peer), also called point-to-point or peer networking, means a direct connection between nodes in EasyTier.

Traditional networking architecture is client–server, which in EasyTier corresponds to relay (forwarding via a server).

In a peer architecture, there are only nodes. A node can act as both client and server.

Compared with traditional client–server, P2P offers the following advantages:

**Lower cost**: No extra servers to rent or maintain.

**Lower latency**: Traffic does not detour through a relay server.

**Higher bandwidth**: Throughput depends on the nodes’ own uplinks.

::: danger Warning
These benefits are only realized when all nodes have decent network quality!
:::

## How does P2P relate to NAT, and what’s the impact?

Your NAT type determines whether you can establish a P2P connection with others. Once P2P is established, latency typically drops and available bandwidth is higher.

Even if P2P fails, you can still connect via EasyTier’s relay feature, but latency is usually higher and bandwidth lower.

::: warning Note
Both IPv4 and IPv6 can form P2P connections, but the two peers must use the same IP protocol family to connect P2P!
:::

### P2P Establishment Difficulty Matrix

|            NAT Type             | Open Internet | Symmetric Firewall | Full Cone NAT | Restricted Cone NAT | Port Restricted Cone NAT | Symmetric Easy-Increase NAT | Symmetric NAT |
| :-----------------------------: | :-----------: | :----------------: | :-----------: | :-----------------: | :----------------------: | :-------------------------: | :-----------: |
|        **Open Internet**        |     Easy      |        Easy        |     Easy      |        Easy         |           Easy           |            Easy             |     Easy      |
|     **Symmetric Firewall**      |     Easy      |       Simple       |    Simple     |       Simple        |          Simple          |           Simple            |    Simple     |
|        **Full Cone NAT**        |     Easy      |       Simple       |    Simple     |       Simple        |          Simple          |           Simple            |    Simple     |
|     **Restricted Cone NAT**     |     Easy      |       Simple       |    Simple     |       Medium        |          Medium          |           Medium            |    Medium     |
|  **Port Restricted Cone NAT**   |     Easy      |       Simple       |    Simple     |       Medium        |          Medium          |           Medium            |    Medium     |
| **Symmetric Easy-Increase NAT** |     Easy      |       Simple       |    Simple     |       Medium        |          Medium          |            Hard             |     Hard      |
|        **Symmetric NAT**        |     Easy      |       Simple       |    Simple     |       Medium        |          Medium          |            Hard             |   Very Hard   |

::: tip Info
NAT type affects only how hard it is to establish P2P. It does not guarantee the resulting P2P quality. No NAT type guarantees a 100% P2P success rate.
:::

::: warning Note
EasyTier currently detects NAT type for IPv4 only. In most cases, IPv6 behaves like a Symmetric Firewall. On home broadband, the common NAT types are: Port Restricted Cone, Symmetric Easy-Increase, Symmetric NAT, and Symmetric Firewall (IPv6 only). On mobile data, common types are: Symmetric NAT and Symmetric Firewall (IPv6 only).
:::

## What are NAT and NAPT?

NAT (Network Address Translation) allows hosts in a private LAN to access the Internet by translating private addresses to a public address. Multiple private hosts can share one public IP, ensuring connectivity while conserving public address space.

NAPT (Network Address Port Translation), also called NAT-PT or PAT, maps multiple private addresses onto different ports of the same public address.

::: tip Info
In most scenarios, IPv4 uses NAPT (translating both address and port), while IPv6 typically uses neither NAT nor NAPT (global/public addressing).
:::

## What are NAT types and how do they differ?

NAT type describes how an outside host can connect to an inside host. Below are the types and their characteristics:

::: tip Info
192.168.1.1 (IPv4) and fd00::1 (IPv6) represent private/internal addresses.
:::

### Open Internet (Public/Direct Mapping + Endpoint-Independent Filtering)

No NAT. The host has a public IP and can be reached directly. For example:

IPv4

120.120.120.120:25565 ← 111.111.111.111:x (x is any port)

120.120.120.120:25565 ← 222.222.222.222:x (x is any port)

120.120.120.120:25565 ← 333.333.333.333:x (x is any port)

120.120.120.120:25565 ← 444.444.444.444:x (x is any port)

IPv6

[240e:3fd8:256a:3367::1]:25565 ← [240e::1]:x (x is any port)

[240e:3fd8:256a:3367::1]:25565 ← [240e::2]:x (x is any port)

[240e:3fd8:256a:3367::1]:25565 ← [240e::3]:x (x is any port)

[240e:3fd8:256a:3367::1]:25565 ← [240e::4]:x (x is any port)

Common for public IPs with firewall allow rules or without a firewall.

### Symmetric Firewall (Direct Mapping + Address-and-Port-Dependent Filtering)

Same addressing as Open Internet, but a firewall filters inbound traffic; others cannot directly reach the port:

IPv4
120.120.120.120:25565 ↚ 111.111.111.111:x (x is any port)

120.120.120.120:25565 ↚ 222.222.222.222:x (x is any port)

120.120.120.120:25565 ↚ 333.333.333.333:x (x is any port)

120.120.120.120:25565 ↚ 444.444.444.444:x (x is any port)

IPv6

[240e:3fd8:256a:3367::1]:25565 ↚ [240e::1]:x (x is any port)

[240e:3fd8:256a:3367::1]:25565 ↚ [240e::2]:x (x is any port)

[240e:3fd8:256a:3367::1]:25565 ↚ [240e::3]:x (x is any port)

[240e:3fd8:256a:3367::1]:25565 ↚ [240e::4]:x (x is any port)

Often seen with public IP behind a firewall. Hole punching may still work depending on the firewall policy.

### No PAT NAT (Basic NAT / Endpoint-Independent Mapping + Endpoint-Independent Filtering)

Only the address is translated; the port remains the same. For example:

IPv4

192.168.1.1:25565 ← 120.120.120.120:25565 ← 111.111.111.111:x (x is any port)

192.168.1.1:25565 ← 120.120.120.120:25565 ← 222.222.222.222:x (x is any port)

192.168.1.1:25565 ← 120.120.120.120:25565 ← 333.333.333.333:x (x is any port)

192.168.1.1:25565 ← 120.120.120.120:25565 ← 444.444.444.444:x (x is any port)

IPv6

[fd00::1]:25565 ← [240e:3fd8:256a:3367::1]:25565 ← [240e::1]:x (x is any port)

[fd00::1]:25565 ← [240e:3fd8:256a:3367::1]:25565 ← [240e::2]:x (x is any port)

[fd00::1]:25565 ← [240e:3fd8:256a:3367::1]:25565 ← [240e::3]:x (x is any port)

[fd00::1]:25565 ← [240e:3fd8:256a:3367::1]:25565 ← [240e::4]:x (x is any port)

### Full Cone NAT (Endpoint-Independent Mapping + Endpoint-Independent Filtering / NAT1)

Both address and port are translated. For example:

IPv4

192.168.1.1:25565 ← 120.120.120.120:35565 ← 111.111.111.111:x (x is any port)

192.168.1.1:25565 ← 120.120.120.120:35565 ← 222.222.222.222:x (x is any port)

192.168.1.1:25565 ← 120.120.120.120:35565 ← 333.333.333.333:x (x is any port)

192.168.1.1:25565 ← 120.120.120.120:35565 ← 444.444.444.444:x (x is any port)

IPv6

[fd00::1]:25565 ← [240e:3fd8:256a:3367::1]:35565 ← [240e::1]:x (x is any port)

[fd00::1]:25565 ← [240e:3fd8:256a:3367::1]:35565 ← [240e::2]:x (x is any port)

[fd00::1]:25565 ← [240e:3fd8:256a:3367::1]:35565 ← [240e::3]:x (x is any port)

[fd00::1]:25565 ← [240e:3fd8:256a:3367::1]:35565 ← [240e::4]:x (x is any port)

Policy: I’ve opened 25565 on my LAN host; anyone can reach me via the mapped public port 35565.

### Restricted Cone NAT (Endpoint-Independent Mapping + Address-Dependent Filtering / NAT2)

Adds source IP restriction on top of Full Cone. For example:

IPv4

192.168.1.1:25565 ← 120.120.120.120:35565 ← 111.111.111.111:x (x is any port)

192.168.1.1:25565 ← 120.120.120.120:35565 ↚ 222.222.222.222:x (x is any port)

192.168.1.1:25565 ← 120.120.120.120:35565 ↚ 333.333.333.333:x (x is any port)

192.168.1.1:25565 ← 120.120.120.120:35565 ↚ 444.444.444.444:x (x is any port)

IPv6

[fd00::1]:25565 ← [240e:3fd8:256a:3367::1]:35565 ← [240e::1]:x (x is any port)

[fd00::1]:25565 ← [240e:3fd8:256a:3367::1]:35565 ↚ [240e::2]:x (x is any port)

[fd00::1]:25565 ← [240e:3fd8:256a:3367::1]:35565 ↚ [240e::3]:x (x is any port)

[fd00::1]:25565 ← [240e:3fd8:256a:3367::1]:35565 ↚ [240e::4]:x (x is any port)

Policy: I’ve opened 25565; only the IPs I specify may reach the mapped public port 35565.

The allowed IPs here are 111.111.111.111 and 240e::1.

### Port Restricted Cone NAT (Endpoint-Independent Mapping + Address-and-Port-Dependent Filtering / NAT3)

Adds source port restriction on top of Restricted Cone. For example:

IPv4

192.168.1.1:25565 ← 120.120.120.120:35565 ← 111.111.111.111:11010

192.168.1.1:25565 ← 120.120.120.120:35565 ↚ 111.111.111.111:22020

192.168.1.1:25565 ← 120.120.120.120:35565 ↚ 222.222.222.222:x (x is any port)

192.168.1.1:25565 ← 120.120.120.120:35565 ↚ 333.333.333.333:x (x is any port)

IPv6

[fd00::1]:25565 ← [240e:3fd8:256a:3367::1]:35565 ← [240e::1]:11010

[fd00::1]:25565 ← [240e:3fd8:256a:3367::1]:35565 ↚ [240e::1]:22020

[fd00::1]:25565 ← [240e:3fd8:256a:3367::1]:35565 ↚ [240e::2]:x (x is any port)

[fd00::1]:25565 ← [240e:3fd8:256a:3367::1]:35565 ↚ [240e::3]:x (x is any port)

Policy: I’ve opened 25565; only the IP+port pairs I specify may reach 35565.

The allowed pairs here are 111.111.111.111:11010 and [240e::1]:11010.

### Symmetric Easy-Increase NAT (Address-and-Port-Dependent Mapping + Address-and-Port-Dependent Filtering / NAT4E)

Like Port Restricted Cone but the mapping port pattern increases predictably. For example:

IPv4

192.168.1.1:25565 ← 120.120.120.120:35565 ← 111.111.111.111:11010

192.168.1.1:25565 ← 120.120.120.120:35566 ← 222.222.222.222:22020

192.168.1.1:25565 ← 120.120.120.120:35567 ↚ 111.111.111.111:33030

192.168.1.1:25565 ← 120.120.120.120:35568 ↚ 333.333.333.333:x (x is any port)

IPv6

[fd00::1]:25565 ← [240e:3fd8:256a:3367::1]:35565 ← [240e::1]:11010

[fd00::1]:25565 ← [240e:3fd8:256a:3367::1]:35567 ← [240e::2]:22020

[fd00::1]:25565 ← [240e:3fd8:256a:3367::1]:35569 ↚ [240e::1]:33030

[fd00::1]:25565 ← [240e:3fd8:256a:3367::1]:35571 ↚ [240e::3]:x (x is any port)

The allowed pairs include 111.111.111.111:11010, 222.222.222.222:11010, [240e::1]:11010, [240e::2]:22020.

### Symmetric NAT (Address-and-Port-Dependent Mapping + Address-and-Port-Dependent Filtering / NAT4)

Like Symmetric Easy-Increase but the mapped port is random. For example:

IPv4

192.168.1.1:25565 ← 120.120.120.120:66534 ← 111.111.111.111:11010

192.168.1.1:25565 ← 120.120.120.120:32768 ← 222.222.222.222:22020

192.168.1.1:25565 ← 120.120.120.120:26984 ↚ 111.111.111.111:33030

192.168.1.1:25565 ← 120.120.120.120:16489 ↚ 333.333.333.333:x (x is any port)

IPv6

[fd00::1]:25565 ← [240e:3fd8:256a:3367::1]:55645 ← [240e::1]:11010

[fd00::1]:25565 ← [240e:3fd8:256a:3367::1]:32478 ← [240e::2]:22020

[fd00::1]:25565 ← [240e:3fd8:256a:3367::1]:43269 ↚ [240e::1]:33030

[fd00::1]:25565 ← [240e:3fd8:256a:3367::1]:11443 ↚ [240e::3]:x (x is any port)

The allowed pairs include 111.111.111.111:11010, 222.222.222.222:11010, [240e::1]:11010, [240e::2]:22020.

### Blocked

Firewall is extremely strict; nobody can connect. For example:

IPv4

192.168.1.1:25565 ← 120.120.120.120:66534 ↚ Any IP + any port

IPv6

[fd00::1]:25565 ← [240e:3fd8:256a:3367::1]:55645 ↚ Any IP + any port

## What is hole punching?

First, understand a stateful firewall:

Although we talk about inbound and outbound directions, every connection is fundamentally bidirectional with packets flowing both ways. A stateful firewall maintains a State Table of active connections. Upon receiving a packet, it checks not only headers (source/destination IP/port, protocol) but also whether the packet belongs to an already established, trusted connection.

In most cases, NAT devices include a stateful firewall (e.g., the Symmetric Firewall above). If A sends a packet to B’s IP and port, even if B initially drops it, once B replies to A’s IP+port, B’s return packets can pass A’s firewall. See below:

![A to B](/assets/cn/aboutp2p1.png)

![B replies to A](/assets/cn/aboutp2p2.png)

![After passing the firewall](/assets/cn/aboutp2p3.png)

As you can see, a connection is formed across the firewalls and a “hole” appears in the firewall — hence “hole punching”.

## Why can’t I establish a P2P connection?

Given the above, with NAT alone P2P is almost always possible. However, virtually all environments deploy firewalls. If the operator’s firewall policies are strict, P2P may fail.

## How can I improve P2P success rate?

### Adjust firewall rules

Allowing EasyTier’s ports through can significantly improve the success rate. You may need to adjust multiple devices to take effect.

::: warning Note
This method requires the NAT type to be **Symmetric Firewall (Direct Mapping + Address-and-Port-Dependent Filtering)**.
:::

### Enable IPv6

IPv6 is typically globally reachable; P2P success is near 100%. All nodes must have IPv6, though.

### Change NAT type

For IPv4, try to change to **Full Cone NAT (Endpoint-Independent Mapping + Endpoint-Independent Filtering / NAT1)** or more permissive types. For IPv6, disable NAT66 or ensure it behaves like **Full Cone NAT** or more permissive. Methods vary by ISP/router.

::: warning Note
Some ISPs restrict changing NAT type. Contact your operator if needed.
:::

### Enable UPnP on your router

UPnP can automatically configure port forwarding rules and may help P2P succeed.

### Purchase a public IPv4 from your ISP

If other peers cannot obtain IPv6 for some reason, buying a public IPv4 from your ISP can make P2P almost guaranteed.
