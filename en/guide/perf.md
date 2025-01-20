# Performance Testing

Software and versions involved in the test (to avoid bias and for fair treatment, use "X" as a placeholder):

| Software          | Version           | Link                                 |
| ----------------- | ----------------- | ------------------------------------ |
| EasyTier          | 1.2.1             | https://github.com/EasyTier/EasyTier |
| Networking Tool A | July 2024 Version |                                      |

To be tested:

- WireGuard
- TailScale
- ZeroTier

## X86

|               |                                              |
| ------------- | -------------------------------------------- |
| Machine Model | Alibaba Cloud ecs.ic5.2xlarge                |
| vCPU          | 8 vCPU                                       |
| RAM           | 8G                                           |
| CPU Model     | Intel(R) Xeon(R) Platinum 8163 CPU @ 2.50GHz |
| OS            | Ubuntu 22.04 64-bit                          |

## Test Results

|     Software      |     Test Item     | Performance ( No -R / With -R ) Gbit/s |
| :---------------: | :---------------: | :------------------------------------: |
|  LoopBack Device  |                   |              28.3 / 28.3               |
|     EasyTier      | UDP No Encryption |              1.43 / 1.46               |
|     EasyTier      |  UDP AES-128-GCM  |              1.36 / 1.37               |
|     EasyTier      | TCP No Encryption |              1.31 / 1.41               |
|     EasyTier      |  TCP AES-128-GCM  |              1.42 / 1.41               |
|                   |                   |                                        |
| Networking Tool A | UDP No Encryption |              1.10 / 1.11               |
| Networking Tool A |  UDP AES-128-GCM  |              0.93 / 0.98               |

## Reproduction Method

### Basic Preparation

The test is based on Linux network namespace functionality and can be performed using Ubuntu virtual machines, physical machines, Docker containers, etc.

Initialization commands (execute with root privileges)

```bash
apt update
apt install iperf3 iptables -y

ip netns add red
ip netns add green
ip link add br0 type bridge
ip link set br0 up
ip addr add 192.168.0.1/16 dev br0

ip link add vethcab0 type veth peer name red0
ip link set vethcab0 master br0
ip link set red0 netns red
ip netns exec red ip link set lo up
ip netns exec red ip link set red0 up
ip netns exec red ip addr add 192.168.0.2/16 dev red0
ip netns exec red ip route add default via 192.168.0.1
ip link set vethcab0 up

ip link add vethcab1 type veth peer name green0
ip link set vethcab1 master br0
ip link set green0 netns green
ip netns exec green ip link set lo up
ip netns exec green ip link set green0 up
ip netns exec green ip addr add 192.168.0.3/16 dev green0
ip netns exec green ip route add default via 192.168.0.1
ip link set vethcab1 up

sysctl net.ipv4.ip_forward=1
sysctl net.bridge.bridge-nf-call-iptables=0
sysctl net.bridge.bridge-nf-call-ip6tables=0
sysctl net.ipv6.conf.lo.disable_ipv6=0

# Note: EasyTier does not rely on public network services, so iptables forwarding can be omitted
iptables -t nat -A POSTROUTING -j MASQUERADE
iptables -t nat -A POSTROUTING -s 192.168.0.0/24 -o eth0 -j MASQUERADE
iptables -A FORWARD -i eht0 -j ACCEPT
iptables --policy FORWARD ACCEPT

nohup ip netns exec red iperf3 -s &
```

Additionally, ensure that the programs to be tested are in the PATH environment variable.

The following iperf3 command does not include -R; in actual tests, data with -R will be measured.

### LoopBack

```bash
ip netns exec green iperf3 -c 192.168.0.2
```

### EasyTier

#### UDP No Encryption:

```bash
ip netns exec red easytier-core -i 10.126.126.2 --multi-thread -u
ip netns exec green easytier-core -i 10.126.126.3 -p udp://192.168.0.2:11010 --multi-thread -u
ip netns exec green iperf3 -c 10.126.126.2
```

#### UDP Encryption:

```bash
ip netns exec red easytier-core -i 10.126.126.2 --multi-thread
ip netns exec green easytier-core -i 10.126.126.3 -p udp://192.168.0.2:11010 --multi-thread
ip netns exec green iperf3 -c 10.126.126.2
```

#### TCP No Encryption

```bash
ip netns exec red easytier-core -i 10.126.126.2 --multi-thread -u
ip netns exec green easytier-core -i 10.126.126.3 -p tcp://192.168.0.2:11010 --multi-thread -u
ip netns exec green iperf3 -c 10.126.126.2
```

#### TCP Encryption

```bash
ip netns exec red easytier-core -i 10.126.126.2 --multi-thread
ip netns exec green easytier-core -i 10.126.126.3 -p tcp://192.168.0.2:11010 --multi-thread
ip netns exec green iperf3 -c 10.126.126.2
```

### Networking Tool A

#### UDP No Encryption

```bash
ip netns exec red xxx -k iperf -s 8.134.146.7:29872 --ip 10.26.0.2
ip netns exec green xxx -k iperf -s 8.134.146.7:29872 --ip 10.26.0.3
ip netns exec green iperf3 -c 10.26.0.2
```

#### UDP Encryption

```bash
ip netns exec red xxx -k iperf -s 8.134.146.7:29872 -w 1234 --ip 10.26.0.2
ip netns exec green xxx -k iperf -s 8.134.146.7:29872 -w 1234 --ip 10.26.0.3
ip netns exec green iperf3 -c 10.26.0.2
```
