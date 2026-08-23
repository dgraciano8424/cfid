param(
    [string]$IndexPath = "wayback-cdx.json",
    [string]$OutputDirectory = "archive/screenshots",
    [int]$ShardIndex = 0,
    [int]$ShardCount = 1
)

$ErrorActionPreference = "Continue"
$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if (-not (Test-Path -LiteralPath $edge)) { throw "Microsoft Edge was not found." }

$root = (Resolve-Path -LiteralPath ".").Path
$profile = Join-Path $root ".edge-profile"
$index = Get-Content -Raw -LiteralPath $IndexPath | ConvertFrom-Json
$allRows = @($index | Select-Object -Skip 1)
$rows = @($allRows | Where-Object { ([array]::IndexOf($allRows, $_) % $ShardCount) -eq $ShardIndex })
$output = Join-Path $root $OutputDirectory
New-Item -ItemType Directory -Force -Path $output | Out-Null

$manifest = foreach ($row in $rows) {
    $timestamp = [string]$row[0]
    $original = [string]$row[1]
    $digest = [string]$row[4]
    $uri = [Uri]$original
    $leaf = if ([string]::IsNullOrWhiteSpace($uri.AbsolutePath.Trim('/'))) { "index" } else { ($uri.AbsolutePath.Trim('/') -replace '[^a-zA-Z0-9._-]', '_') }
    $filename = "$timestamp--$leaf.png"
    $destination = Join-Path $output $filename
    $archiveUrl = "https://web.archive.org/web/$timestamp/$original"

    if (-not (Test-Path -LiteralPath $destination)) {
        $captureProfile = Join-Path $profile $timestamp
        $arguments = @(
            "--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run",
            "--disable-extensions", "--user-data-dir=`"$captureProfile`"", "--window-size=1440,1000",
            "--virtual-time-budget=12000", "--screenshot=`"$destination`"", "`"$archiveUrl`""
        )
        Start-Process -FilePath $edge -ArgumentList $arguments -Wait -WindowStyle Hidden | Out-Null
    }

    [pscustomobject]@{
        timestamp = $timestamp
        original_url = $original
        archive_url = $archiveUrl
        digest = $digest
        screenshot = "screenshots/$filename"
        captured = Test-Path -LiteralPath $destination
    }
}

if ($ShardCount -eq 1) {
    $manifest | ConvertTo-Json -Depth 3 | Set-Content -Encoding utf8 -LiteralPath (Join-Path (Split-Path $output -Parent) "manifest.json")
    $manifest | Export-Csv -NoTypeInformation -Encoding utf8 -LiteralPath (Join-Path (Split-Path $output -Parent) "manifest.csv")
}
$manifest | Group-Object captured | Select-Object Name, Count | Format-Table -AutoSize
