# TC-HEAVY-EQUIPMENT-016 — Filter Modal Layout — filter modal layout and dynamic record counter

> Suite: [Heavy Equipment](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-HEAVY-EQUIPMENT-016 |
| **Suite** | heavy-equipment |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `heavy_equipment_filter_layout` |
| **Feature File** | `features/regression/heavy_equipment.feature` |
| **Page Objects** | `src/pages/heavy-equipment-filter.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that opening `HeavyEquipmentFilterModal` displays Sort options (Last Modified, A-Z, Z-A), Multi-selects for Distributor and Category, and a dynamic matching result count.

---

## ✅ Preconditions

- On `HeavyEquipmentListScreen`

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Tap the filter icon in the AppBar | `HeavyEquipmentFilterModal` bottom sheet opens |
| 2 | Verify sections | Displays Sort By radios, Distributor Multi-select, and Category Multi-select |
| 3 | Observe bottom button | Displays dynamic result counter matching selected criteria |

---

## 🏁 Expected Results

- Filter modal renders all filter components and dynamic counter accurately

---

## 🔍 Flutter Source Reference

```dart
// heavy_equipments_filter_modal.dart
FiltersTemplate(totalResultCount: showAllResults ? count : null, ...)
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:heavy_equipment_filter_layout @regression @both
Scenario: Open heavy equipment filter modal and verify components
  Given the user is on the Heavy Equipment list
  When the user opens the filter modal
  Then sort options, distributor, and category multi-selects should be displayed with dynamic result count
```

---

## 🔗 Related

- [TC-HEAVY-EQUIPMENT-017 — Sort last modified](./tc-heavy-equipment-017-sort-last-modified.md)
- [Suite index](./index.md)
