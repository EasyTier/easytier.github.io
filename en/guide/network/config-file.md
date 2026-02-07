# Configuration File

Supports using the -c parameter to specify the configuration file path.

```sh
easytier-core -c ./config.yaml
```

::: warning Note
Note: Parameters in the configuration file can be overridden by command line parameters. For example, if `--hostname abc` is specified in the configuration file, but `--hostname xyz` is used in the command line, then the hostname parameter `xyz` from the command line will be used.
:::

Running with parameters can generate a configuration file with the corresponding parameters. The configuration file will be printed in the command line, and you can manually copy and save it as a toml file.

Running `easytier-core` directly without parameters will generate the minimal configuration file.

## Environment Variables in Configuration File

EasyTier supports parsing environment variable placeholders in configuration files. This allows you to separate sensitive information (such as network secrets) from configuration files, making it easier to commit configuration files to version control systems.

### Syntax Rules

Standard Shell-style syntax is supported:
- `${VAR}` or `$VAR`: Use the value of the environment variable `VAR`.
- `${VAR:-default}`: If the environment variable `VAR` is not set, use `default` as the default value.
- `$$`: Escape sequence used to represent a literal `$`. For example, `$$VAR` will be parsed as `$VAR` and will not trigger environment variable replacement.

### Usage Example

Suppose your configuration file `config.toml` looks like this:

```toml
[network_identity]
network_name = "my-network"
network_secret = "${ET_SECRET}"

[[peer]]
uri = "tcp://1.1.1.1:${ET_PORT:-11010}"
```

Set the corresponding environment variables at startup:

```bash
export ET_SECRET="my-secret-key"
export ET_PORT="12345"
easytier-core -c config.toml
```

### Security and Limitations

::: warning Security Notes
1. **Read-only Protection**: Configuration instances that use environment variables are marked as **read-only**. You cannot remotely modify or delete these configurations through the Web Console or GUI.
2. **RPC Leakage Prevention**: To prevent sensitive information leakage, the content of read-only configurations cannot be retrieved through RPC APIs (such as `get_instance_config`).
3. **Applicability**: Environment variable parsing **only takes effect for configurations loaded from the local filesystem**. Configurations delivered remotely via Web or GUI will not parse environment variables.
4. **Disable Feature**: If you need to completely disable this feature, you can use the command-line argument `--disable-env-parsing`.
:::

## Multiple Configuration Files Startup

You can specify multiple configuration files through the `-c` parameter. EasyTier will load multiple configuration files in one process and start multiple virtual networks.

```sh
easytier-core -c ./config1.yaml -c ./config2.yaml
```

::: tip Note
When starting multiple virtual networks using multiple configuration files, the RPC service is shared globally. Settings such as the RPC listening port should be specified via command-line arguments (e.g., `-r`) or environment variables, rather than in individual `.toml` configuration files.
:::

If you need more flexible configuration directory management or real-time management of multiple configurations via the Web, please refer to [Service Management & Hybrid Mode](service-mode.md).

## Configuration File Generator

The official website provides a configuration file generator, which you can access via <a target="_blank" href="https://easytier.cn/web/index.html#config_generator">Configuration File Generator</a> to generate configuration files.
