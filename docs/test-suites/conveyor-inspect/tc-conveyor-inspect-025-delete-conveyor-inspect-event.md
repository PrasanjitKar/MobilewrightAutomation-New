# TC-CONVEYOR-INSPECT-025 — Delete Event — confirm deletion and remove from local and cloud storage

> Suite: [Conveyor Inspect](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYOR-INSPECT-025 |
| **Suite** | conveyor-inspect |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `delete_conveyor_inspect_event` |
| **Feature File** | `features/regression/conveyor_inspect.feature` |
| **Page Objects** | `src/pages/conveyor-inspect-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that tapping the Delete action on `ConveyorInspectDetailsScreen` displays a destructive confirmation dialog, calls `DeleteConveyorInspectEvent`, purges local cached files/Hive records, and returns the user to the list screen with a success toast.

---

## ✅ Preconditions

- Existing conveyor inspect event created for testing

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On `ConveyorInspectDetailsScreen`, tap the trash/delete icon in AppBar | Delete confirmation dialog appears |
| 2 | Dialog displays "Are you sure you want to delete this inspection?" with Cancel and Delete buttons | Warning text is clear |
| 3 | Tap "Cancel" | Dialog dismisses without deleting |
| 4 | Tap trash icon again and tap "Delete" | `DeleteConveyorInspectEvent` dispatches to API |
| 5 | Verify post-deletion flow | Screen navigates back to list; row is removed; success toast appears |

---

## 🏁 Expected Results

- Inspection event and all associated cached artifacts are cleanly deleted

---

## 🔍 Flutter Source Reference

```dart
// conveyor_inspect_details_screen.dart
bloc.add(DeleteConveyorInspectEvent(id: conveyorInspect.id));
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:delete_conveyor_inspect_event @regression @both
Scenario: Delete conveyor inspect event with confirmation
  Given the user is on the Conveyor Inspect details screen
  When the user taps the Delete button and confirms deletion
  Then the inspection should be deleted
  And the user should be returned to the Conveyor Inspect list screen
```

---

## 🔗 Related

- [TC-CONVEYOR-INSPECT-001 — List loads](./tc-conveyor-inspect-001-list-loads-with-permitted-view.md)
- [Suite index](./index.md)
