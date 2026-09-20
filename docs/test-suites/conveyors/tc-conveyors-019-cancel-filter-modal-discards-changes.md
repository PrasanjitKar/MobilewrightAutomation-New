# TC-CONVEYORS-019 — Cancel closes the filter modal and discards unsaved changes

> Suite: [Conveyors](./index.md) | Priority: Low | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYORS-019 |
| **Suite** | conveyors |
| **Priority** | Low |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `conveyors_filter_cancel` |
| **Feature File** | `features/regression/conveyors.feature` |
| **Page Objects** | `src/pages/conveyor-filters.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify tapping Cancel in the filter modal closes it and leaves the currently applied list filters completely unchanged.

---

## ✅ Preconditions

- User has view permission for conveyors and an existing filter combination is applied to the list

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Note the currently applied filters and resulting list | Baseline recorded |
| 2 | Open filters and change several fields | In-progress modal state changes |
| 3 | Tap "Cancel" | Modal closes; no `ConveyorListFilterEvent` is dispatched |
| 4 | Observe the conveyors list | Unchanged from baseline (still reflects the previously applied filters) |
| 5 | Reopen the filter modal | Previously applied filters are shown (not the discarded in-progress edits) |

---

## 🏁 Expected Results

- Cancel is a pure no-op relative to `ConveyorListBloc` state
- Reopening the modal reflects the last **applied** filters, not the discarded edits

---

## 🔍 Flutter Source Reference

```dart
// conveyor_filters_modal.dart
// onCancelTap just closes the modal (no filter dispatch)
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/conveyorsdata.csv @Key:conveyors_filter_cancel @regression @both
Scenario: Cancel discards unsaved filter changes
  Given the user has an applied filter combination on the conveyors list
  When the user opens filters, changes fields, and taps Cancel
  Then the conveyors list should remain unchanged
```

---

## 🔗 Related

- [TC-CONVEYORS-018 — Clear Filters](./tc-conveyors-018-clear-filters-resets-all-fields.md)
- [Suite index](./index.md)
