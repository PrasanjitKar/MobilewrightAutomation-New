# TC-HEAVY-EQUIPMENT-022 — Clear Filters — clear filters action and indicator dot

> Suite: [Heavy Equipment](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-HEAVY-EQUIPMENT-022 |
| **Suite** | heavy-equipment |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `heavy_equipment_clear_filters` |
| **Feature File** | `features/regression/heavy_equipment.feature` |
| **Page Objects** | `src/pages/heavy-equipment-filter.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that when active filters exist, a red dot appears on the AppBar filter icon, and tapping "Clear Filters" in the modal resets all criteria and dismisses the indicator dot.

---

## ✅ Preconditions

- Filters applied on `HeavyEquipmentListScreen`

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Check AppBar filter icon when filters are active | Red circle badge (`CircleAvatar`) is visible |
| 2 | Open filter modal and tap "Clear Filters" in header | All filters reset to default (Last Modified, no categories/distributors) |
| 3 | Tap "Save" | Full list restored; red circle badge disappears |

---

## 🏁 Expected Results

- Active filter indicator displays properly and clears on reset

---

## 🔍 Flutter Source Reference

```dart
// heavy_equipment_list_screen.dart & heavy_equipments_filter_modal.dart
state.filters.hasFilters ? const CircleAvatar(backgroundColor: ContiplusColors.continentalLightRed, radius: 5) : ...
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:heavy_equipment_clear_filters @regression @both
Scenario: Clear filters and verify indicator badge removal in heavy equipment
  Given active filters are applied with a red dot badge
  When the user clears filters in the modal and saves
  Then all filters should reset and the red badge disappear
```

---

## 🔗 Related

- [TC-HEAVY-EQUIPMENT-016 — Filter modal layout](./tc-heavy-equipment-016-filter-modal-layout-and-counter.md)
- [Suite index](./index.md)
