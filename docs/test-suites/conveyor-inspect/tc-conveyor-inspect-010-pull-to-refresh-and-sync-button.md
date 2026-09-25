# TC-CONVEYOR-INSPECT-010 — Sync Action — pull to refresh and app bar sync trigger upload

> Suite: [Conveyor Inspect](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYOR-INSPECT-010 |
| **Suite** | conveyor-inspect |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `conveyor_inspect_sync_action` |
| **Feature File** | `features/regression/conveyor_inspect.feature` |
| **Page Objects** | `src/pages/conveyor-inspect-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that tapping the sync icon in the app bar opens the sync confirmation dialog, and confirming dispatches `ConveyorInspectListLoadEvent(hardRefresh: true)`, while pull-to-refresh executes `ConveyorInspectSyncEvent()`.

---

## ✅ Preconditions

- Device has network connection

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On `ConveyorInspectListScreen`, tap the sync icon in app bar | AlertDialog opens displaying "Sync confirmation" message |
| 2 | Tap "OK" | Dialog closes; hard refresh load event is dispatched; progress indicator displays |
| 3 | Perform pull-to-refresh swipe gesture | Pull indicator spins; `ConveyorInspectSyncEvent` executes |
| 4 | Observe list after completion | Latest inspection data and sync timestamp are updated |

---

## 🏁 Expected Results

- Manual sync actions trigger background data synchronization and refresh the list

---

## 🔍 Flutter Source Reference

```dart
// conveyor_inspect_list_screen.dart
conveyorInspectListBloc.add(const ConveyorInspectListLoadEvent(hardRefresh: true));
// pull to refresh:
conveyorInspectListBloc.add(const ConveyorInspectSyncEvent());
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:conveyor_inspect_sync_action @regression @both
Scenario: Trigger manual sync from app bar
  Given the user is on the Conveyor Inspect screen
  When the user taps the sync button in the app bar and confirms the dialog
  Then a hard refresh sync should execute and update the list
```

---

## 🔗 Related

- [TC-CONVEYOR-INSPECT-001 — List loads](./tc-conveyor-inspect-001-list-loads-with-permitted-view.md)
- [Suite index](./index.md)
