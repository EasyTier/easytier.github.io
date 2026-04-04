# 配置文件

支持使用 -c 参数指定配置文件路径。

```sh
easytier-core -c ./config.yaml
```

::: warning 注意
注意：配置文件中的参数可以被命令行覆盖，比如配置文件中指定了 `--hostname abc`，但在命令行中使用 `--hostname xyz`，则会使用命令行中的主机名参数 `xyz`。
:::

使用参数运行可以获得对应参数的配置文件。配置文件会打印在命令行中，可以手动复制对应配置保存为toml文件即可。

在不使用参数的情况下直接运行 `easytier-core` 可以获得最小配置文件。

## 在配置文件中使用环境变量

EasyTier 支持在配置文件中解析环境变量占位符。这使得您可以将敏感信息（如网络密钥）与配置文件分离，方便将配置文件提交到版本控制系统。

### 语法规则

支持标准 Shell 风格的语法：
- `${VAR}` 或 `$VAR`：使用环境变量 `VAR` 的值。
- `${VAR:-default}`：如果环境变量 `VAR` 未设置，则使用 `default` 作为默认值。
- `$$`：转义符，用于表示字面量 `$`。例如 `$$VAR` 会被解析为 `$VAR` 而不会触发环境变量替换。

### 使用示例

假设您的配置文件 `config.toml` 内容如下：

```toml
[network_identity]
network_name = "my-network"
network_secret = "${ET_SECRET}"

[[peer]]
uri = "tcp://1.1.1.1:${ET_PORT:-11010}"
```

在启动时设置对应的环境变量：

```bash
export ET_SECRET="my-secret-key"
export ET_PORT="12345"
easytier-core -c config.toml
```

### 安全与限制

::: warning 安全须知
1. **只读保护**：使用了环境变量的配置实例会被标记为**只读**。您无法通过 Web 控制台或 GUI 远程修改或删除该配置。
2. **RPC 泄露防护**：为了防止敏感信息泄露，只读配置的内容无法通过 RPC API（如 `get_instance_config`）获取。
3. **适用范围**：环境变量解析**仅对从本地文件系统加载的配置生效**。通过 Web 或 GUI 远程下发的配置不会解析环境变量。
4. **禁用功能**：如果需要完全禁用此功能，可以使用命令行参数 `--disable-env-parsing`。
:::

## 多配置文件启动

可以通过 `-c` 参数指定多个配置文件，EasyTier 会在一个进程中加载多个配置文件并启动多个虚拟网络。

```sh
easytier-core -c ./config1.yaml -c ./config2.yaml
```

::: tip 提示
当使用多个配置文件启动多个虚拟网络时，RPC 服务是全局共享的。RPC 监听端口等设置应通过命令行参数（如 `-r`）或环境变量指定，而不应在单个 `.toml` 配置文件中定义。
:::

如果需要更灵活的配置目录管理或通过 Web 实时管理多个配置，请参考[服务管理与混合模式](service-mode.md)。

## 配置文件生成工具

官网提供了配置文件生成工具，可以通过访问 <a target="_blank" href="https://easytier.cn/web/index.html#config_generator">配置文件生成工具</a> 来生成配置文件。
