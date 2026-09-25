# TC-COVER-WEAR-020: PDF Report Preview & Authenticated Streaming

> **Suite**: `cover-wear` | **Priority**: `High` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/features/coverwear/presentation/widgets/cover_wear_row.dart` (`_openPdfPreview`)

---

## 🎯 Objective
Verify that tapping the PDF icon (`ContiPlusIcon.pdf_20x20`) on a Cover Wear row opens `FilePreviewScreen`, fetches the report using authenticated Cognito streaming (`useDownloadUrl2: true`, `moduleName: 'coverwear'`), and renders the document via `PdfViewer.file`.

---

## 📋 Preconditions
- User is logged into the application.
- Target cover wear event has a valid non-empty `reportUrl`.

---

## 🧪 Test Steps
1. Navigate to `CoverWearListPage`.
2. Locate an event with an active PDF report icon (`ContiPlusIcon.pdf_20x20`).
3. Tap the PDF icon.
4. Verify that `_openPdfPreview` retrieves active Cognito authentication tokens from `SessionManager.instance.loginCheck()`.
5. Verify navigation to `FilePreviewScreen` with `appBarTitle: 'Cover Wear'`, `fileUrl: coverWear.reportUrl`, and `moduleName: 'coverwear'`.
6. Verify that `FileDownloadCubit.downloadFromUrl2()` streams the PDF report.
7. Verify that the document renders in `PdfViewer.file`.

---

## 🔍 Expected Results
- PDF opens securely with authenticated headers and is fully readable.

---

## 📱 Flutter Source Reference
- **Row Handler**: `lib/src/features/coverwear/presentation/widgets/cover_wear_row.dart` (`_openPdfPreview`)
- **Preview Screen**: `lib/src/ui/screens/filemanager/filemanager_preview_screen.dart` (`FilePreviewScreen`)

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/coverweardata.csv @Key:coverwear_pdf_preview @regression @both
Scenario: Preview Cover Wear PDF report
  Given the user is on the Cover Wear list page
  When the user taps the PDF icon for event "<UltrasonicId>"
  Then the File Preview screen should open with title "Cover Wear"
  And the PDF report should be rendered in the document viewer
```
