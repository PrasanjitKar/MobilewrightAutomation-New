# TC-CONVEYOR-INSPECT-005 — Conveyor Info Screen — navigate to pre-filtered conveyor inspect list

> Suite: [Conveyor Inspect](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYOR-INSPECT-005 |
| **Suite** | conveyor-inspect |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `conveyor_info_to_conveyor_inspect` |
| **Feature File** | `features/regression/conveyor_inspect.feature` |
| **Page Objects** | `src/pages/conveyor-details.page.ts`, `src/pages/conveyor-inspect-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that on `ConveyorInformationScreen`, tapping the "Conveyor Inspect" section opens `ConveyorInspectListScreen` with `isConveyorIdsPreSupplied: true`, pre-filtering the list to only inspections belonging to that specific conveyor.

---

## ✅ Preconditions

- User is viewing `ConveyorInformationScreen` for a conveyor that has thermal/drone inspection history

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Navigate to `ConveyorInformationScreen` for "Main Overland Conveyor" | Screen loads |
| 2 | Tap the "Conveyor Inspect" entry | `ConveyorInspectListScreen` opens |
| 3 | Check active filters | List is pre-filtered to "Main Overland Conveyor" |
| 4 | Verify displayed records | Only inspections for "Main Overland Conveyor" are listed |

---

## 🏁 Expected Results

- Contextual navigation correctly isolates inspections for the selected conveyor

---

## 🔍 Flutter Source Reference

```dart
// conveyor_information_screen.dart
Navigator.push(
  context,
  MaterialPageRoute(
    builder: (_) => ConveyorInspectListScreen(selectedConveyorInspect: inspectModel),
  ),
);
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:conveyor_info_to_conveyor_inspect @regression @both
Scenario: Navigate from Conveyor Info to pre-filtered Conveyor Inspect
  Given the user is viewing Conveyor Information for "Main Overland Conveyor"
  When the user taps the Conveyor Inspect section
  Then the Conveyor Inspect list should be displayed pre-filtered to "Main Overland Conveyor"
```

---

## 🔗 Related

- [TC-CONVEYOR-INSPECT-001 — List loads](./tc-conveyor-inspect-001-list-loads-with-permitted-view.md)
- [Suite index](./index.md)
