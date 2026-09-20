# TC-CONVEYORS-032 — Saving a conveyor while offline stores it locally and queues a pending sync

> Suite: [Conveyors](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYORS-032 |
| **Suite** | conveyors |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `conveyors_save_offline_pending_sync` |
| **Feature File** | `features/regression/conveyors.feature` |
| **Page Objects** | `src/pages/conveyor-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify creating or editing a conveyor while offline saves it locally with a pending state, shows the pending-upload indicator on the list, and successfully syncs once connectivity is restored.

---

## ✅ Preconditions

- User has add/edit permission for conveyors
- Device connectivity can be disabled/enabled on demand

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Disable device connectivity | App enters offline mode |
| 2 | Create or edit a conveyor with valid required fields, then save | `ConveyorValidateAndSaveToLocalEvent` still validates and saves locally; `ConveyorSavingLocalState` → "Conveyor Saved Locally" |
| 3 | Return to the Conveyors list | The conveyor row shows `uploadButtonConveyor_$index` (pending) |
| 4 | Re-enable connectivity | Background sync automatically attempts to upload the pending conveyor |
| 5 | Wait for sync to complete | Pending indicator disappears; conveyor is confirmed synced (or `syncFailedBanner_$index` shown if sync fails, per TC-CONVEYORS-013) |

---

## 🏁 Expected Results

- Offline save always succeeds locally provided field-level validation passes (name/customer required, thickness rule, uniqueness against cached data)
- Pending conveyors are clearly indicated in the list until synced
- Sync automatically retries once connectivity is restored, and manual retry via the upload button is also available

---

## 🔍 Flutter Source Reference

```dart
// conveyor_bloc.dart — save logic (non-free user)
// validate name uniqueness
// add to pendings
// emit ConveyorSavingLocalState
// emit ConveyorSyncState

// conveyor_list_bloc.dart — listens to conveyorBloc.stream
// ConveyorShowLoaderState / ConveyorDismissLoaderState toggle the per-row uploading indicator
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/conveyorsdata.csv @Key:conveyors_save_offline_pending_sync @regression @both
Scenario: Offline conveyor save queues a pending sync
  Given the device is offline
  When the user creates a new conveyor "td.ConveyorName" with valid required fields
  Then the conveyor should be saved locally and marked as pending upload
  When the device goes back online
  Then the conveyor should sync successfully and the pending indicator should disappear
```

---

## 🔗 Related

- [TC-CONVEYORS-013 — Pending upload and sync failed](./tc-conveyors-013-row-pending-upload-and-sync-failed.md)
- [Suite index](./index.md)
