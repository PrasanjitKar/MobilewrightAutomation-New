# TC-INSPECTIONS-037 — PDF Report — displays error snackbar when offline or unsynced

> Suite: [Inspections](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-INSPECTIONS-037 |
| **Suite** | inspections |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `pdf_report_unsynced_error` |
| **Feature File** | `features/regression/inspections.feature` |
| **Page Objects** | `src/pages/inspection-view.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that attempting to preview a PDF report for an inspection that is newly created offline (starts with `new_`) or has an empty `reportUrl` displays an error snackbar (`pdfReportNotGenerated` or `inspectionReportError`) and prevents navigation to the viewer.

---

## ✅ Preconditions

- Inspection is created offline and has `inspectionId` starting with `new_` or has empty `reportUrl`

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open `InspectionViewScreen` for a newly created offline inspection (`new_...`) | View screen loads |
| 2 | Tap the popup menu (`inspectionPopupMenu`) and tap "Preview PDF" | PDF action executes validation |
| 3 | Observe screen bottom | Red snackbar displays "PDF report cannot be generated for unsynced inspection" |
| 4 | Open another inspection where `reportUrl` is null/empty | View screen loads |
| 5 | Tap "Preview PDF" | Red snackbar displays "PDF Report not generated" (`pdfReportNotGenerated`) |

---

## 🏁 Expected Results

- Unsynced or ungenerated PDF reports are gracefully caught with explanatory error messages

---

## 🔍 Flutter Source Reference

```dart
// inspection_view_screen.dart
if (inspection.inspectionId!.contains('new_')) {
  ScaffoldMessenger.of(context).showSnackBar(
    SnackBar(
      backgroundColor: ContiplusColors.continentalLightRed,
      content: Text(AppLocalizations.of(context)!.inspectionReportError),
    ),
  );
}
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:pdf_report_unsynced_error @regression @both
Scenario: Error displayed when previewing unsynced inspection PDF
  Given the user is viewing an unsynced offline inspection
  When the user selects Preview PDF from the popup menu
  Then an error snackbar should indicate that the report cannot be generated
```

---

## 🔗 Related

- [TC-INSPECTIONS-036 — PDF report generation](./tc-inspections-036-pdf-report-generation-and-preview.md)
- [Suite index](./index.md)
