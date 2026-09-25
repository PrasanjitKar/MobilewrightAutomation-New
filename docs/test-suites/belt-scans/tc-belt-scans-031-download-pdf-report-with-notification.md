# TC-BELT-SCANS-031 — PDF Download — download belt scan PDF report with notification

> Suite: [Belt Scans](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-BELT-SCANS-031 |
| **Suite** | belt-scans |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `belt_scans_pdf_download` |
| **Feature File** | `features/regression/belt_scans.feature` |
| **Page Objects** | `src/pages/file-preview.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that tapping the Download icon on `FilePreviewScreen` triggers `FileManagerDownloadEvent`, downloads the PDF report file to local device storage, displays a loading spinner during download, and presents a success SnackBar message upon completion.

---

## ✅ Preconditions

- User has `Permission.download` for `BasicModule.beltScan`
- PDF report is loaded on `FilePreviewScreen`

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On `FilePreviewScreen`, locate download icon button | Download icon is visible in document header bar |
| 2 | Tap the Download icon | `FileManagerDownloadEvent` fires; download spinner appears |
| 3 | Wait for download completion | `FileManagerDownloadState` with `fileDownloadStatus.isSuccess` emits |
| 4 | Observe SnackBar notification | Yellow SnackBar displays "File downloaded successfully" (`fileDownloadSuccessMessage`) |
| 5 | Verify local device file | PDF file is saved in device's local downloads directory |

---

## 🏁 Expected Results

- PDF report is downloaded locally and user receives confirmation SnackBar

---

## 🔍 Flutter Source Reference

```dart
// filemanager_preview_screen.dart
IconButton(
  icon: const Icon(Icons.file_download, color: Colors.black),
  onPressed: () {
    context.read<FileManagerBloc>().add(FileManagerDownloadEvent(widget.file));
  },
)
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:belt_scans_pdf_download @regression @both
Scenario: Download belt scan PDF report to local storage
  Given the user is on the PDF preview screen with download permission
  When the user taps the download icon
  Then a download progress indicator should display
  And a success SnackBar should confirm the file download
```

---

## 🔗 Related

- [TC-BELT-SCANS-032 — Download disabled without permission](./tc-belt-scans-032-download-disabled-without-permission.md)
- [Suite index](./index.md)
