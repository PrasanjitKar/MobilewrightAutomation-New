# TC-HEAVY-EQUIPMENT-021 — Filter Category — filter by category multi-select

> Suite: [Heavy Equipment](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-HEAVY-EQUIPMENT-021 |
| **Suite** | heavy-equipment |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `heavy_equipment_filter_category` |
| **Feature File** | `features/regression/heavy_equipment.feature` |
| **Page Objects** | `src/pages/heavy-equipment-filter.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that selecting equipment categories in the filter modal filters the list to display only items belonging to those categories.

---

## ✅ Preconditions

- Equipment records across multiple categories exist

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open filter modal and tap "Category" multi-select | Multi-select popup displays equipment categories |
| 2 | Select "Vulcanizer" and "Winder" categories | Categories selected |
| 3 | Tap "Save" | List displays only equipment matching selected categories |

---

## 🏁 Expected Results

- Category filter restricts results to selected equipment types

---

## 🔍 Flutter Source Reference

```dart
// heavy_equipments_filter_modal.dart
void _setCategory(List<MultiSelectOption> selections) { ... }
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:heavy_equipment_filter_category @regression @both
Scenario: Filter heavy equipment by category
  Given the user opens the filter modal
  When the user selects equipment categories and saves
  Then only equipment matching the categories should be displayed
```

---

## 🔗 Related

- [TC-HEAVY-EQUIPMENT-020 — Filter by distributor](./tc-heavy-equipment-020-filter-by-distributor-shop.md)
- [Suite index](./index.md)
