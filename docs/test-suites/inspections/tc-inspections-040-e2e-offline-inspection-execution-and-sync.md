# TC-INSPECTIONS-040: E2E Offline Inspection Execution with Media & Auto Sync

> **Suite**: `inspections` | **Priority**: `High` | **Type**: `E2E` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/blocs/inspection/` & `InspectionSyncBloc`

---

## 🎯 Objective
Verify end-to-end offline inspection workflow: performing a full conveyor inspection while disconnected from network, saving evaluated items, photos, and voice notes locally in Hive storage, and automatically syncing all items and media to the cloud when network is restored.

---

## 📋 Preconditions
- User has logged in and cached conveyor master data.
- Device network is offline.

---

## 🧪 Test Steps
1. Put device into Airplane Mode (offline).
2. Open Inspections screen -> tap Add Inspection.
3. Select cached Site and Conveyor.
4. Record 3 inspection items, capturing 2 photos offline.
5. Save inspection event.
6. Verify event is queued locally with `isPending: true` and amber badge in list.
7. Reconnect network (Airplane Mode OFF).
8. Verify sync listener detects connectivity and initiates multipart upload for inspection items and photos.
9. Verify all items upload successfully and the pending badge clears.

---

## 🔍 Expected Results
- Full offline inspection execution with media caching and cloud synchronization works seamlessly.

---

## 📱 Flutter Source Reference
- `lib/src/ui/screens/inspections/inspection_list_screen.dart`
- `lib/src/blocs/inspection/list/inspection_list_bloc.dart`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/inspectiondata.csv @Key:inspection_e2e_offline_sync @e2e @both
Scenario: End-to-End Offline Inspection Execution with Media and Sync
  Given the device is in offline mode with cached conveyor data
  When the user executes an inspection with photos offline
  Then the inspection event should be stored locally with pending status
  When network connectivity is restored
  Then the inspection event and photo attachments should sync to the cloud
```
