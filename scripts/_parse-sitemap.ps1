$ErrorActionPreference = 'Stop'
Set-Location (Split-Path -Parent $PSScriptRoot)

$c = Get-Content -Raw 'dist/sitemap-0.xml'
$matches = [regex]::Matches($c, '<loc>([^<]+)</loc>')
$urls = @($matches | ForEach-Object { $_.Groups[1].Value })

Write-Host ('URL entries in sitemap-0.xml : {0}' -f $urls.Count)
$blog = @($urls | Where-Object { $_ -like '*/blog/*' })
$other = @($urls | Where-Object { $_ -notlike '*/blog/*' })
Write-Host ('  /blog/*                    : {0}' -f $blog.Count)
Write-Host ('  non-blog                   : {0}' -f $other.Count)

Write-Host "`n--- Blog URLs by language (in sitemap) ---"
$blog | ForEach-Object {
    if ($_ -match '/blog/([a-z]+)/') { $Matches[1] }
} | Group-Object | Sort-Object Name | ForEach-Object {
    '{0,-6} {1}' -f $_.Name, $_.Count
}

Write-Host "`n--- Non-blog URLs in sitemap ---"
$other | ForEach-Object { '  ' + $_ }
