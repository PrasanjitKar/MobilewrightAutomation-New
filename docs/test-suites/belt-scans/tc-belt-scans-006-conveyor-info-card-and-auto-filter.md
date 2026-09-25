# TC-BELT-SCANS-006 — Conveyor Hub — Conveyor Information card and auto-filter

> Suite: [Belt Scans](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-BELT-SCANS-006 |
| **Suite** | belt-scans |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `conveyor_info_belt_scans_card` |
| **Feature File** | `features/regression/belt_scans.feature` |
| **Page Objects** | `src/pages/conveyor-details.page.ts`, `src/pages/belt-scans-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that on `ConveyorInformationScreen`, the Belt Scans card displays the count of scans belonging specifically to that conveyor (`element.conveyor == widget.conveyorId`), and tapping it dispatches `BeltScanListFilterEvent` with `isConveyorIdsPreSupplied: true` and navigates to the list.

---

## ✅ Preconditions

- Conveyor with known number of belt scans is selected

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open Conveyor Information screen for conveyor `C1` | Hub screen loads |
| 2 | Locate `beltScanCard` | Card counter shows exact count of scans for `C1` |
| 3 | Tap `beltScanCard` | `BeltScanListFilterEvent` fires with `conveyor: [C1]`, `isConveyorIdsPreSupplied: true` |
| 4 | Observe `BeltScanListScreen` | Only scans matching conveyor `C1` are rendered |
| 5 | Open Filter modal | Site and Conveyor selectors are locked/disabled |

---

## 🏁 Expected Results

- Scans are automatically scoped to the parent conveyor without manual user filtering

---

## 🔍 Flutter Source Reference

```dart
// conveyor_information_screen.dart
context.read<BeltScanListBloc>().add(
  BeltScanListFilterEvent(
    beltScanFilters: BeltScanFilters(
      conveyor: [widget.conveyorId],
      isConveyorIdsPreSupplied: true,
    ),
  ),
);
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:conveyor_info_belt_scans_card @regression @both
Scenario: Auto-filter Belt Scans from Conveyor Information card
  Given the user is on the Conveyor Information screen
  When the user taps the Belt Scans card
  Then the Belt Scans screen should open with scans filtered to that conveyor
  And the filter options for Site and Conveyor should be locked
```

---

## 🔗 Related

- [TC-BELT-SCANS-029 — Pre-supplied conveyor filter mode](./tc-belt-scans-029-pre-supplied-conveyor-filter-mode.md)
- [Suite index](./index.md)
