# TC-CONVEYORS-031 — Delete conveyor — permission gating, confirmation dialog, delete flow

> Suite: [Conveyors](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYORS-031 |
| **Suite** | conveyors |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `conveyors_delete_flow` |
| **Feature File** | `features/regression/conveyors.feature` |
| **Page Objects** | `src/pages/conveyor-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify only users with `Permission.delete` can see the delete action on an existing conveyor's read-only Technical Data view, that the delete flow requires confirmation, and that deleting removes the conveyor from the list.

---

## ✅ Preconditions

- User A: has `BasicModule.conveyorsData` / `Permission.delete`
- User B: has view/edit but **not** delete permission
- An existing (non-critical, test-safe) conveyor is available to delete

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | As User B, open Technical Data (read-only) for the conveyor | No delete icon/action is visible |
| 2 | As User A, open Technical Data (read-only) for the conveyor | `deletePopupButton`/delete icon is visible |
| 3 | Tap delete | Confirmation dialog shown: title `confirmation`, message `deleteConveyors` ("Are you sure you want to delete the following conveyor(s)?") |
| 4 | Dismiss/cancel the dialog | No delete occurs; conveyor remains |
| 5 | Tap delete again, confirm | `ConveyorDeleteEvent(conveyor, isFreeUser)` dispatched |
| 6 | Observe result | `ConveyorDeleteSuccessState` then `ConveyorSyncState`; screen closes; conveyor no longer appears in the list |

---

## 🏁 Expected Results

- Delete action is gated by `Permission.delete` and only visible on the read-only (non-edit) Technical Data view
- Confirmation dialog must be accepted before deletion proceeds
- Deleted conveyor is removed from cache/list and, when online, synced as deleted server-side

---

## 🔍 Flutter Source Reference

```dart
// conveyor_details_screen.dart
// Delete action only visible when widget.isReadOnly && !widget.isFreeUser && canDelete
// Confirmation dialog: AppLocalizations.of(context)!.confirmation / .deleteConveyors
// delete event: ConveyorDeleteEvent(conveyor: conveyor, isFreeUser: widget.isFreeUser)

// conveyor_bloc.dart — delete logic
// free user: delete cache only
// non-free: if new conveyor, remove from all cache; else mark deleted and pend to sync;
// clears related conveyor caches in inspection / ultrasonic / monitoring device / minuteman
// emits ConveyorDeleteSuccessState then ConveyorSyncState
```

**Semantic label:** `deletePopupButton`

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/conveyorsdata.csv @Key:conveyors_delete_flow @regression @both
Scenario: Delete a conveyor with confirmation
  Given the user has conveyor delete permission
  When the user opens Technical Data for "td.ConveyorName" and taps delete
  And the user confirms the deletion
  Then the conveyor "td.ConveyorName" should no longer appear in the conveyors list
```

---

## 🔗 Related

- [TC-CONVEYORS-029 — Read-only view](./tc-conveyors-029-technical-data-read-only-view.md)
- [Suite index](./index.md)
