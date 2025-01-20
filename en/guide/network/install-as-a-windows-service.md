# Install as a Windows Service

1. Go to the NSSM official website [https://nssm.cc/download] to download NSSM and extract it to a local directory.
2. Download the command-line version of easytier-core.exe and remember the storage directory, such as `D:\Software\Easytier\cli\easytier-core.exe`.
3. Register it as a Windows service, for example, name it `easytier_service`:
   - `nssm.exe install easytier_service D:\Software\Easytier\cli\easytier-core.exe --ipv4 10.144.144.2 --network-name abc --network-secret abc -e tcp://public.easytier.top:11010`
4. Run `services.msc`, find the easytier_service service, enable it and set it to delayed start.
5. To remove the service: `nssm.exe remove easytier_service`
6. Note that after registering as a service, the program (referring to easytier-core.exe) cannot be modified, deleted, or moved. Otherwise, you need to delete and re-register or modify the Windows registry.
7. To conveniently execute `easytier-cli.exe` to check the connection status, you can store it under `C:\Users\Administrator` (Administrator is your Windows username). You can open cmd or PowerShell at will to execute it, such as: `easytier-cli.exe peer`.
