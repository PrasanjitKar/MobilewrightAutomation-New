# TC-CONVEYORS-036: E2E Offline Conveyor Creation & Background Sync

> **Suite**: `conveyors` | **Priority**: `High` | **Type**: `E2E` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/blocs/conveyor/` & `ConveyorSyncInitiateEvent`

---

## 🎯 Objective
Verify end-to-end offline capability for conveyor asset creation:
1. Disconnect device network while on cached site data.
2. Complete all 3 steps of Add Conveyor wizard offline.
3. Save conveyor and verify it is stored in local Hive/SQLite database with `isPending: true` and temporary ID.
4. Verify `ConveyorListScreen` shows offline banner and row displays the pending-upload sync icon.
5. Restore network connectivity and trigger sync.
6. Verify payload is transmitted to the server, permanent ID is assigned, and pending indicator clears.

---

## 📋 Preconditions
- User is logged in and customer site master data is cached.
- Device network is toggled offline.

---

## 🧪 Test Steps
1. Put device in Airplane Mode (offline).
2. Open Add Conveyor screen and fill mandatory fields across Step 1, Step 2, and Step 3.
3. Tap Save.
4. Verify conveyor is saved locally with `isPending: true`.
5. Open `ConveyorListScreen` and verify:
   - Yellow "Working offline" banner is displayed (`offlineTextForConveyor`).
   - The newly created conveyor row displays the pending-upload sync button (`uploadButtonConveyor_$index`).
6. Turn off Airplane Mode (reconnect online).
7. Tap the upload button on the conveyor row (or pull-to-refresh).
8. Verify `ConveyorSyncInitiateEvent` executes, server returns HTTP 201/200, and pending icon is removed.
9. Verify conveyor is accessible across web and mobile platforms.

---

## 🔍 Expected Results
- Complete offline-to-online conveyor creation and synchronization completes without data loss.

---

## 📱 Flutter Source Reference
- `lib/src/blocs/conveyor/list/conveyor_list_bloc.dart`
- `lib/src/ui/screens/conveyors/widgets/conveyor_row.dart`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/conveyordata.csv @Key:conveyor_e2e_offline_sync @e2e @both
Scenario: End-to-End Offline Conveyor Creation and Background Synchronization
  Given the device is offline with cached company data
  When the user completes and saves a new conveyor form offline
  Then the conveyor should appear in the list with a pending sync indicator
  When the network connection is restored and sync is triggered
  Then the conveyor should sync to the server and the pending indicator should clear
```
