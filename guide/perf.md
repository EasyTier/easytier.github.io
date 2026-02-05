# 性能测试

参与测试的软件及其版本（为避嫌 + 公平待遇，用“某”代替）：

| 软件名   | 版本   | 链接                                 |
| -------- | ------ | ------------------------------------ |
| EasyTier | 1.2.1  | https://easytier.cn |
| 某组网工具 A      | 2024.7 月版本 | |

待测：

- WireGuard
- TailScale
- ZeroTier


## X86

|          |                                              |
| -------- | -------------------------------------------- |
| 机器型号 | 阿里云 ecs.ic5.2xlarge                       |
| vCPU     | 8 vCPU                                       |
| RAM      | 8G                                           |
| CPU 型号 | Intel(R) Xeon(R) Platinum 8163 CPU @ 2.50GHz |
| 操作系统 | Ubuntu 22.04 64位                            |

## 测试结果

|     软件      |    测试项目     | 性能 ( 无 -R / 带 -R ) Gbit/s |
| :-----------: | :-------------: | :---------------------------: |
| LoopBack 设备 |                 |          28.3 / 28.3          |
|   EasyTier    |   UDP 无加密    |          1.43 / 1.46          |
|   EasyTier    | UDP AES-128-GCM |          1.36 / 1.37          |
|   EasyTier    |   TCP 无加密    |          1.31 / 1.41          |
|   EasyTier    | TCP AES-128-GCM |          1.42 / 1.41          |
|               |                 |                               |
|      某组网工具 A      |   UDP 无加密    |          1.10 / 1.11          |
|      某组网工具 A      | UDP AES-128-GCM |          0.93 / 0.98          |

## 复现方式

### 基础准备

测试基于 Linux 的网络命名空间功能，使用 Ubuntu 虚拟机、物理机、 Docker 容器等都可以完成测试。

初始化命令(root 权限执行)

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

# 注： EasyTier 不依赖公网服务，可以不配置 iptables 转发
iptables -t nat -A POSTROUTING -j MASQUERADE
iptables -t nat -A POSTROUTING -s 192.168.0.0/24 -o eth0 -j MASQUERADE
iptables -A FORWARD -i eht0 -j ACCEPT
iptables --policy FORWARD ACCEPT

nohup ip netns exec red iperf3 -s &
```

另外需要确保待测试的程序在 PATH 环境变量中

下面的 iperf3 未带 -R，实际测试时会测得带 -R 的数据。

### LoopBack

```bash
ip netns exec green iperf3 -c 192.168.0.2
```

### EasyTier

#### UDP 不带加密：
```bash
ip netns exec red easytier-core -i 10.126.126.2 --multi-thread -u
ip netns exec green easytier-core -i 10.126.126.3 -p udp://192.168.0.2:11010 --multi-thread -u
ip netns exec green iperf3 -c 10.126.126.2
```

#### UDP 加密： 
```bash
ip netns exec red easytier-core -i 10.126.126.2 --multi-thread
ip netns exec green easytier-core -i 10.126.126.3 -p udp://192.168.0.2:11010 --multi-thread
ip netns exec green iperf3 -c 10.126.126.2
```

#### TCP 不带加密

```bash
ip netns exec red easytier-core -i 10.126.126.2 --multi-thread -u
ip netns exec green easytier-core -i 10.126.126.3 -p tcp://192.168.0.2:11010 --multi-thread -u
ip netns exec green iperf3 -c 10.126.126.2
```

#### TCP 加密

```bash
ip netns exec red easytier-core -i 10.126.126.2 --multi-thread
ip netns exec green easytier-core -i 10.126.126.3 -p tcp://192.168.0.2:11010 --multi-thread
ip netns exec green iperf3 -c 10.126.126.2
```

### 某组网工具 A

#### UDP 无加密 

```bash
ip netns exec red xxx -k iperf -s 8.134.146.7:29872 --ip 10.26.0.2
ip netns exec green xxx -k iperf -s 8.134.146.7:29872 --ip 10.26.0.3
ip netns exec green iperf3 -c 10.26.0.2
```

#### UDP 带加密 

```bash
ip netns exec red xxx -k iperf -s 8.134.146.7:29872 -w 1234 --ip 10.26.0.2
ip netns exec green xxx -k iperf -s 8.134.146.7:29872 -w 1234 --ip 10.26.0.3
ip netns exec green iperf3 -c 10.26.0.2
```
