# Round 3 — add `noindex: true` to frontmatter of 47 CN source files being 301'd.
# Careful rules:
#   1. Only insert into the FIRST frontmatter block (before the second ---)
#   2. Skip if frontmatter already has noindex: true
#   3. Preserve UTF-8 BOM if file had it
#   4. Report skipped / added / errors
$ErrorActionPreference = 'Stop'
Set-Location (Split-Path -Parent $PSScriptRoot)

$slugs = @(
    # Cluster 1
    'maipdf-link-generation-guide',
    'maipdf-instant-link-generation-guide',
    'pdf-one-click-share-links-maipdf',
    'pdf-quick-share-3-steps',
    'pdf-to-shareable-link-tutorial',
    # Cluster 2
    'email-pdf-links',
    # Cluster 3
    'pdf-online-preview',
    'pdf-online-viewing-guide',
    'pdf-online-sharing-security-best-practices',
    'how-to-make-pdf-browsable-online',
    # Cluster 4
    'pdf-access-control-viewing-limits',
    'pdf-access-control-view-limits',
    'pdf-access-control-view-limits-expiration',
    'pdf-access-limit-tutorial',
    'pdf-access-limit-control-guide',
    'maipdf-view-count-setting-guide',
    'maipdf-expiration-setting-guide',
    'maipdf-expiration-self-destruct-guide',
    'pdf-temporary-sharing-link',
    # Cluster 5
    'dynamic-watermark-technology',
    'marketing-materials-dynamic-watermark',
    'pdf-watermark-protection-tutorial',
    # Cluster 6
    'mobile-verification-pdf-security-guide',
    # Cluster 7
    'qr-code-pdf-sharing-made-easy',
    'qrcode-share-pdf-3-steps',
    'maipdf-qrcode-generation-guide',
    'qr-codes-future-digital-distribution',
    # Cluster 8
    'pdf-encryption-prevent-forwarding-complete-guide',
    'pdf-disable-printing-protection-guide',
    # Cluster 9A
    'host-pdf-online-secure-sharing-guide',
    'easy-pdf-sharing',
    'smart-pdf-sharing',
    'zero-cost-pdf-sharing',
    'free-pdf-tools-to-boost-productivity',
    'free-pdf-tools-no-download-registration',
    # Cluster 9B
    'pdf-secure-sharing-control',
    'safe-control-pdf',
    'pdf-security-protection',
    # Cluster 10
    'pdf-sharing-introduction',
    'pdf-sharing-control-revolution',
    'pdf-sharing-evolution-smart-control',
    'pdf-sharing-revolution-maipdf',
    'pdf-sharing-like-webpage',
    'pdf-sharing-stickers',
    # Cluster 11
    'designer-portfolio-sharing-tutorial',
    # Cross-cluster duplicate cleanup
    'enterprise-document-security-team-version',
    'pdf-safe-sharing-training-2'
)

$cnDir = (Resolve-Path 'src/content/blog/cn').Path
$added = 0
$skipped = 0
$missing = @()
$errors = @()

foreach ($slug in $slugs) {
    $path = Join-Path $cnDir ($slug + '.md')
    if (-not (Test-Path $path)) {
        $mdxPath = Join-Path $cnDir ($slug + '.mdx')
        if (Test-Path $mdxPath) { $path = $mdxPath }
        else { $missing += $slug; continue }
    }

    try {
        # Read as bytes to detect BOM; content as string preserves newlines
        $bytes = [System.IO.File]::ReadAllBytes($path)
        $hasBom = ($bytes.Length -ge 3 -and $bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF)
        $raw = Get-Content -Raw -LiteralPath $path

        # Extract first frontmatter block: starts at file start with ---, ends at next ---
        $fmMatch = [regex]::Match($raw, '(?ms)^\s*---\s*\r?\n(.*?)\r?\n---\s*(\r?\n|$)')
        if (-not $fmMatch.Success) {
            $errors += ('No frontmatter block: {0}' -f $slug)
            continue
        }

        $fm = $fmMatch.Groups[1].Value

        # Already has noindex: true in frontmatter?
        if ($fm -match '(?m)^noindex:\s*true\s*$') {
            $skipped++
            Write-Host ('  SKIP (already noindex): {0}' -f $slug)
            continue
        }

        # Insert `noindex: true` as the last key of the frontmatter block
        $newFm = $fm.TrimEnd() + "`nnoindex: true"
        $newBlock = "---`n" + $newFm + "`n---"
        # Preserve trailing newline behavior of original block
        $tail = $fmMatch.Groups[2].Value
        $newFull = $newBlock + $tail + $raw.Substring($fmMatch.Index + $fmMatch.Length)

        # Preserve any leading whitespace before first --- (unusual, but safe)
        $leading = $raw.Substring(0, $fmMatch.Index)
        $newFull = $leading + $newFull

        # Write back, preserving BOM status. Always write LF-normalized? No — keep original line endings by
        # ensuring we only introduce "`n" which on Windows will be LF. To keep safe, use the same newlines
        # the file already uses: detect CRLF vs LF.
        $hasCrlf = $raw -match "`r`n"
        if ($hasCrlf) { $newFull = $newFull -replace "(?<!`r)`n", "`r`n" }

        $enc = New-Object System.Text.UTF8Encoding($hasBom)
        [System.IO.File]::WriteAllText($path, $newFull, $enc)

        $added++
        Write-Host ('  ADD noindex          : {0}' -f $slug)
    }
    catch {
        $errors += ('ERROR {0}: {1}' -f $slug, $_.Exception.Message)
    }
}

Write-Host ''
Write-Host ('Added noindex : {0}' -f $added)
Write-Host ('Skipped       : {0}' -f $skipped)
Write-Host ('Missing files : {0}' -f $missing.Count)
if ($missing) { $missing | ForEach-Object { Write-Host "  - $_" } }
Write-Host ('Errors        : {0}' -f $errors.Count)
if ($errors) { $errors | ForEach-Object { Write-Host "  $_" } }
