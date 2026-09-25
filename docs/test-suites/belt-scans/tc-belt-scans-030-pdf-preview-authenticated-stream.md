# TC-BELT-SCANS-030 — PDF Stream — authenticated PDF report document preview

> Suite: [Belt Scans](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-BELT-SCANS-030 |
| **Suite** | belt-scans |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `belt_scans_pdf_preview_stream` |
| **Feature File** | `features/regression/belt_scans.feature` |
| **Page Objects** | `src/pages/file-preview.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that `FilePreviewScreen` validates file scan status via `FileDownloadCubit`, fetches authenticated PDF streams using the user's session tokens (`userPoolId`, `accessToken`, `configAppClientId`), and renders the multi-page PDF document cleanly.

---

## ✅ Preconditions

- User is authenticated and viewing a scan row with valid report URL

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Tap a scan row with an active PDF report | Navigates to `FilePreviewScreen` |
| 2 | Observe authentication headers | PDF request includes `Authorization: ${userPoolId}:${accessToken}:${configAppClientId}` |
| 3 | Wait for download validation | `FileDownloadCubit` confirms file scan status |
| 4 | Inspect PDF rendering | `PdfViewer.file` renders pages with pinch-to-zoom and multi-page scrolling |
| 5 | Verify header | Shows filename and AppBar title "Belt Scans" |

---

## 🏁 Expected Results

- Secure authenticated PDF preview loads and renders document pages without corruption

---

## 🔍 Flutter Source Reference

```dart
// filemanager_preview_screen.dart
PdfViewer.file(fileState)
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:belt_scans_pdf_preview_stream @regression @both
Scenario: Render authenticated PDF report in preview screen
  Given the user taps a belt scan row with an attached PDF
  When the PDF preview screen loads
  Then the multi-page PDF document should render with zoom and scroll support
```

---

## 🔗 Related

- [TC-BELT-SCANS-002 — Open and preview PDF](./tc-belt-scans-002-open-and-preview-pdf-report.md)
- [Suite index](./index.md)
