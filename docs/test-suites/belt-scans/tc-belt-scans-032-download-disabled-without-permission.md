# TC-BELT-SCANS-032 — Download Gating — download button hidden without download permission

> Suite: [Belt Scans](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-BELT-SCANS-032 |
| **Suite** | belt-scans |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `belt_scans_download_gating` |
| **Feature File** | `features/regression/belt_scans.feature` |
| **Page Objects** | `src/pages/file-preview.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that when a user does not have `Permission.download` for `BasicModule.beltScan` (`canDownload = false`), the download icon button is completely omitted from `FilePreviewScreen`.

---

## ✅ Preconditions

- User is logged in with view-only permissions (download permission revoked)

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open Belt Scans and tap on a scan with PDF report | `FilePreviewScreen` opens |
| 2 | Check `canDownload` property evaluation | `user?.canAccess(BasicModule.beltScan, Permission.download)` evaluates to `false` |
| 3 | Inspect document header | Download icon button is hidden (`if (widget.canDownload) ...`) |
| 4 | Verify document is still viewable | PDF is rendered in read-only mode |

---

## 🏁 Expected Results

- Download functionality is restricted according to user permissions

---

## 🔍 Flutter Source Reference

```dart
// belt_scan_list_screen.dart & filemanager_preview_screen.dart
final bool canDownloadBeltScan = user?.canAccess(BasicModule.beltScan, Permission.download) ?? false;
// In FilePreviewScreen:
if (widget.canDownload) ...[
  IconButton(icon: const Icon(Icons.file_download), ...),
]
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/logindata.csv @Key:belt_scans_download_gating @regression @both
Scenario: Download button hidden when user lacks download permission
  Given the user has view-only access to Belt Scans
  When the user opens a PDF report preview
  Then the download icon should not be visible in the header
```

---

## 🔗 Related

- [TC-BELT-SCANS-031 — PDF download](./tc-belt-scans-031-download-pdf-report-with-notification.md)
- [Suite index](./index.md)
