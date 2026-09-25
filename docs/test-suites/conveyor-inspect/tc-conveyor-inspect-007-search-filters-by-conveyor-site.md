# TC-CONVEYOR-INSPECT-007 — Search — real-time query filters inspections by conveyor and site name

> Suite: [Conveyor Inspect](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYOR-INSPECT-007 |
| **Suite** | conveyor-inspect |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `conveyor_inspect_search` |
| **Feature File** | `features/regression/conveyor_inspect.feature` |
| **Page Objects** | `src/pages/conveyor-inspect-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that tapping the search icon in the app bar opens the search bar, and entering text dispatches `ConveyorInspectSearchEvent(search)`, filtering the list by conveyor name or site name in real-time.

---

## ✅ Preconditions

- Multiple conveyor inspection records exist across different sites

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On `ConveyorInspectListScreen`, tap the search icon in the app bar | Search text field opens with autofocus |
| 2 | Type "Overland" | `ConveyorInspectSearchEvent(search: 'Overland')` is dispatched |
| 3 | Observe list items | Only inspections matching "Overland" are displayed |
| 4 | Tap close icon `(X)` | Search input clears; full list is restored |

---

## 🏁 Expected Results

- Search query instantly filters inspection records

---

## 🔍 Flutter Source Reference

```dart
// conveyor_inspect_list_screen.dart
void onSearch() {
  conveyorInspectListBloc.add(ConveyorInspectSearchEvent(search: _searchCtrl.text));
}
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:conveyor_inspect_search @regression @both
Scenario: Search conveyor inspect records by name
  Given the user is on the Conveyor Inspect screen
  When the user opens search and enters "Overland"
  Then only inspections matching "Overland" should be displayed
```

---

## 🔗 Related

- [TC-CONVEYOR-INSPECT-001 — List loads](./tc-conveyor-inspect-001-list-loads-with-permitted-view.md)
- [Suite index](./index.md)
