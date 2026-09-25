# TC-INSPECTIONS-036 — PDF Report — generate and view inspection report in FilePreviewScreen

> Suite: [Inspections](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-INSPECTIONS-036 |
| **Suite** | inspections |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `preview_inspection_pdf_report` |
| **Feature File** | `features/regression/inspections.feature` |
| **Page Objects** | `src/pages/inspection-view.page.ts`, `src/pages/file-preview.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that when an inspection has a generated `reportUrl`, selecting "Preview PDF" from the popup menu opens `FilePreviewScreen`, passes auth tokens, enables the download button if `Permission.download` is granted, and displays the multi-page PDF document.

---

## ✅ Preconditions

- Inspection is synced with backend and has `inspection.reportUrl` available
- User has `BasicModule.generateReports` `Permission.view`

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open `InspectionViewScreen` for a synced inspection | View screen loads |
| 2 | Tap the popup menu (`inspectionPopupMenu`) and tap "Preview PDF" (`previewPdfText`) | `FilePreviewScreen` opens |
| 3 | Verify PDF viewer header | App bar displays `<InspectionName>.pdf` |
| 4 | Verify download icon | If user has `Permission.download`, download button is active; otherwise disabled |
| 5 | Pinch-zoom and scroll through PDF pages | PDF document pages render cleanly with executive summary, defect table, and photo attachments |

---

## 🏁 Expected Results

- Full formal PDF inspection report is rendered inside the integrated PDF preview screen

---

## 🔍 Flutter Source Reference

```dart
// inspection_view_screen.dart
Navigator.push(
  context,
  MaterialPageRoute(
    builder: (_) => FilePreviewScreen(
      file: fileModel,
      appBarTitle: inspection.name ?? '',
      canDownload: canDownloadInspectionForm,
      moduleName: 'inspection',
    ),
  ),
);
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:preview_inspection_pdf_report @regression @both
Scenario: Preview generated PDF inspection report
  Given an inspection with a generated PDF report
  When the user selects Preview PDF from the popup menu
  Then the File Preview screen should load and display the inspection PDF
```

---

## 🔗 Related

- [TC-INSPECTIONS-003 — Inspection view details](./tc-inspections-003-inspection-view-details-and-pdf-preview.md)
- [Suite index](./index.md)
