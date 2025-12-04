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


# Self-Hosted Web Console

EasyTier supports self-hosting a web console for managing EasyTier nodes. The EasyTier Web Console adopts a separated front-end and back-end architecture, consisting of 3 services in design:

1. Web Frontend (default port 11211)
2. Web API Backend (default port 11211)
3. Configuration Delivery Service (default port 22020, UDP protocol)

The web frontend and web API backend are bound to the same port by default, and the configuration delivery service is part of the web API backend.

EasyTier's web console has 2 versions:
- `easytier-web` (web API backend only)
- `easytier-web-embed` (web frontend + web API backend)

Below is an example of deploying both front-end and back-end using `easytier-web-embed`:

```sh
./easytier-web-embed \
    --api-server-port 11211 \
    --api-host "http://127.0.0.1:11211" \
    --config-server-port 22020 \
    --config-server-protocol udp
```

If no content is displayed after running, the deployment is successful.

Here are the descriptions of common parameters for `easytier-web-embed`:
- `--api-server-port`: Port for the web front-end and back-end
- `--api-host`: Specify the access address of the web API backend in the web frontend. Without this setting, you can only manually specify the API backend address in the web frontend.
- `--config-server-port`: Port of the configuration delivery service for easytier-core connection
- `--config-server-protocol`: Protocol of the configuration delivery service for easytier-core connection (tested to support tcp, udp, ws)
- `--web-server-port`: Additional port for listening to the web frontend (note: this setting is not affected by --no-web)
- `--no-web`: Do not run the web frontend (disable the front-end function on the --api-server-port)

After that, open the web console at `http://127.0.0.1:11211` to see the page.

<img width="508" height="618" alt="image" src="https://github.com/user-attachments/assets/099e8ef8-cb71-438b-bc10-4dc5ffe3970b" />

Click `Register` to create an account. If the verification code fails to load, your `--api-host` setting is incorrect.

<img width="508" height="769" alt="image" src="https://github.com/user-attachments/assets/ca66a3c7-878a-4412-8aa3-a9f24ef0e488" />

::: tip Note

You can use the official EasyTier frontend `https://easytier.cn/web` to access your self-hosted Web API backend without needing to self-host the frontend.

:::

## Connecting to the Self-Hosted Web Console

Previously, we set up the web console locally with the configuration delivery port 22020 and UDP protocol. The command for EasyTier to connect to the self-hosted console is:

```sh
./easytier-core -w udp://127.0.0.1:22020/<your_sername_on_the_self-hosted_web_console>
```

Subsequent usage is the same as the official console.

::: tip Attention

The web console has two default accounts. The usernames and passwords are `admin` and `user` respectively. Although these are regular accounts, their existence should still be noted.

:::

