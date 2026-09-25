# TC-COVER-WEAR-038: Offline Event/Reading Creation & Background Auto-Sync

> **Suite**: `cover-wear` | **Priority**: `High` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/features/coverwear/data/datasources/local/cover_wear_local_datasource.dart` & `sync_pending_cover_wear.dart`

---

## 🎯 Objective
Verify end-to-end offline functionality for Cover Wear: creating an event and adding readings while the device is offline (saved with `isPending: true` and temporary `new_` UUIDs), displaying the pending status badge, and automatic background synchronization once network connectivity is restored.

---

## 📋 Preconditions
- User is logged in with cached site and conveyor data.
- Device network is toggled offline.

---

## 🧪 Test Steps
1. Disconnect device network (Airplane mode).
2. Create a new Cover Wear event on `CoverWearAddScreen` and tap Save.
3. Verify event is saved to local Hive/SQLite database with `new_<uuid>` and `isPending = true`.
4. Add a new measurement reading with data points and photo offline.
5. Verify reading is queued locally with `isPending = true`.
6. Navigate to `CoverWearListPage` and verify the event displays a **Pending Sync** amber badge.
7. Reconnect device network.
8. Verify `CoverWearSyncBloc` / connectivity listener detects online status and triggers `CoverWearSyncAllEvent`.
9. Verify payload is transmitted to backend API, temporary IDs are mapped to server IDs, and the badge transitions to **Uploaded** (or normal state).

---

## 🔍 Expected Results
- Offline inspection capability allows field technicians to record cover wear measurements without internet and sync seamlessly upon reconnection.

---

## 📱 Flutter Source Reference
- **Local Data Source**: `lib/src/features/coverwear/data/datasources/local/cover_wear_local_datasource.dart`
- **Sync Logic**: `lib/src/features/coverwear/domain/usecases/sync_pending_cover_wear.dart`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/coverweardata.csv @Key:coverwear_offline_sync @regression @both
Scenario: Create Cover Wear event offline and auto-sync when online
  Given the device is in offline mode
  When the user creates a Cover Wear event and records a measurement
  Then the event should be saved locally with pending status
  When the network connection is restored
  Then the local events should automatically sync to the server
  And the pending badge should disappear
```
