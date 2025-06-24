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

## Multiple Configuration Files Startup

You can specify multiple configuration files through the `-c` parameter. EasyTier will load multiple configuration files in one process and start multiple virtual networks.

```sh
easytier-core -c ./config1.yaml -c ./config2.yaml
```

## Configuration File Generator

The official website provides a configuration file generator, which you can access via <a target="_blank" href="https://easytier.cn/web/index.html#config_generator">Configuration File Generator</a> to generate configuration files.
