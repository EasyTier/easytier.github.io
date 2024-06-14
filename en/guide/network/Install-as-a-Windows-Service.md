# Installing as a Windows Service
1. Go to the NSSM official website [https://nssm.cc/download] to download NSSM and extract it to a local directory.
2. Download the command-line version of `easytier-core.exe`, remember the installation directory, such as `D:\Software\Easytier\cli\easytier-core.exe`.
3. Register it as a Windows service, naming it `easytier_service`:
    - `nssm.exe install easytier_service D:\Software\Easytier\cli\easytier-core.exe --ipv4 10.144.144.2 --network-name abc --network-secret abc -e tcp://easytier.public.kkrainbow.top:11010`
4. Run `services.msc`, locate the `easytier_service` service, enable it, and set it to start with a delay.
5. To remove the service: `nssm.exe remove easytier_service`.
6. Note that after registering as a service, the program (referring to easytier-core.exe) cannot be modified, deleted, or moved. Otherwise, it needs to be removed for re-registration or modifying the Windows registry.
7. For convenient execution of `easytier-cli.exe` to view connection status, you can place it in `C:\Users\Administrator` (Administrator being your Windows username). Simply open cmd or PowerShell and execute, for example: `easytier-cli.exe peer`.
