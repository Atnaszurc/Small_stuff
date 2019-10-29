#Certificates that have expired
$PSEmailServer = "127.0.0.1"
$currentDate = Get-Date -Format F
$Today = Get-Date
$expiredCertificates = (Get-ChildItem cert: -recurse | Where-Object {$_.NotAfter -lt $Today } | Select Subject).Subject
if (!$expiredCertificates)
{
	Exit
}
foreach ($certificate in $expiredCertificates)
{
	Send-MailMessage -To "YourEmail" -From "Expired Certificates <FromEmail>" -Subject "Expired certificate for $certificate" -Body "<b>At $currentDate found expired certificate for $certificate.</b>" -BodyAsHtml
}
