# Install as a Windows Service

> Thanks to BeiChen℃ for providing the tutorial

On Windows systems, installing certain applications as services allows them to run automatically in the background without manual intervention. This greatly improves the stability and convenience of the application. In this guide, we will use NSSM (Non-Sucking Service Manager) to install the easytier application as a Windows service and walk you through the entire process.

## 1. Preparation

**Download NSSM**:

Open your web browser and visit the NSSM official website [https://nssm.cc/download](https://nssm.cc/download).

On the website, locate the version appropriate for your system (usually the latest version) and click the download link to save it locally.

Once downloaded, extract the zip file to your chosen local directory, for example, `D:\NSSM`.

**Download the easytier Application**:

Find the download link for the latest version of `easytier-windows-x86_64-v2.2.0.zip` and download it locally.

After downloading, extract the zip file to a directory on your system, for instance, `D:\Program Files\EasyTier`.

## 2. Installing as a Windows Service

**Open Command Prompt or PowerShell**:

Press `Win + R` to open the Run dialog box.

Type `cmd` (for Command Prompt) or `powershell` (for PowerShell) and click "OK".

**Navigate to the NSSM Directory**:

In Command Prompt or PowerShell, use the `cd` command to change to the directory where NSSM was extracted. For example, if NSSM was extracted to `D:\NSSM`, type:

```
cd D:\NSSM
```

and press Enter.

**Install the Service**:

Type the following command to install the service:

```
nssm.exe install easytier_service
```

Press Enter. This will open the NSSM configuration window.

## 3. Configuring Service Parameters

**Set the Path**:

In the NSSM configuration window, locate the "Path" field.

Enter the full path to `easytier-core.exe`. For example, if `easytier-core.exe` is in the `D:\Program Files\EasyTier` directory, enter:

```
D:\Program Files\EasyTier\easytier-core.exe
```

**Set the Startup Directory**:

Find the "Startup directory" field and enter the directory where `easytier-core.exe` is located, e.g., `D:\Program Files\EasyTier`.

**Set Arguments**:

In the "Arguments" field, enter any startup parameters you require. For example:

```
-i 10.10.10.2 --network-name easytier --network-secret easytier --peers tcp://public.easytier.top:11010
```

Customize these parameters according to your needs.

![easytier nssm](/assets/win-service.png)

**Save the Configuration and Close the Window**:

After setting the parameters, click the "Edit service" button in the NSSM window to save the configuration and close the window. The `easytier_service` is now installed and configured.

## 4. Removing the Service

If you need to remove the installed service, follow these steps:

**Open Command Prompt or PowerShell**:

Press `Win + R`, enter `cmd` (for Command Prompt) or `powershell` (for PowerShell), and click "OK".

**Navigate to the NSSM Directory**:

Change to the NSSM extraction directory with:

```
cd D:\NSSM
```

Press Enter.

**Remove the Service**:

Type the command:

```
nssm.exe remove easytier_service
```

Press Enter. Follow the prompts to complete the removal of the service.

## 5. Checking Connection Status

To conveniently use `easytier-cli.exe` to check connection status, you can choose one of the following methods:

**Register to the Environment Variables**:

Right-click on "This PC" and select "Properties".

In the window that opens, click on "Advanced system settings" on the left.

In the "System Properties" window, go to the "Advanced" tab and click the "Environment Variables" button.

Under "System variables", locate the "Path" variable and click "Edit".

In the "Edit environment variable" window, click "New" and add the directory path where `easytier-cli.exe` is located. For example, if it is in `D:\Program Files\EasyTier`, add:

```
D:\Program Files\EasyTier
```

Click "OK" to save your changes and close all the windows.

**Place into a Specific Directory**:

Copy the `easytier-cli.exe` file to the `C:\Users\Administrator` directory (replace `Administrator` with your actual Windows username).

Open any Command Prompt or PowerShell window, type:

```
easytier-cli.exe peer
```

and press Enter to check the connection status.

## 6. Notes

Once registered as a service, the program (i.e., `easytier-core.exe`) should not be arbitrarily modified, deleted, or moved. If you need to perform such actions, you must first remove the service and then re-register it or modify the Windows registry accordingly.

Ensure that the service parameters are correctly configured; otherwise, the service might not start properly.

Exercise caution when editing environment variables to avoid removing or altering other important variables.
