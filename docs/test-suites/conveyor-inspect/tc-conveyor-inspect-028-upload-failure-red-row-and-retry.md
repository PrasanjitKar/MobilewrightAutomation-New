# TC-CONVEYOR-INSPECT-028 — Upload Failure — failed upload flags row red with retry option

> Suite: [Conveyor Inspect](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYOR-INSPECT-028 |
| **Suite** | conveyor-inspect |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `upload_failure_retry_flow` |
| **Feature File** | `features/regression/conveyor_inspect.feature` |
| **Page Objects** | `src/pages/conveyor-inspect-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that if an upload fails due to server 500 error or partial file transfer disruption, `ConveyorInspectRow` marks the status chip as red "Upload Failed", displays a retry icon button, and allows the user to re-attempt the failed upload directly.

---

## ✅ Preconditions

- Network simulation configured to return 500 Internal Server Error on file upload endpoints

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Attempt to upload inspection files while server returns 500 error | Upload fails; `UploadFailedEvent` dispatches |
| 2 | Observe `ConveyorInspectRow` on list screen | Status chip turns Red ("Upload Failed") |
| 3 | Tap on the Retry circular button on the row | Upload restarts from failed file checkpoint |
| 4 | Restore normal server responses | File upload completes |
| 5 | Observe row status | Status chip changes from red to green "Uploaded" |

---

## 🏁 Expected Results

- Failed uploads are visually distinct and recoverable without creating duplicate records

---

## 🔍 Flutter Source Reference

```dart
// conveyor_inspect_row.dart
if (conveyorInspect.uploadStatus == UploadStatus.failed) {
  return ContiplusChip(
    label: 'Upload Failed',
    backgroundColor: ContiplusColors.dangerRedLight,
    trailing: IconButton(icon: Icon(Icons.refresh), onPressed: () => retryUpload()),
  );
}
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:upload_failure_retry_flow @regression @both
Scenario: Handle failed upload with retry option
  Given a conveyor inspect upload fails due to server error
  Then the inspection row should display a red "Upload Failed" badge with a retry button
  When the user taps the retry button after network is restored
  Then the upload should complete successfully and show "Uploaded"
```

---

## 🔗 Related

- [TC-CONVEYOR-INSPECT-027 — Auto sync reconnection](./tc-conveyor-inspect-027-auto-sync-on-network-reconnection.md)
- [Suite index](./index.md)
