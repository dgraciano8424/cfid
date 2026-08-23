$ErrorActionPreference = "Stop"
$expectedHash = "C8A462FC87EE4F044F00AF621B319C61B929A6973622C58FF9E2F5FFD6AAC4C3"
$root = (Resolve-Path -LiteralPath ".").Path
$screenshotDirectory = (Resolve-Path -LiteralPath "archive/screenshots").Path
if (-not $screenshotDirectory.StartsWith($root, [StringComparison]::OrdinalIgnoreCase)) {
    throw "Screenshot directory is outside the repository."
}

$removed = 0
foreach ($file in Get-ChildItem -LiteralPath $screenshotDirectory -File) {
    if ((Get-FileHash -Algorithm SHA256 -LiteralPath $file.FullName).Hash -eq $expectedHash) {
        Remove-Item -LiteralPath $file.FullName -Force
        $removed++
    }
}

$manifest = Get-Content -Raw -LiteralPath "archive/manifest.json" | ConvertFrom-Json
foreach ($row in $manifest) {
    $row.captured = Test-Path -LiteralPath (Join-Path "archive" $row.screenshot)
}
$manifest | ConvertTo-Json -Depth 3 | Set-Content -Encoding utf8 -LiteralPath "archive/manifest.json"
$manifest | Export-Csv -NoTypeInformation -Encoding utf8 -LiteralPath "archive/manifest.csv"

"Removed $removed error screenshots."
"Available: $(@($manifest | Where-Object captured).Count)"
"Unavailable: $(@($manifest | Where-Object { -not $_.captured }).Count)"
