# cfid

Research archive for the public web presence of **Cali_FID Parrot & Exotic Rescue Sanctuary** in Modesto, California.

This repository preserves dated Wayback Machine page screenshots and a source-backed research summary. Archived pages can be incomplete because the Wayback Machine does not always capture every image, stylesheet, script, or embedded service.

## Contents

- `archive/screenshots/` — successfully rendered archived pages; browser connection-error images are excluded
- `archive/manifest.csv` and `archive/manifest.json` — timestamp, original URL, archive URL, content digest, screenshot path, and capture result
- `archive/wayback-cdx.json` — raw Wayback capture index
- `RESEARCH.md` — organization history, services, adoption rules, grants, listings, and source notes
- `scripts/capture-wayback.ps1` — reproducible screenshot collector

## Reproduce the archive

On Windows with Microsoft Edge installed:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/capture-wayback.ps1
```

The Wayback index contains 118 distinct HTML captures. At collection time, 17 rendered successfully and 101 returned an identical browser connection-error page; those error images are intentionally omitted and marked unavailable in the manifests.

Research collected August 22, 2026. Personal contact details are recorded only where they were already published as organizational contact information.

## Website

The focused one-page website lives in `site/`. It uses the archive’s enduring mission, animal categories, adoption principles, and botanical identity while avoiding stale operational claims, listings, payment methods, addresses, and phone numbers.

```powershell
cd site
npm install
npm run dev
```
