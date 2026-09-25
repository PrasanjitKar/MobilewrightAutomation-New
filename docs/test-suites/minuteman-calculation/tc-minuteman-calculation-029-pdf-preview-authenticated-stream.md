# TC-MINUTEMAN-029: PDF Report Preview Authenticated Streaming

> **Suite**: `minuteman-calculation` | **Priority**: `High` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/screens/filemanager/filemanager_preview_screen.dart` (`FilePreviewScreen`)

---

## 🎯 Objective
Verify that `FilePreviewScreen` establishes an authenticated stream using `SessionManager` credentials (`userPoolId`, `accessToken`, `F.configAppClientId`) to retrieve and render the PDF calculation report via `PdfViewer.file`.

---

## 📋 Preconditions
- User is logged in with valid Cognito tokens.
- Selected calculation has a valid backend `reportUrl` pointing to a PDF file.

---

## 🧪 Test Steps
1. Tap a calculation row with a valid PDF report.
2. Verify `SessionManager.instance.loginCheck()` retrieves active `userPoolId` and `accessToken`.
3. Verify that `FilePreviewScreen` is initialized with `useDownloadUrl2: true` and `moduleName: 'minuteman'`.
4. Verify that `FileDownloadCubit.downloadFromUrl2()` is triggered.
5. Verify that while downloading, a circular progress indicator is displayed (`Center(child: CircularProgressIndicator())`).
6. Once downloaded to local storage, verify that `PdfViewer.file(fileState)` renders the document.
7. Test multi-page scrolling, zoom-in, and zoom-out gestures on the PDF viewer canvas.
8. If the PDF scan status is invalid/corrupt, verify that `showSimpleModal` displays error message `AppLocalizations.of(context)!.scanStatusMessage`.

---

## 🔍 Expected Results
- PDF streams securely with authenticated headers and displays in native viewer.
- Touch gestures (pinch to zoom, scroll) operate smoothly.

---

## 📱 Flutter Source Reference
- **Screen**: `lib/src/ui/screens/filemanager/filemanager_preview_screen.dart` (`FilePreviewScreen`, `PdfViewer.file`)
- **Cubit**: `lib/src/blocs/file_manager/cubit/file_download_cubit.dart` (`downloadFromUrl2`)
- **Session**: `lib/src/common/helpers/session_manager.dart`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/minutemandata.csv @Key:minuteman_pdf_stream @regression @both
Scenario: Stream and interact with authenticated Minuteman PDF report
  Given the user is on the Minuteman calculation list screen
  When the user taps on calculation "<CalculationName>"
  Then the authenticated PDF preview screen should load
  And the PDF calculation document should be viewable
  And the user should be able to zoom and scroll across pages
```
