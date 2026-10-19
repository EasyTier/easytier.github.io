# 快速上手

### 前置准备

- 安装 **ESP-IDF 6.1**
- 一块 **ESP32-S3** 开发板（推荐 N16R8，**开启 PSRAM**，否则默认配置容易在分配阶段失败）
- 一个可访问的 EasyTier 入口（可选，没有也能编译运行，只是组网不会成功）。
## 示例工程

### 克隆源码

```bash
# GitHub 
git clone https://github.com/EasyTier/easytier-esp.git
# 或国内 CNB
# git clone https://cnb.cool/myqfeng/qteasytier/easytier-esp.git
cd easytier-esp
```

`main/` 目录就是一个完整的示例工程，包含 Wi-Fi 连接、组网、状态打印和 HTTP 控制服务，组件源码与示例在同一工程内构建，**无需额外安装组件**。

### 创建 `main/easytier.toml`

该文件可能包含敏感信息，已被 `.gitignore` 忽略，需要手动新建：

```toml
instance_name = "esp32-example"
hostname = "esp32-example"
dhcp = true

[network_identity]
network_name = "esp-demo"
network_secret = "<YOUR_NETWORK_SECRET>"

[[peer]]
uri = "tcp://192.0.2.10:11010"

[flags]
mtu = 1380
enable_encryption = true
```

要点：
- 把 `192.0.2.10:11010` 换成你的入口地址，`<YOUR_NETWORK_SECRET>` 换成你的网络密钥；
- 想用静态虚拟地址时，删掉 `dhcp = true`，改为 `ipv4 = "10.144.144.10/24"`（两者同时出现时静态地址优先）；
- 没有此文件也能编译运行，但只连 Wi-Fi，不启动 EasyTier。

### 配置 Wi-Fi

```bash
idf.py menuconfig
```

进入 **EasyTier-ESP 示例** 菜单，填写：
- `EXAMPLE_WIFI_SSID` / `EXAMPLE_WIFI_PASSWORD`；
- `EXAMPLE_EASYTIER_TOML_ENABLED`（默认开启，启动时加载嵌入的 TOML 并组网）。

示例的 `sdkconfig.defaults` 已设置 `LWIP_MAX_SOCKETS=24` 和 `MAIN_TASK_STACK_SIZE=8192`，**不要改小**，否则入口连接或 TOML 解析可能失败。

### 编译与烧录

```bash
idf.py set-target esp32s3
idf.py build
idf.py -p /dev/ttyUSB0 flash monitor   # Windows 换成 COMx
```

### 上电观察

启动后先看 Wi-Fi 拿 IP：

```text
I (...) et_example: got ip: 192.168.1.50
```

组网成功会出现：

```text
I (...) ET.PROTO: handshake ok, peer=...
I (...) ET.PROTO: network ready: 1 reachable peer(s)
I (...) et_example: status: state=ready ... vip=10.144.144.10/24 direct=1 ...
```

状态每 10 秒打印一次，关注 `state`、`vip`、`direct`、`routes` 的变化。

示例还会在 80 端口跑一个 HTTP 服务：访问 `http://<设备IP>/` 或 `/toggle` 会翻转 **GPIO38** 电平。设备 IP 可以是 Wi-Fi 物理地址，组网成功后也可以用虚拟 IP 从任意 EasyTier 节点访问。

## 组件的基本用法（自己集成时）
### 安装组件

通过 ESP-IDF 的包管理器安装 EasyTier-ESP 组件：

```bash
idf.py add-dependency qtet/easytier-esp
```

或者在应用的 main/idf_component.yml 中加入依赖：

```yaml
dependencies:
  myqfeng/easytier-esp: "^0.0.2"
```

这样在构建应用 ESP-IDF 时会自动下载并安装组件。

### TOML 配置说明

EasyTier-ESP 与上游使用同一套 toml 配置文本，对于没有支持的设置项不做解析（即静默忽略）

### 核心用法

组件对外的核心只有一个类：`et::Inst`（RAII，命名空间 `et`），生命周期分五步：

```cpp
et::RuntimeOptions options{};
options.on_event = &on_event;              // 事件回调

et::Inst inst(toml_text, options);         // 构造：解析 TOML、校验、准备资源
if (!inst.valid()) { /* 看 last_error() 和日志 */ }

ESP_ERROR_CHECK(inst.start());             // 启动：创建连接、网卡、任务
// Wi-Fi/以太网拿到 IP 后：
ESP_ERROR_CHECK(inst.connect());           // 连接：开始连入口
// (需要断开时：inst.disconnect();)
inst.stop(5000);                           // 停止；析构自动释放
```

几个关键注意点：

| 事项 | 说明 |
| --- | --- |
| `start()` 成功 ≠ 组网可用 | 要等 `NetworkReady` 事件或 `Status.state == Ready` |
| Wi-Fi 重连后 | 必须在 GOT_IP 后再次 `connect()` |
| 任务栈 | 构造在调用者栈上执行，任务栈 ≥ 8 KiB |
| 修改配置 | 运行期不可改，需析构后用新 TOML 重建实例 |
| 配置失败行为 | 不支持的字段静默忽略；支持的字段写错则构造失败 |
| 内存 | 单实例常驻约 92 KiB，每条 Peer 连接约 12 KiB，建议开 PSRAM |

## 常见现象排查

| 现象 | 先看 |
| --- | --- |
| 串口没有 `got ip` | Wi-Fi SSID/密码、信号 |
| 有 `got ip`，没有 `network ready` | 入口地址/端口、网络名与密钥 |
| 有 `network ready`，ping 不通 | 对端路由、防火墙、虚拟网段冲突 |
| 提示找不到 `easytier.toml` | 创建 `main/easytier.toml` 并重新构建 |

**更详细的文档请前往 [EasyTier-ESP 文档网站](https://esp.qtet.cn)**