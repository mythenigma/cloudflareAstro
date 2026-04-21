$ErrorActionPreference = 'Stop'
Set-Location (Split-Path -Parent $PSScriptRoot)

$site = 'https://article.maipdf.com'

# 1. All indexable blog URLs expected from files
$root = (Resolve-Path 'src/content/blog').Path
$expected = @{}
Get-ChildItem -Path $root -Recurse -Include *.md, *.mdx | ForEach-Object {
    $raw = Get-Content -Raw $_.FullName
    $fm = ''
    if ($raw -match '(?ms)^---\s*\r?\n(.*?)\r?\n---') { $fm = $Matches[1] }
    if ($fm -match '(?m)^noindex:\s*true\s*$') { return }
    $rel = $_.FullName.Substring($root.Length).TrimStart('\', '/')
    $id = ($rel -replace '\\', '/') -replace '\.(md|mdx)$', ''
    $url = "$site/blog/$id"
    $expected[$url] = $true
}

# 2. URLs actually in sitemap
$c = Get-Content -Raw 'dist/sitemap-0.xml'
$matches = [regex]::Matches($c, '<loc>([^<]+)</loc>')
$actual = @{}
foreach ($m in $matches) { $actual[$m.Groups[1].Value] = $true }

$missing = @()
foreach ($url in $expected.Keys) { if (-not $actual.ContainsKey($url)) { $missing += $url } }

$extra = @()
foreach ($url in $actual.Keys) {
    if ($url -like '*/blog/*' -and -not $expected.ContainsKey($url)) { $extra += $url }
}

Write-Host ('Expected indexable blog URLs : {0}' -f $expected.Count)
Write-Host ('Actual in sitemap (blog)     : {0}' -f ($actual.Keys | Where-Object { $_ -like '*/blog/*' }).Count)
Write-Host ('Missing from sitemap         : {0}' -f $missing.Count)
Write-Host ('Extra in sitemap             : {0}' -f $extra.Count)

if ($missing.Count -gt 0) {
    Write-Host "`n--- Indexable files NOT in sitemap ---"
    $missing | Sort-Object | ForEach-Object { Write-Host "  $_" }
}
if ($extra.Count -gt 0) {
    Write-Host "`n--- In sitemap but not matching a file ---"
    $extra | Sort-Object | ForEach-Object { Write-Host "  $_" }
}
