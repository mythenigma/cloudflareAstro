# Pull CN blog inventory: slug + title + noindex status + existing 301 target (if any)
$ErrorActionPreference = 'Stop'
Set-Location (Split-Path -Parent $PSScriptRoot)

$cnDir = (Resolve-Path 'src/content/blog/cn').Path

# Parse existing 301s for cn/*
$redirContent = Get-Content -Raw 'src/data/blog-legacy-redirects.mjs'
$lines301 = $redirContent -split "`n"
$existing301 = @{}
foreach ($line in $lines301) {
    if ($line -match '^\s*"(/blog/cn/[^"]+)"\s*:\s*"(/blog/cn/[^"]+)"') {
        $src = $Matches[1] -replace '^/blog/cn/', ''
        $dst = $Matches[2] -replace '^/blog/cn/', ''
        $existing301[$src] = $dst
    }
}

$out = @()
Get-ChildItem -Path $cnDir -Recurse -Include *.md, *.mdx | Sort-Object FullName | ForEach-Object {
    $raw = Get-Content -Raw $_.FullName

    # Frontmatter-only title
    $fm = ''
    if ($raw -match '(?ms)^---\s*\r?\n(.*?)\r?\n---') { $fm = $Matches[1] }
    $title = ''
    if ($fm -match '(?m)^title:\s*"?([^"\r\n]+?)"?\s*$') { $title = $Matches[1] }

    # Whole-file noindex match (matches astro.config.mjs behavior)
    $noindex = ($raw -match '(^|\n)noindex:\s*true\s*($|\n)')

    $rel = $_.FullName.Substring($cnDir.Length).TrimStart('\', '/')
    $slug = ($rel -replace '\\', '/') -replace '\.(md|mdx)$', ''

    $redirectTo = $existing301[$slug]

    $out += [PSCustomObject]@{
        Slug       = $slug
        Title      = $title
        Noindex    = if ($noindex) { 'Y' } else { '.' }
        RedirectTo = if ($redirectTo) { $redirectTo } else { '' }
        Bytes      = $_.Length
    }
}

# Summary
Write-Host ('Total CN files        : {0}' -f $out.Count)
Write-Host ('  indexable (live)    : {0}' -f ($out | Where-Object { $_.Noindex -eq '.' -and -not $_.RedirectTo }).Count)
Write-Host ('  already 301 source  : {0}' -f ($out | Where-Object { $_.RedirectTo }).Count)
Write-Host ('  noindex-only        : {0}' -f ($out | Where-Object { $_.Noindex -eq 'Y' -and -not $_.RedirectTo }).Count)
Write-Host ''

# Emit a markdown-friendly table sorted by slug
$outFile = 'CN-INVENTORY-RAW.md'
$sb = New-Object System.Text.StringBuilder
[void]$sb.AppendLine('# CN Blog Inventory (raw)')
[void]$sb.AppendLine('')
[void]$sb.AppendLine(('Generated: {0}' -f (Get-Date -Format 'yyyy-MM-dd HH:mm')))
[void]$sb.AppendLine('')
[void]$sb.AppendLine('Legend: `Noindex=Y` means frontmatter or body has `noindex: true`. `RedirectTo` shows existing 301 target (source files usually also marked noindex).')
[void]$sb.AppendLine('')
[void]$sb.AppendLine('| # | Slug | Title | Noindex | 301 -> |')
[void]$sb.AppendLine('|---|---|---|---|---|')
$i = 0
foreach ($row in ($out | Sort-Object Slug)) {
    $i++
    $titleSafe = ($row.Title -replace '\|', '\|')
    [void]$sb.AppendLine(('| {0} | `{1}` | {2} | {3} | {4} |' -f $i, $row.Slug, $titleSafe, $row.Noindex, $row.RedirectTo))
}
Set-Content -Path $outFile -Value $sb.ToString() -Encoding UTF8
Write-Host ('Inventory written     : {0}' -f $outFile)
