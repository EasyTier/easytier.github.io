# Using the Web Console

EasyTier supports using the [Web Console](https://easytier.cn/web#/) to manage EasyTier nodes, including viewing node status, configuring node parameters, viewing node logs, and more.

## Register an Account

To use the Web Console for the first time, you need to register an account. [Registration link](https://easytier.cn/web#/auth/register).

## Running EasyTier Node

If you want the EasyTier node to be managed by the Web Console, you need to specify the `--config-server` or `-w` parameter when starting, for example:

```sh
sudo ./easytier-core -w <your username>
```

> Please replace `<your username>` with the username you registered on the Web Console.

If the terminal shows messages like "Connection successful" or "Connected to server", it means Easytier Core has successfully connected to the Web Console server.

::: tip Note
The Web backend identifies devices and persists configurations through machine unique codes. By default, EasyTier automatically obtains the machine unique code from the system. If the machine code acquisition fails, it may cause configuration loss after restart. It is recommended to use the `--machine-id` parameter to specify the machine code, for example:

```sh
sudo ./easytier-core -w <your username> --machine-id abc123
```

Please ensure the machine code is unique and unchanged across all devices. **It is strongly recommended to manually specify the machine code in Docker environments.**
:::

::: danger Note
Only one EasyTier process on a machine can be managed by the Web Console. Having multiple processes may cause unexpected issues.
:::

::: tip Note

You can specify the hostname displayed on the console using the `--hostname <custom hostname>` parameter.

:::

## Using the Web Console

Log in to the [Web Console](https://easytier.cn/web#/) using the username and password you just registered. After logging in successfully, you will see the node list.

Select the device you need to configure on the webpage.

![alt text](/assets/web-homepage.png)

After opening the device, click the green connect button.

![alt text](/assets/web-device-list.png)
![alt text](/assets/web-device-config.png)

Configure

![alt text](/assets/web-device-run-network.png)

The subsequent configuration steps are the same as configuring a program with a GUI.
