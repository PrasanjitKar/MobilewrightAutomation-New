# TC-CONVEYORS-017 — Filter by Inspection Items status (Complete / To be completed / NA)

> Suite: [Conveyors](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYORS-017 |
| **Suite** | conveyors |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `conveyors_filter_inspection_items` |
| **Feature File** | `features/regression/conveyors.feature` |
| **Page Objects** | `src/pages/conveyor-filters.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify the Inspection Items filter (`inspectionItemsDropdown`) correctly filters conveyors by their inspection completion status: Complete, To be completed, or NA.

---

## ✅ Preconditions

- User has view permission for conveyors
- Conveyors exist covering each state: fully completed inspections, pending (`toBeCompleted > 0`), and no inspection data at all

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open filters, select "Complete" (`id: '1'`), apply | List shows only conveyors with `toBeCompleted == 0` (and non-null) |
| 2 | Reopen filters, select "To be completed" (`id: '0'`), apply | List shows only conveyors with `toBeCompleted > 0` |
| 3 | Reopen filters, select "NA" (`id: '2'`), apply | List shows only conveyors where both `toBeCompleted` and `completed` are null |

---

## 🏁 Expected Results

- Each option maps to the correct `InspectionItemStatus` enum value and filters accordingly
- Selecting multiple options (if supported by UI) unions the matching sets

---

## 🔍 Flutter Source Reference

```dart
// conveyor_list_bloc.dart — filter()
final List<InspectionItemStatus?> itemStatus = filters.filterInspectionItems
    .map((e) => inspectionItemStatusMapEnum[int.tryParse(e)])
    .toList();
if (itemStatus.isNotEmpty) {
  result = result.where((element) {
    final InspectionCountModel? inspectionCount = element.inspectionCount;
    return (itemStatus.contains(InspectionItemStatus.completed) &&
            inspectionCount?.toBeCompleted != null && inspectionCount!.toBeCompleted! == 0) ||
        (itemStatus.contains(InspectionItemStatus.toBeCompleted) &&
            inspectionCount?.toBeCompleted != null && inspectionCount!.toBeCompleted! > 0) ||
        (itemStatus.contains(null) &&
            [element.inspectionCount?.toBeCompleted, element.inspectionCount?.completed].contains(null));
  }).toList();
}
```

**Semantic label:** `inspectionItemsDropdown` (tablet: `inspectionItemsDropdownForTab`) — options Complete (`'1'`), To be completed (`'0'`), NA (`'2'`)

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/conveyorsdata.csv @Key:conveyors_filter_inspection_items @regression @both
Scenario Outline: Filter conveyors by inspection item status
  Given the user opens the conveyors filter modal
  When the user selects "<status>" in Inspection Items and applies
  Then only conveyors matching "<status>" should be displayed

  Examples:
    | status            |
    | Complete          |
    | To be completed   |
    | NA                |
```

---

## 🔗 Related

- [Suite index](./index.md)
