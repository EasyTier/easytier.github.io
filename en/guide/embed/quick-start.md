# Quick Start

### Prerequisites

- Install **ESP-IDF 6.1** (other versions have not been verified, and consistent behavior is not guaranteed);
- An **ESP32-S3** development board (N16R8 recommended, with **PSRAM enabled**; otherwise the default configuration may easily fail during allocation);
- An accessible EasyTier entry point (optional; the example can still be built and run without one, but networking will not succeed).
## Example Project

### Clone the Source Code

```bash
# GitHub
git clone https://github.com/EasyTier/easytier-esp.git
# Or CNB in China
# git clone https://cnb.cool/myqfeng/qteasytier/easytier-esp.git
cd easytier-esp
```

The `main/` directory is a complete example project, including Wi-Fi connection, networking, status printing, and an HTTP control service. The component source and the example are built within the same project, so **no additional component installation is required**.

### Create `main/easytier.toml`

This file may contain sensitive information and is ignored by `.gitignore`, so you need to create it manually:

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

Key points:
- Replace `192.0.2.10:11010` with your entry address and `<YOUR_NETWORK_SECRET>` with your network secret;
- To use a static virtual address, remove `dhcp = true` and use `ipv4 = "10.144.144.10/24"` instead (if both are present, the static address takes precedence);
- The example can still be built and run without this file, but it will only connect to Wi-Fi and will not start EasyTier.

### Configure Wi-Fi

```bash
idf.py menuconfig
```

Go to the **EasyTier-ESP Example** menu and fill in:
- `EXAMPLE_WIFI_SSID` / `EXAMPLE_WIFI_PASSWORD`;
- `EXAMPLE_EASYTIER_TOML_ENABLED` (enabled by default; loads the embedded TOML at startup and starts networking).

The example's `sdkconfig.defaults` already sets `LWIP_MAX_SOCKETS=24` and `MAIN_TASK_STACK_SIZE=8192`. **Do not reduce these values**, otherwise entry connections or TOML parsing may fail.

### Build and Flash

```bash
idf.py set-target esp32s3
idf.py build
idf.py -p /dev/ttyUSB0 flash monitor   # Use COMx on Windows
```

### Observe After Power-On

After startup, first check whether Wi-Fi has obtained an IP:

```text
I (...) et_example: got ip: 192.168.1.50
```

When networking succeeds, you will see:

```text
I (...) ET.PROTO: handshake ok, peer=...
I (...) ET.PROTO: network ready: 1 reachable peer(s)
I (...) et_example: status: state=ready ... vip=10.144.144.10/24 direct=1 ...
```

The status is printed every 10 seconds. Watch for changes in `state`, `vip`, `direct`, and `routes`.

The example also runs an HTTP service on port 80: visiting `http://<device-ip>/` or `/toggle` toggles the **GPIO38** level. The device IP can be its physical Wi-Fi address, or, after networking succeeds, the virtual IP from any EasyTier node.

## Basic Component Usage (When Integrating It Yourself)
### Install the Component

Install the EasyTier-ESP component through the ESP-IDF package manager:

```bash
idf.py add-dependency qtet/easytier-esp
```

Or add the dependency to your application's main/idf_component.yml:

```yaml
dependencies:
  myqfeng/easytier-esp: "^0.0.2"
```

ESP-IDF will then automatically download and install the component when building your application.

### TOML Configuration

EasyTier-ESP uses the same TOML configuration text as upstream. Unsupported settings are not parsed (i.e., silently ignored).

### Core Usage

The component exposes only one core class: `et::Inst` (RAII, namespace `et`). Its lifecycle consists of five steps:

```cpp
et::RuntimeOptions options{};
options.on_event = &on_event;              // Event callback

et::Inst inst(toml_text, options);         // Construct: parse TOML, validate, prepare resources
if (!inst.valid()) { /* Check last_error() and logs */ }

ESP_ERROR_CHECK(inst.start());             // Start: create connections, network interface, tasks
// After Wi-Fi/Ethernet obtains an IP:
ESP_ERROR_CHECK(inst.connect());           // Connect: start connecting to entry points
// (To disconnect: inst.disconnect();)
inst.stop(5000);                           // Stop; destructor releases resources automatically
```

A few key points:

| Item | Description |
| --- | --- |
| `start()` success ≠ networking available | Wait for the `NetworkReady` event or `Status.state == Ready` |
| After Wi-Fi reconnects | Must call `connect()` again after GOT_IP |
| Task stack | Construction runs on the caller's stack; task stack ≥ 8 KiB |
| Changing configuration | Cannot be changed at runtime; destroy the instance and create a new one with the new TOML |
| Configuration failure behavior | Unsupported fields are silently ignored; invalid values for supported fields cause construction to fail |
| Memory | A single instance uses about 92 KiB resident; each peer connection uses about 12 KiB; PSRAM is recommended |

## Troubleshooting Common Symptoms

| Symptom | Check first |
| --- | --- |
| No `got ip` on serial | Wi-Fi SSID/password, signal |
| `got ip` but no `network ready` | Entry address/port, network name and secret |
| `network ready` but ping fails | Peer routes, firewall, virtual subnet conflicts |
| `easytier.toml` not found | Create `main/easytier.toml` and rebuild |

**For more detailed documentation, visit the [EasyTier-ESP documentation site](https://esp.qtet.cn)**
