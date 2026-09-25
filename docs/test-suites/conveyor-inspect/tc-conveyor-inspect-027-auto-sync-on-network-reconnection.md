# TC-CONVEYOR-INSPECT-027 — Sync Recovery — auto-upload pending events when internet restores

> Suite: [Conveyor Inspect](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYOR-INSPECT-027 |
| **Suite** | conveyor-inspect |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `auto_sync_on_network_restore` |
| **Feature File** | `features/regression/conveyor_inspect.feature` |
| **Page Objects** | `src/pages/conveyor-inspect-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that when internet connectivity is restored, `ConveyorInspectListBloc` triggers automatic synchronization of all pending inspection records, uploads images in the background via `ConveyorFindingFileUploadCubit`, and updates row status to "Uploaded" upon completion.

---

## ✅ Preconditions

- One or more inspection records are pending upload in Hive storage
- Device network is restored from offline mode

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Have pending inspection record on `ConveyorInspectListScreen` | Row displays "Pending" badge |
| 2 | Disable Airplane mode and re-enable Wi-Fi / LTE | Connectivity restored; `ConnectivityBloc` fires connected event |
| 3 | Observe Conveyor Inspect list header | Top synchronization progress spinner indicates upload in progress |
| 4 | Wait for upload completion | `UploadCompletedEvent` fires |
| 5 | Inspect previously pending row | Yellow "Pending" pill updates to green "Uploaded" pill |

---

## 🏁 Expected Results

- Background sync automatically reconciles pending records with Conti+ cloud servers

---

## 🔍 Flutter Source Reference

```dart
// conveyor_inspect_list_bloc.dart
_connectivitySubscription = connectivityBloc.stream.listen((conn) {
  if (conn.status.isConnected) {
    add(const SyncPendingConveyorInspectEvents());
  }
});
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:auto_sync_on_network_restore @regression @both
Scenario: Auto-upload pending conveyor inspections when network restores
  Given there are pending conveyor inspections stored locally
  When network connectivity is restored
  Then the pending inspections should be automatically synced to the server
  And their status should update to "Uploaded"
```

---

## 🔗 Related

- [TC-CONVEYOR-INSPECT-026 — Offline creation](./tc-conveyor-inspect-026-offline-event-creation-pending.md)
- [Suite index](./index.md)
