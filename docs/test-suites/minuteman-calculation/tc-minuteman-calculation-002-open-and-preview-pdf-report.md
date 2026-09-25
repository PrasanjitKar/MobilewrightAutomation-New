# TC-MINUTEMAN-002: Open & Preview Calculation PDF Report

> **Suite**: `minuteman-calculation` | **Priority**: `Critical` | **Type**: `Smoke` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/screens/minuteman/minuteman_list_screen.dart` | **Preview**: `lib/src/ui/screens/filemanager/filemanager_preview_screen.dart`

---

## 🎯 Objective
Verify that tapping a Minuteman calculation row with a valid `reportUrl` opens the authenticated `FilePreviewScreen` and renders the PDF calculation report using `PdfViewer.file`.

---

## 📋 Preconditions
- User is logged in with `Permission.view` for Minuteman calculations.
- At least one Minuteman calculation item exists with a non-empty `reportUrl`.
- Valid Cognito authentication session exists (`SessionManager.instance.loginCheck()`).

---

## 🧪 Test Steps
1. Navigate to the Minuteman Calculation list screen.
2. Locate a calculation item with a generated PDF report.
3. Tap on the calculation row (`MinutemanRow.onTap`).
4. Verify that Firebase Analytics logs `logSelectItem(itemListId: element.minutemanId, itemListName: 'Minuteman list')`.
5. Verify navigation to `FilePreviewScreen` with `appBarTitle: 'Minuteman Calc.'` and file name `${element.name}.pdf`.
6. Verify that `FileDownloadCubit.downloadFromUrl2()` is called with `moduleName: 'minuteman'`.
7. Verify that the PDF document loads and renders completely without error modals.
8. Tap the back button to return to the list screen and verify that `MinutemanListLoadEvent(onlyLoading: true)` is dispatched.

---

## 🔍 Expected Results
- `FilePreviewScreen` opens smoothly displaying the PDF header with file name.
- PDF viewer renders the technical calculation report pages.
- Returning to the list screen maintains state and refreshes loading seamlessly.

---

## 📱 Flutter Source Reference
- **Screen**: `lib/src/ui/screens/minuteman/minuteman_list_screen.dart` (`buildList` → `Navigator.push(FilePreviewScreen)`)
- **Preview Screen**: `lib/src/ui/screens/filemanager/filemanager_preview_screen.dart` (`FilePreviewScreen`)
- **PDF Engine**: `pdfrx` (`PdfViewer.file(fileState)`)
- **Download Cubit**: `lib/src/blocs/file_manager/cubit/file_download_cubit.dart` (`downloadFromUrl2`)
- **Route Key**: `RouteNameKeys.filePreviewScreen`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/minutemandata.csv @Key:minuteman_preview_pdf @smoke @both
Scenario: Open and preview Minuteman calculation PDF report
  Given the user is on the Minuteman calculation list screen
  When the user taps on calculation item "<CalculationName>"
  Then the File Preview screen should open with title "Minuteman Calc."
  And the calculation report PDF "<CalculationName>.pdf" should be rendered
  When the user taps the back button
  Then the user should be returned to the Minuteman calculation list
```
