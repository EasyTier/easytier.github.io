# GUI Running Modes

EasyTier GUI supports three running modes, allowing users to flexibly deploy and manage the EasyTier core according to different scenarios.

## Introduction to Running Modes

At the bottom of the GUI interface, you can see the mode switcher.

![Mode Switcher](/assets/cn/mode_switcher.png)

### 1. Normal Mode
*   **Description**: This is the default mode. The EasyTier core runs as a child process of the GUI.
*   **Behavior**: When you close the GUI, the EasyTier network connection will also be disconnected.
*   **Use Case**: Temporary networking, open and use as needed.

### 2. Service Mode
*   **Description**: Installs EasyTier as a native system service (Windows Service, systemd, etc.).
*   **Behavior**: EasyTier will run persistently in the background. Even if you close the GUI or log out, the network remains connected. Supports auto-start on boot.
*   **Use Case**: Servers or personal computers that need to be online stably for a long time.
*   **Note**: On Windows, if Service Mode is running, you may need to stop the service in the GUI before updating the software.

### 3. Remote Mode
*   **Description**: The GUI acts only as a management terminal, connecting to an EasyTier instance on a remote machine via RPC.
*   **Behavior**: You can manage EasyTier on headless servers, view status, or modify configurations.
*   **Configuration**: Requires entering the IP address and RPC port (default 15713) of the remote node.

## Configuration Server (Web Console)

In addition to the three core management modes mentioned above, the EasyTier GUI also supports unified configuration management through a **Configuration Server** (Web Console).

*   **Centralized Management**: In both Normal and Service modes, you can fill in the "Configuration Server" information.
*   **Configuration Deployment**: Once connected successfully, the GUI will automatically synchronize configurations from the Web Console and start or stop the network based on server instructions.
*   **Use Case**: Scenarios where multiple nodes need to be managed and you want to control all node configurations uniformly from a web page.

> For more details, please refer to [Networking with Web Console (GUI)](/en/guide/gui/web-console).

## Service Management

In **Service Mode**, you can easily manage system services through the GUI:

*   **Install Service**: Writes the current configuration to the system service and starts it.
*   **Uninstall Service**: Stops and removes the EasyTier service from the system.
*   **Stop/Start**: Temporarily controls the running status of the background service.

> [!TIP]
> It is recommended to click "Uninstall Service" in the GUI before uninstalling the EasyTier software to ensure the system is cleaned up.
