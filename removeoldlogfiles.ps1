Get-ChildItem –Path "D:\Octopus\Logs\AutoUpdateSSLBinding\" -Recurse | Where-Object {($_.LastWrite
Time -lt (Get-Date).AddDays(-90))} | Remove-Item #Removes logfiles older than 90 days
