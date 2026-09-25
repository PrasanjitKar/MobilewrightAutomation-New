# TC-CONVEYOR-INSPECT-026 — Offline Storage — event queued in Hive with pending upload indicator

> Suite: [Conveyor Inspect](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYOR-INSPECT-026 |
| **Suite** | conveyor-inspect |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `offline_event_creation_pending` |
| **Feature File** | `features/regression/conveyor_inspect.feature` |
| **Page Objects** | `src/pages/conveyor-inspect-add.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that creating a conveyor inspection while in airplane/offline mode persists the complete inspection data bundle and photos into Hive local storage with `isPending: true`, displays the yellow "Pending" upload badge on the list screen, and warns the user of pending sync.

---

## ✅ Preconditions

- Device network connection is disabled (Airplane mode ON)

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Enable Airplane mode on test device | Device is completely offline |
| 2 | Open `AddEditConveyorInspectEvent`, select site, conveyor, date, and attach images | Form is valid |
| 3 | Tap "Create" button | Form saves to Hive local database (`isPending: true`) |
| 4 | Observe list screen | Newly created inspection row appears immediately with yellow "Pending" pill badge |
| 5 | Inspect row actions | "Sync Now" button is enabled on pending row |

---

## 🏁 Expected Results

- Offline inspection creation functions seamlessly without data loss or crashes

---

## 🔍 Flutter Source Reference

```dart
// conveyor_inspect_list_bloc.dart
await conveyorInspectBox.put(event.id, conveyorInspect.copyWith(isPending: true));
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:offline_event_creation_pending @regression @both
Scenario: Create conveyor inspection event while offline
  Given the device is offline
  When the user creates a new conveyor inspection event
  Then the event should be saved locally in Hive
  And the inspection row should display a "Pending" status badge on the list
```

---

## 🔗 Related

- [TC-CONVEYOR-INSPECT-027 — Auto sync reconnection](./tc-conveyor-inspect-027-auto-sync-on-network-reconnection.md)
- [Suite index](./index.md)
