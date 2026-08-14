# EasyTier CNI（Kubernetes）

EasyTier CNI 可以通过 Multus 为 Kubernetes Pod 添加一个 EasyTier TUN 辅助网卡。Pod 原有的主 CNI 网卡继续负责集群 Service、DNS 和 EasyTier 底层连接，EasyTier 网络只承载分配给辅助网卡的虚拟网段流量。

```mermaid
flowchart LR
  A[Pod A net1] --> B[EasyTier Overlay]
  B --> C[Pod B net1]
  A -. eth0 .-> D[主 CNI / Kubernetes 网络]
  C -. eth0 .-> D
```

::: warning 当前范围
首版仅支持 CNI `1.0.0`、单个 IPv4 地址和 Multus standalone delegate。不修改 Pod 默认路由和 DNS，也不支持 Primary CNI、IPv6 或 chained `prevResult`。
:::

## 前置条件

- Linux Kubernetes 节点，且存在 `/dev/net/tun`。
- 已安装 [Multus CNI](https://github.com/k8snetworkplumbingwg/multus-cni)。
- 已安装 [Whereabouts](https://github.com/k8snetworkplumbingwg/whereabouts)，或其他能返回单个 IPv4 且不返回额外路由的 IPAM 插件。
- 每个 Pod 的主网络都能访问至少一个 EasyTier peer。
- EasyTier 镜像包含 `easytier-core` 和 `easytier-cni`。

::: warning 安全提示
节点 DaemonSet 需要进入 Pod network namespace 并创建 TUN，因此会使用 privileged、hostPID 和宿主 `/run`。生产环境必须固定到包含 CNI 的正式 EasyTier 版本，不要直接使用可变的 `unstable` 标签。
:::

## 1. 创建网络密钥

不要把 EasyTier 网络密钥写进 `NetworkAttachmentDefinition`：

```sh
kubectl -n kube-system create secret generic easytier-cni \
  --from-literal=network-secret="$EASYTIER_NETWORK_SECRET"
```

DaemonSet 会把密钥以 root-only 文件安装到节点。管理 RPC 使用节点上的 root-only Unix socket，不会开放 TCP 管理端口。

## 2. 部署节点 DaemonSet

下载[官方 DaemonSet 清单](https://github.com/EasyTier/EasyTier/blob/main/easytier-contrib/easytier-cni/deploy/daemonset.yaml)，把两个 EasyTier 镜像都固定到相同的正式版本，然后部署：

```sh
kubectl apply -f daemonset.yaml
kubectl -n kube-system rollout status daemonset/easytier-cni
```

确认每个节点都安装了插件并启动管理进程：

```sh
kubectl -n kube-system get pods -l app.kubernetes.io/name=easytier-cni -o wide
```

## 3. 创建辅助网络

以[官方 NAD 示例](https://github.com/EasyTier/EasyTier/blob/main/easytier-contrib/easytier-cni/deploy/network-attachment-definition.yaml)为基础修改：

```json
{
  "cniVersion": "1.0.0",
  "name": "easytier",
  "type": "easytier-cni",
  "rpcPortal": "unix:///run/easytier-cni/rpc.sock",
  "networkName": "kubernetes",
  "networkSecretFile": "/etc/easytier-cni/network-secret",
  "peers": ["tcp://192.0.2.10:11010"],
  "mtu": 1380,
  "timeoutSeconds": 30,
  "ipam": {
    "type": "whereabouts",
    "range": "10.200.0.0/24",
    "range_start": "10.200.0.10",
    "range_end": "10.200.0.250"
  }
}
```

- `peers` 必须能通过 Pod 主网卡访问。建议使用 IP 地址，避免 CNI 阶段依赖集群 DNS。
- EasyTier 地址段不能与节点、Pod、Service、局域网、VPN 或容器运行时网段重叠。
- `mtu` 是 EasyTier packet MTU；TUN MTU 会扣除协议开销，例如 `1380` 对应 TUN MTU `1360`。

完成修改后应用 NAD：

```sh
kubectl apply -f network-attachment-definition.yaml
```

## 4. 为 Pod 添加 EasyTier 网络

在 Pod 上添加 Multus 注解：

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: easytier-client
  annotations:
    k8s.v1.cni.cncf.io/networks: easytier
spec:
  containers:
    - name: client
      image: busybox:1.37.0
      command: ["/bin/sh", "-c", "sleep 3600"]
```

默认辅助网卡名为 `net1`。检查地址和 Multus 网络状态：

```sh
kubectl exec easytier-client -- ip address show net1
kubectl get pod easytier-client \
  -o jsonpath='{.metadata.annotations.k8s\.v1\.cni\.cncf\.io/network-status}'
```

两个 Pod 都连接到相同 EasyTier 网络后，可以直接通过各自的 `net1` IPv4 地址通信。

## 运维注意事项

- 删除 Pod 时，CNI 会删除对应 EasyTier 实例并释放 Whereabouts 地址。
- 节点 daemon 会在 `/var/lib/easytier-cni/configs` 持久化 attachment；目录包含网络凭据，只允许 root 访问。
- 更新 Secret 后，需要重启 `easytier-cni` DaemonSet，并重建已挂载 EasyTier 网络的 Pod。
- 卸载后按需删除节点上的 `/etc/easytier-cni` 和 `/var/lib/easytier-cni`。

完整配置、自动化 netns 测试和 Kind 三节点测试位于 [`easytier-contrib/easytier-cni`](https://github.com/EasyTier/EasyTier/tree/main/easytier-contrib/easytier-cni)。
