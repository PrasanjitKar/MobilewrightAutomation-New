# TC-MINUTEMAN-005: Permission Gating: Download Action Enforcement

> **Suite**: `minuteman-calculation` | **Priority**: `High` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/screens/minuteman/minuteman_list_screen.dart` & `lib/src/ui/screens/filemanager/filemanager_preview_screen.dart`

---

## 🎯 Objective
Verify that the PDF report download icon inside `FilePreviewScreen` is visible and functional only when the user possesses `Permission.download` for the corresponding calculation type (`BasicModule.minutemanElevator` or `BasicModule.minutemanConveyor`).

---

## 📋 Preconditions
- User accounts configured with:
  - Account A: `Permission.view` = true, `Permission.download` = true.
  - Account B: `Permission.view` = true, `Permission.download` = false.

---

## 🧪 Test Steps
1. **User with Download Permission (Account A)**:
   - Open Minuteman calculation list screen.
   - Tap on a calculation item to open `FilePreviewScreen`.
   - Verify that `canDownloadMinutemanform` evaluates to `true`.
   - Verify the download icon button (`Icons.file_download`) is present in the header.
   - Tap download and verify `FileManagerDownloadEvent` is dispatched.
2. **User without Download Permission (Account B)**:
   - Open Minuteman calculation list screen.
   - Tap on the same calculation item to open `FilePreviewScreen`.
   - Verify that `canDownloadMinutemanform` evaluates to `false`.
   - Verify the download icon button is completely omitted/hidden from the header bar.

---

## 🔍 Expected Results
- Download action is strictly gated by `user.canAccess(..., Permission.download)`.
- Users without download permission can preview the report but cannot save/export the PDF.

---

## 📱 Flutter Source Reference
- **List Screen Logic**: `lib/src/ui/screens/minuteman/minuteman_list_screen.dart` (`canDownloadMinutemanform`)
- **Preview Screen**: `lib/src/ui/screens/filemanager/filemanager_preview_screen.dart` (`if (widget.canDownload) ...`)
- **Event**: `FileManagerDownloadEvent`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/minutemandata.csv @Key:minuteman_permission_download @regression @both
Scenario Outline: Verify PDF download button visibility based on download permission
  Given the user is logged in with "<DownloadPermission>" download permission
  When the user opens the preview for calculation "<CalculationName>"
  Then the download report button should be "<VisibilityStatus>"

  Examples:
    | DownloadPermission | VisibilityStatus |
    | Granted            | Visible          |
    | Denied             | Hidden           |
```
