# TC-MINUTEMAN-030: Download PDF Report with SnackBar Notification

> **Suite**: `minuteman-calculation` | **Priority**: `High` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/screens/filemanager/filemanager_preview_screen.dart` (`FileManagerBloc`)

---

## 🎯 Objective
Verify that tapping the download button in `FilePreviewScreen` triggers `FileManagerDownloadEvent`, downloads the Minuteman calculation PDF file to the device storage, and provides visual feedback via `SnackBar` (success message or error notification).

---

## 📋 Preconditions
- User has `Permission.download` granted for the target calculation type.
- User is on `FilePreviewScreen` previewing a Minuteman calculation report.

---

## 🧪 Test Steps
1. On `FilePreviewScreen`, locate the download button (`IconButton(icon: Icon(Icons.file_download))`).
2. Tap the download icon.
3. Verify that Firebase Analytics logs `description: 'Clicked download button from Belt scan preview screen'` (or Minuteman preview).
4. Verify that the button switches to a `CircularProgressIndicator` while downloading.
5. **Success Scenario**:
   - On completion (`fileDownloadStatus.isSuccess`), verify `SnackBar` is displayed with yellow background (`ContinentalColors.continentalYellow[900]`) and content `AppLocalizations.of(context)!.fileDownloadSuccessMessage`.
   - Verify file is saved in device Downloads folder with name `<CalculationName>.pdf`.
6. **Failure Scenario**:
   - In case of network interruption during download (`fileDownloadStatus.isFailed`), verify `SnackBar` is displayed with red background and content `AppLocalizations.of(context)!.fileDownloadFailMessage`.

---

## 🔍 Expected Results
- Download process is responsive with spinner feedback.
- Clear localized feedback via SnackBar informs the user of success or failure.

---

## 📱 Flutter Source Reference
- **Screen**: `lib/src/ui/screens/filemanager/filemanager_preview_screen.dart` (`BlocConsumer<FileManagerBloc, FileManagerState>`)
- **BLoC**: `lib/src/blocs/file_manager/details/file_manager_bloc.dart` (`FileManagerDownloadEvent`, `FileManagerDownloadState`)
- **i18n Keys**: `fileDownloadSuccessMessage`, `fileDownloadFailMessage`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/minutemandata.csv @Key:minuteman_download_pdf @regression @both
Scenario: Download Minuteman calculation PDF report to device storage
  Given the user is on the PDF preview screen for calculation "<CalculationName>"
  When the user taps the download icon button
  Then a progress spinner should appear on the download action
  And upon completion a success notification should be displayed
  And the file "<CalculationName>.pdf" should be saved locally
```
