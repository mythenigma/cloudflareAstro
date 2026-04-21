# Verify every 301 destination resolves to an indexable article file.
$ErrorActionPreference = 'Stop'
Set-Location (Split-Path -Parent $PSScriptRoot)

# Build set of all indexable slugs: "lang/slug" style (matching /blog/lang/slug URLs)
$root = (Resolve-Path 'src/content/blog').Path
$indexable = @{}
$allFiles = @{}
Get-ChildItem -Path $root -Recurse -Include *.md, *.mdx | ForEach-Object {
    $raw = Get-Content -Raw $_.FullName
    $fm = ''
    if ($raw -match '(?ms)^---\s*\r?\n(.*?)\r?\n---') { $fm = $Matches[1] }
    $isNoindex = ($fm -match '(?m)^noindex:\s*true\s*$')
    $rel = $_.FullName.Substring($root.Length).TrimStart('\', '/')
    $id = ($rel -replace '\\', '/') -replace '\.(md|mdx)$', ''
    $allFiles[$id] = $true
    if (-not $isNoindex) { $indexable[$id] = $true }
}

# Parse active redirects
$redirContent = Get-Content -Raw 'src/data/blog-legacy-redirects.mjs'
$lines = $redirContent -split "`n"
$pairs = @()
foreach ($line in $lines) {
    if ($line -match '^\s*"(/blog/[^"]+)"\s*:\s*"(/blog/[^"]+)"') {
        $pairs += [PSCustomObject]@{ From = $Matches[1]; To = $Matches[2] }
    }
}

$broken = @()
$toNoindex = @()
$toOk = 0
foreach ($p in $pairs) {
    $targetId = $p.To -replace '^/blog/', ''
    if ($indexable.ContainsKey($targetId)) {
        $toOk++
    }
    elseif ($allFiles.ContainsKey($targetId)) {
        $toNoindex += $p
    }
    else {
        $broken += $p
    }
}

Write-Host ('Active redirects          : {0}' -f $pairs.Count)
Write-Host ('  -> to INDEXABLE target  : {0}  (ok)' -f $toOk)
Write-Host ('  -> to NOINDEX target    : {0}  (bad: 301 -> hidden page)' -f $toNoindex.Count)
Write-Host ('  -> to MISSING file      : {0}  (bad: 301 -> 404)' -f $broken.Count)

if ($toNoindex.Count -gt 0) {
    Write-Host "`n--- Redirects pointing to noindex targets ---"
    foreach ($p in $toNoindex) { Write-Host (' {0}  ->  {1}' -f $p.From, $p.To) }
}
if ($broken.Count -gt 0) {
    Write-Host "`n--- Redirects pointing to missing files ---"
    foreach ($p in $broken) { Write-Host (' {0}  ->  {1}' -f $p.From, $p.To) }
}
