# Python 示例

本指南提供一个简单的 Python RPC 客户端示例，帮助您快速上手 EasyTier RPC 接口。

::: warning 注意
这是一个**简单的示例**，仅实现最基本的方法调用功能：
- 仅支持基本的 RPC 请求/响应流程
- **未实现压缩功能**：收到压缩数据时会抛出异常
- **未实现分片功能**：收到分片数据时会抛出异常
:::

## 工程结构

```
python-example/
├── proto/                # Proto 生成的 Python 文件
│   └── __init__.py
├── easytier_rpc.py       # RPC 底层通信实现
├── easytier_client.py    # EasyTier 方法客户端
└── main.py               # 使用示例
```

**文件说明**：
- `easytier_rpc.py` - 实现与 EasyTier 的 RPC 底层通信（socket 连接、协议封装、数据收发）
- `easytier_client.py` - EasyTier 各种方法的实现（list_peers、list_routes、get_node_info 等）

## 完整代码

### proto/*_pb2.py

```python
# Proto 生成的 Python 包
# 请使用以下命令生成：
# cd EasyTier/easytier/src/proto
# protoc --python_out=. *.proto
# 然后将生成的 *_pb2.py 文件复制到此目录
```

::: tip Proto 文件导入修复
生成的 `*_pb2.py` 文件需要修改导入方式，将绝对导入改为相对导入：
- 例如：将 `import common_pb2 as common__pb2` 改为 `from . import common_pb2 as common__pb2`
:::

### easytier_rpc.py

RPC 底层通信实现，负责 socket 连接、协议封装和数据收发：

```python
"""
EasyTier RPC 客户端核心实现
基于纯 socket 和 struct
"""

import socket
import struct
from dataclasses import dataclass
from typing import Optional

from proto import common_pb2, api_instance_pb2

@dataclass
class TCPTunnelHeader:
    """TCP 隧道头部 (4 字节)"""
    length: int

    def encode(self) -> bytes:
        return struct.pack('<I', self.length)

    @staticmethod
    def decode(data: bytes) -> 'TCPTunnelHeader':
        return TCPTunnelHeader(length=struct.unpack('<I', data[:4])[0])


@dataclass
class PeerManagerHeader:
    """对等体管理头部 (16 字节)"""
    from_peer_id: int
    to_peer_id: int
    packet_type: int
    flags: int
    forward_counter: int
    reserved: int
    length: int

    def encode(self) -> bytes:
        return struct.pack('<IIBBBBI',
            self.from_peer_id,
            self.to_peer_id,
            self.packet_type,
            self.flags,
            self.forward_counter,
            self.reserved,
            self.length
        )

    @staticmethod
    def decode(data: bytes) -> 'PeerManagerHeader':
        values = struct.unpack('<IIBBBBI', data[:16])
        return PeerManagerHeader(*values)


class EasyTierRPC:
    """EasyTier RPC 客户端"""

    PACKET_TYPE_RPC_REQ = 8
    PACKET_TYPE_RPC_RESP = 9

    def __init__(self, host: str = '127.0.0.1', port: int = 15999):
        self.host = host
        self.port = port
        self.sock: Optional[socket.socket] = None
        self.transaction_id = 0

    def connect(self):
        """连接到 EasyTier 节点"""
        self.sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.sock.connect((self.host, self.port))

    def close(self):
        """关闭连接"""
        if self.sock:
            self.sock.close()
            self.sock = None

    def call(self, proto_name: str, service_name: str, method_index: int,
             request_data: bytes = b'', peer_id: int = 1,
             timeout: float = 5.0) -> bytes:
        """
        调用 RPC 方法

        Args:
            service_name: 服务名称
            method_index: 方法索引
            request_data: 请求数据（protobuf 序列化后的 bytes）
            peer_id: 目标节点 ID
            timeout: 超时时间（秒）

        Returns:
            响应数据（bytes）
        """
        if not self.sock:
            raise RuntimeError("未连接，请先调用 connect()")

        self.transaction_id += 1

        # 包装在 RpcRequest 中
        rpc_request = common_pb2.RpcRequest()
        rpc_request.request = request_data
        rpc_request.timeout_ms = 5000  # 可选

        # 构建 RpcPacket
        rpc_packet = common_pb2.RpcPacket()
        rpc_packet.from_peer = 1
        rpc_packet.to_peer = peer_id
        rpc_packet.transaction_id = self.transaction_id
        rpc_packet.descriptor.domain_name = ""
        rpc_packet.descriptor.proto_name = proto_name
        rpc_packet.descriptor.service_name = service_name
        rpc_packet.descriptor.method_index = method_index
        rpc_packet.body = rpc_request.SerializeToString()
        rpc_packet.is_request = True
        rpc_packet.total_pieces = 1
        rpc_packet.piece_idx = 0
        rpc_packet.trace_id = self.transaction_id
        rpc_packet.compression_info.algo = 1
        rpc_packet.compression_info.accepted_algo = 1

        # 序列化
        rpc_packet_data = rpc_packet.SerializeToString()

        # 构建头部
        peer_manager_header = PeerManagerHeader(
            from_peer_id=1,
            to_peer_id=peer_id,
            packet_type=self.PACKET_TYPE_RPC_REQ,
            flags=0,
            forward_counter=1,
            reserved=0,
            length=len(rpc_packet_data)
        )

        tunnel_header = TCPTunnelHeader(length=16 + len(rpc_packet_data))

        # 发送数据
        packet = tunnel_header.encode() + peer_manager_header.encode() + rpc_packet_data
        self.sock.sendall(packet)

        return self._recv_response(timeout)

    def _recv_response(self, timeout: float) -> bytes:
        """接收响应"""
        self.sock.settimeout(timeout)

        # 读取隧道头部
        tunnel_data = self._recv_exact(4)
        tunnel_header = TCPTunnelHeader.decode(tunnel_data)

        # 读取剩余数据
        remaining = self._recv_exact(tunnel_header.length)

        # 解析对等体管理头部
        peer_header = PeerManagerHeader.decode(remaining[:16])

        # 解析 RpcPacket
        rpc_packet_data = remaining[16:16 + peer_header.length]
        rpc_packet = common_pb2.RpcPacket()
        rpc_packet.ParseFromString(rpc_packet_data)

        # 判断是否压缩和分片
        if rpc_packet.compression_info.algo != 1:
            raise NotImplementedError("压缩暂不支持")

        if rpc_packet.total_pieces > 1:
            raise NotImplementedError("分片暂不支持")

        # 解析 RpcResponse
        rpc_response = common_pb2.RpcResponse()
        rpc_response.ParseFromString(rpc_packet.body)

        # 检查错误
        if rpc_response.error.WhichOneof('error_kind'):
            error_kind = rpc_response.error.WhichOneof('error_kind')
            error_detail = getattr(rpc_response.error, error_kind)
            raise Exception(f"RPC 错误类型: {error_kind}\n错误详情: {error_detail}")

        return rpc_response.response

    def _recv_exact(self, size: int) -> bytes:
        """精确接收指定字节数"""
        data = b''
        while len(data) < size:
            chunk = self.sock.recv(size - len(data))
            if not chunk:
                raise ConnectionError("连接已关闭")
            data += chunk
        return data

    def __enter__(self):
        self.connect()
        return self

    def __exit__(self, *args):
        self.close()
```

### easytier_client.py

EasyTier 方法客户端，实现对等体列表、路由表、节点信息等方法的调用：

```python
"""
EasyTier 客户端方法实现
提供更友好的 API
"""

from dataclasses import dataclass
from typing import List, Optional

from easytier_rpc import EasyTierRPC
from proto import api_instance_pb2


@dataclass
class PeerConnection:
    """对等体连接信息"""
    conn_id: str
    tunnel_type: str
    latency_ms: float
    rx_bytes: int
    tx_bytes: int
    loss_rate: float


@dataclass
class Peer:
    """对等体信息"""
    peer_id: int
    connections: List[PeerConnection]


@dataclass
class Route:
    """路由信息"""
    peer_id: int
    hostname: str
    ipv4_addr: str
    next_hop_peer_id: int
    cost: int
    path_latency: int


@dataclass
class NodeInfo:
    """节点信息"""
    peer_id: int
    hostname: str
    ipv4_addr: str
    version: str


class EasyTierClient:
    """EasyTier 客户端"""

    def __init__(self, instance_name: str, host: str = '127.0.0.1', port: int = 15999):
        """
        初始化 EasyTier 客户端

        Args:
            instance_name: 实例名称，用于服务调用
            host: RPC 服务地址，默认 127.0.0.1
            port: RPC 服务端口，默认 15999
        """
        self.instance_name = instance_name
        self.rpc = EasyTierRPC(host, port)

    def connect(self):
        """连接到节点"""
        self.rpc.connect()

    def close(self):
        """关闭连接"""
        self.rpc.close()

    def __enter__(self):
        self.connect()
        return self

    def __exit__(self, *args):
        self.close()

    def list_peers(self) -> List[Peer]:
        """列出所有对等体"""
        # 创建 ListPeerRequest
        request = api_instance_pb2.ListPeerRequest()
        request.instance.instance_selector.name = self.instance_name
        request_data = request.SerializeToString()

        response_data = self.rpc.call(
            proto_name="PeerManageRpc",
            service_name="PeerManageRpc",
            method_index=1,  # ListPeer
            request_data=request_data
        )

        response = api_instance_pb2.ListPeerResponse()
        response.ParseFromString(response_data)

        peers = []
        for peer_info in response.peer_infos:
            connections = []
            for conn in peer_info.conns:
                connections.append(PeerConnection(
                    conn_id=conn.conn_id,
                    tunnel_type=conn.tunnel.tunnel_type,
                    latency_ms=conn.stats.latency_us / 1000,
                    rx_bytes=conn.stats.rx_bytes,
                    tx_bytes=conn.stats.tx_bytes,
                    loss_rate=conn.loss_rate
                ))
            peers.append(Peer(
                peer_id=peer_info.peer_id,
                connections=connections
            ))

        return peers

    def get_node_info(self) -> NodeInfo:
        """获取节点信息"""
        # 创建 ShowNodeInfoRequest
        request = api_instance_pb2.ShowNodeInfoRequest()
        # 设置 instance 字段（使用 InstanceSelector）
        request.instance.instance_selector.name = self.instance_name
        request_data = request.SerializeToString()

        response_data = self.rpc.call(
            proto_name="PeerManageRpc",
            service_name="PeerManageRpc",
            method_index=6,  # ShowNodeInfo
            request_data=request_data
        )

        response = api_instance_pb2.ShowNodeInfoResponse()
        response.ParseFromString(response_data)

        node = response.node_info
        return NodeInfo(
            peer_id=node.peer_id,
            hostname=node.hostname,
            ipv4_addr=node.ipv4_addr,
            version=node.version
        )
```

### main.py

使用示例：

```python
#!/usr/bin/env python3
"""
EasyTier RPC 客户端使用示例
"""

from easytier_client import EasyTierClient

def main():
    # 连接到 EasyTier 节点
    # instance_name: 实例名称，需要与easytier上正在运行的实例名称一致
    with EasyTierClient(
        instance_name='your_instance_name',
        host='127.0.0.1',
        port=15999
    ) as client:

        # 获取节点信息
        print("=== 节点信息 ===")
        node = client.get_node_info()
        print(f"节点 ID: {node.peer_id}")
        print(f"主机名: {node.hostname}")
        print(f"IP 地址: {node.ipv4_addr}")
        print(f"版本: {node.version}")

        # 列出对等体
        print("\n=== 对等体列表 ===")
        peers = client.list_peers()
        print(f"共 {len(peers)} 个对等体:")
        for peer in peers:
            print(f"\n  Peer ID: {peer.peer_id}")
            for conn in peer.connections:
                print(f"    连接类型: {conn.tunnel_type}")
                print(f"    延迟: {conn.latency_ms:.2f} ms")
                print(f"    发送: {conn.tx_bytes / 1024 / 1024:.2f} MB")
                print(f"    接收: {conn.rx_bytes / 1024 / 1024:.2f} MB")

if __name__ == '__main__':
    main()
```

## 运行说明

### 1. 启动 EasyTier 节点

```bash
easytier-core --rpc-portal 15999
```

### 2. 安装依赖

```bash
pip install protobuf
```

### 3. 生成 Proto 文件

需要先克隆 EasyTier 源码，然后生成 Python Proto 文件：

<details>
<summary>如何安装 protoc 编译器？</summary>

Protocol Buffers 编译器 (protoc) 用于将 .proto 文件编译生成 Python 代码。

**Windows：**

```bash
# 使用 Chocolatey
choco install protoc

# 或使用 Scoop
scoop install protoc

# 或手动安装：从 https://github.com/protocolbuffers/protobuf/releases 下载 protoc-<version>-win64.zip，解压后将 bin 目录添加到 PATH
```

**macOS：**

```bash
brew install protobuf
```

**Linux：**

```bash
# Debian/Ubuntu
sudo apt install -y protobuf-compiler

# RHEL/CentOS/Fedora
sudo dnf install -y protobuf-compiler

# Arch Linux
sudo pacman -S protobuf
```

验证安装：

```bash
protoc --version
```

</details>

```bash
# 克隆 EasyTier 源码
git clone https://github.com/EasyTier/EasyTier.git

# 生成 Proto 文件
cd EasyTier/easytier/src/proto
protoc --python_out=. *.proto

# 复制生成的文件到你的项目
cp *_pb2.py your-project/proto/
```

### 4. 修复 Proto 导入

生成的 `*_pb2.py` 文件需要修改导入方式，将绝对导入改为相对导入。例如：

```python
# 将
import common_pb2 as common__pb2
# 改为
from . import common_pb2 as common__pb2
```

### 5. 运行示例

```bash
python main.py
```

## 预期输出

```
=== 节点信息 ===
节点 ID: 1
主机名: my-computer
IP 地址: 10.144.144.1/24
版本: 2.4.5

=== 对等体列表 ===
共 2 个对等体:

  Peer ID: 2
    连接类型: tcp
    延迟: 12.35 ms
    发送: 1.23 MB
    接收: 4.56 MB
```

## 端口说明

| 项目 | 说明 |
|------|------|
| 默认端口 | **15999** |
| 配置方式 | `--rpc-portal` 参数或环境变量 `ET_RPC_PORTAL` |
