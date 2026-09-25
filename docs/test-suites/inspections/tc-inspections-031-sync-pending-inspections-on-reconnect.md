# TC-INSPECTIONS-031 — Sync Queue — reconnecting triggers auto-sync of pending records and photos

> Suite: [Inspections](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-INSPECTIONS-031 |
| **Suite** | inspections |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `inspection_sync_on_reconnect` |
| **Feature File** | `features/regression/inspections.feature` |
| **Page Objects** | `src/pages/inspections-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that restoring internet connectivity triggers `InspectionListSyncAllEvent()`, uploads pending offline photos via `_syncPhotos`, persists inspections to backend API, updates IDs from `new_` to server UUIDs, and transitions status badge to "Uploaded".

---

## ✅ Preconditions

- Device has 1 or more pending upload inspections in local cache

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Disable Airplane Mode (reconnect to Wi-Fi/Cellular) | `connectivityHelper.isOnline` becomes true |
| 2 | Open `InspectionListScreen` | `InspectionListSyncAllEvent` is automatically dispatched |
| 3 | Observe row progress indicator | Row displays circular progress indicator next to status badge |
| 4 | Wait for sync execution | Pending local photos are uploaded; create/update API is executed; report is generated |
| 5 | Verify row status badge (`status_$index`) | Status badge turns light green and displays "Uploaded" |
| 6 | Verify inspection ID | Temporary `new_` prefix is replaced with permanent backend UUID |

---

## 🏁 Expected Results

- Background synchronization smoothly uploads findings, photos, and transitions status to Uploaded

---

## 🔍 Flutter Source Reference

```dart
// inspection_list_bloc.dart — _mapInspectionListSyncAllEventToState()
for (final inspection in inspections) {
  for (final item in inspection.items) {
    await _syncPhotos(item.photos, 'Inspection item');
  }
  final id = await ctp.inspectionManager.create(inspection);
}
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:inspection_sync_on_reconnect @regression @both
Scenario: Auto-sync pending inspections on network reconnect
  Given the device has pending offline inspections
  When internet connectivity is restored
  Then the pending inspections and photos should be uploaded to the server
  And the inspection status should transition to "Uploaded"
```

---

## 🔗 Related

- [TC-INSPECTIONS-030 — Offline save pending badge](./tc-inspections-030-save-inspection-offline-pending-badge.md)
- [Suite index](./index.md)
