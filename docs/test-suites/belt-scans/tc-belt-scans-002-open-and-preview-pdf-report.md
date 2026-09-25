# TC-BELT-SCANS-002 — Report Preview — open and preview PDF scan report

> Suite: [Belt Scans](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-BELT-SCANS-002 |
| **Suite** | belt-scans |
| **Priority** | High |
| **Type** | Smoke |
| **Suggested Tags** | `@smoke @both` |
| **Data Key** | `belt_scan_report_preview` |
| **Feature File** | `features/smoke/belt_scans.feature` |
| **Page Objects** | `src/pages/belt-scans-list.page.ts`, `src/pages/file-preview.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that tapping a belt scan row with an attached report PDF navigates to `FilePreviewScreen`, fetches authenticated PDF streams via session token headers, and displays the report in the embedded PDF viewer.

---

## ✅ Preconditions

- Belt scan record with valid `report.url` exists in the list

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Locate a belt scan row with an active PDF icon (opacity 1.0) | Row is interactive |
| 2 | Tap the belt scan row | `FirebaseAnalytics.instance.logSelectItem` logs event; checks session auth |
| 3 | Observe screen transition | `FilePreviewScreen` opens with AppBar title "Belt Scans" and file name |
| 4 | Wait for PDF rendering | `FileDownloadCubit` validates scan status and `PdfViewer.file` renders document |
| 5 | Tap back button | Returns to `BeltScanListScreen` |

---

## 🏁 Expected Results

- PDF document renders securely inside the mobile PDF viewer

---

## 🔍 Flutter Source Reference

```dart
// belt_scan_list_screen.dart
if (element.report?.url?.isNotEmpty ?? false) {
  Navigator.push(
    context,
    MaterialPageRoute<dynamic>(
      builder: (context) => FilePreviewScreen(
        file: fileModel,
        appBarTitle: AppLocalizations.of(context)!.beltScans,
        accessToken: authData?.accessToken,
        userPoolId: authData?.userPoolId,
        canDownload: canDownloadBeltScan,
      ),
    ),
  );
}
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/smokedata.csv @Key:belt_scan_report_preview @smoke @both
Scenario: Open and preview belt scan PDF report
  Given the user is on the Belt Scans list screen
  When the user taps on a belt scan row with an attached PDF report
  Then the PDF preview screen should open with title "Belt Scans"
  And the PDF document should render in the viewer
```

---

## 🔗 Related

- [TC-BELT-SCANS-030 — PDF authenticated preview](./tc-belt-scans-030-pdf-preview-authenticated-stream.md)
- [Suite index](./index.md)
