# Networking with Web Console (GUI)

In addition to manual configuration and using public servers, the EasyTier GUI supports centralized management of nodes through the [Web Console](https://easytier.cn/web#/). This allows you to remotely deploy configurations and manage a large number of nodes uniformly.

## Register an Account

If you don't have a Web Console account yet, please visit the [Registration Link](https://easytier.cn/web#/auth/register) to register.

## Configuring in the GUI

In the EasyTier GUI main interface, you can see the "Configuration Server" option:

1. **Enter Server Address/Username**:
   - If you are using the official Web Console, simply enter your **Username**.
   - If you are using a self-hosted console, enter the full server address, such as `udp://<server_ip>:22020/<your_username>`.

2. **Connection Status**:
   - After filling it in, click "Connect" or "Start".
   - The GUI will attempt to connect to the configuration server. Once connected successfully, the interface will typically show a "Connected" status and automatically synchronize the configuration assigned to the device on the server.

## Benefits

- **Remote Deployment**: No need to manually enter complex subnet, peer, and other information on each device; simply connect to the console to retrieve it.
- **Status Monitoring**: View the online status and topology of all GUI nodes in real-time on the Web Console web page.
- **Automatic Application**: When you modify configurations on the web page, all online GUI nodes will automatically receive and apply the new configuration without requiring a manual restart.
