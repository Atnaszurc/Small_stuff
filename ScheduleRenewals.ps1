#This passes a list of certificates to renew to the updatevarproject.ps1 file
#Schedule renewals for SSL certificates
$certificatesToRenew = (Get-ChildItem cert: -recurse | Where { $_.Issuer -like "CN=Let*" } | Select Subject).Subject
if (!$certificatesToRenew)
{
	Exit
}
foreach ($certificate in $certificatesToRenew.Substring(3))
{
	$ScriptPath = Split-Path $MyInvocation.InvocationName 
	Invoke-Expression "$ScriptPath\updatevarproject.ps1 $certificate"
}
Exit
