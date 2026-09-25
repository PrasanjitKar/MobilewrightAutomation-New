# TC-CONVEYOR-INSPECT-009 — Offline Mode — displays "Working offline" and renders cached records

> Suite: [Conveyor Inspect](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYOR-INSPECT-009 |
| **Suite** | conveyor-inspect |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `conveyor_inspect_offline_mode` |
| **Feature File** | `features/regression/conveyor_inspect.feature` |
| **Page Objects** | `src/pages/conveyor-inspect-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that when network connectivity is lost, `ConveyorInspectListScreen` displays the "Working offline" status label, emits `ListStatus.offline`, and renders cached inspection records from Hive.

---

## ✅ Preconditions

- Device has cached conveyor inspect records
- Device is disconnected from internet (Airplane Mode)

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Enable Airplane Mode | Device is offline |
| 2 | Open `ConveyorInspectListScreen` | Screen loads from local Hive cache |
| 3 | Observe top status text | Displays "Working offline" |
| 4 | Browse cached records | Rows remain interactive; tapping opens cached inspection details |

---

## 🏁 Expected Results

- Offline status is clearly communicated and cached inspection history remains accessible

---

## 🔍 Flutter Source Reference

```dart
// conveyor_inspect_list_screen.dart
if (state.status.isOffline)
  Text(AppLocalizations.of(context)!.workingOffline),
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:conveyor_inspect_offline_mode @regression @both
Scenario: Browse conveyor inspect records offline
  Given the device is offline with cached conveyor inspect records
  When the user opens the Conveyor Inspect screen
  Then the "Working offline" status should be displayed
  And cached inspection rows should remain browsable
```

---

## 🔗 Related

- [TC-CONVEYOR-INSPECT-001 — List loads](./tc-conveyor-inspect-001-list-loads-with-permitted-view.md)
- [TC-CONVEYOR-INSPECT-026 — Offline event creation pending](./tc-conveyor-inspect-026-offline-event-creation-pending.md)
- [Suite index](./index.md)
