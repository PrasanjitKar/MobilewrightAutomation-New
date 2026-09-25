# TC-COVER-WEAR-018: Pending Upload Row & Direct Sync Action

> **Suite**: `cover-wear` | **Priority**: `Medium` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/features/coverwear/presentation/widgets/cover_wear_row.dart` (`ContiPlusIcon.uploadIcon_24x24`)

---

## 🎯 Objective
Verify that events in `isPending: true` state render an upload icon (`ContiPlusIcon.uploadIcon_24x24`), and tapping the upload icon dispatches `CoverWearDataSyncEvent` to push the pending event and its readings to the server immediately.

---

## 📋 Preconditions
- An event created while offline or with pending edits exists (`isPending: true`).

---

## 🧪 Test Steps
1. Navigate to `CoverWearListPage`.
2. Locate the pending upload event.
3. Verify that the trailing area displays the upload icon (`ContiPlusIcon.uploadIcon_24x24`).
4. Tap the upload icon.
5. Verify that `CoverWearDataSyncEvent(postSyncLoad: CoverWearPostSyncLoad.none, ultrasonicId: coverWear.ultrasonicId)` is dispatched.
6. Verify row switches to processing spinner while syncing.
7. Upon successful cloud upload, verify status transitions to `Uploaded` and gauge renders.

---

## 🔍 Expected Results
- Direct sync action triggers immediate upload without requiring a full manual list sync.

---

## 📱 Flutter Source Reference
- **Widget**: `lib/src/features/coverwear/presentation/widgets/cover_wear_row.dart` (`buildTrailingWidget`)
- **Event**: `CoverWearDataSyncEvent`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/coverweardata.csv @Key:coverwear_pending_sync @regression @both
Scenario: Sync a pending Cover Wear event directly from list
  Given a pending cover wear event is displayed in the list
  When the user taps the upload icon on the event row
  Then the event upload sync should be initiated
  And the row should transition to Uploaded upon completion
```
