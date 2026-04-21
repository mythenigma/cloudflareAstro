# Count indexable vs noindex posts, and active vs disabled 301 redirects.
$ErrorActionPreference = 'Stop'
Set-Location (Split-Path -Parent $PSScriptRoot)

$root = (Resolve-Path 'src/content/blog').Path
$rows = Get-ChildItem -Path $root -Recurse -Include *.md, *.mdx | ForEach-Object {
    $raw = Get-Content -Raw $_.FullName
    # Match the same rule astro.config.mjs uses (whole-file regex) — this is
    # the source of truth for what is excluded from the sitemap.
    $noindex = 0
    if ($raw -match '(^|\n)noindex:\s*true\s*($|\n)') { $noindex = 1 }
    # Language = the FIRST path segment under src/content/blog/
    $rel = $_.FullName.Substring($root.Length).TrimStart('\', '/')
    $lang = ($rel -split '[\\/]')[0]
    [PSCustomObject]@{
        Lang    = $lang
        Slug    = $_.BaseName
        Noindex = $noindex
    }
}

Write-Host '===== TOTAL files (.md + .mdx) ====='
Write-Host $rows.Count

$indexable = @($rows | Where-Object { $_.Noindex -eq 0 })
$hidden = @($rows | Where-Object { $_.Noindex -eq 1 })

Write-Host "`n===== INDEXABLE (enters sitemap) ====="
Write-Host $indexable.Count

Write-Host "`n===== noindex:true (excluded from sitemap) ====="
Write-Host $hidden.Count

Write-Host "`n===== Indexable by language ====="
$indexable | Group-Object Lang | Sort-Object Name | ForEach-Object {
    '{0,-6} {1}' -f $_.Name, $_.Count
}

Write-Host "`n===== Noindex by language ====="
$hidden | Group-Object Lang | Sort-Object Name | ForEach-Object {
    '{0,-6} {1}' -f $_.Name, $_.Count
}

Write-Host "`n===== 301 redirects ====="
$redirContent = Get-Content -Raw 'src/data/blog-legacy-redirects.mjs'
$lines = $redirContent -split "`n"
$active = @()
$disabled = @()
foreach ($line in $lines) {
    # Active:   "/blog/xxx": "/blog/yyy",
    if ($line -match '^\s*"(/blog/[^"]+)"\s*:\s*"(/blog/[^"]+)"') {
        $active += [PSCustomObject]@{ From = $Matches[1]; To = $Matches[2] }
        continue
    }
    # Disabled: // "/blog/xxx": "/blog/yyy",
    if ($line -match '^\s*//\s*"(/blog/[^"]+)"\s*:\s*"(/blog/[^"]+)"') {
        $disabled += [PSCustomObject]@{ From = $Matches[1]; To = $Matches[2] }
    }
}
Write-Host ('ACTIVE 301s    : {0}' -f $active.Count)
Write-Host ('Disabled (//)  : {0}' -f $disabled.Count)

Write-Host "`n--- Active 301 by source language ---"
$active | ForEach-Object { ($_.From -split '/')[2] } | Group-Object | Sort-Object Name | ForEach-Object {
    '{0,-6} {1}' -f $_.Name, $_.Count
}
