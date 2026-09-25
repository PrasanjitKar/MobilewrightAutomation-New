# TC-HEAVY-EQUIPMENT-020 — Filter Distributor — filter by distributor shop multi-select

> Suite: [Heavy Equipment](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-HEAVY-EQUIPMENT-020 |
| **Suite** | heavy-equipment |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `heavy_equipment_filter_distributor` |
| **Feature File** | `features/regression/heavy_equipment.feature` |
| **Page Objects** | `src/pages/heavy-equipment-filter.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that selecting one or more Distributor Shops in the filter modal restricts displayed equipment to those assigned to the chosen distributors.

---

## ✅ Preconditions

- Equipment across multiple distributor shops exist

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open filter modal and tap "Distributor" multi-select | Multi-select popup opens with distributor shop list |
| 2 | Select a distributor shop (e.g. "Atlas Service Center") | Option selected |
| 3 | Tap "Save" | List displays only equipment belonging to "Atlas Service Center" |

---

## 🏁 Expected Results

- Equipment list filters accurately by selected distributor shops

---

## 🔍 Flutter Source Reference

```dart
// heavy_equipments_filter_modal.dart
void _setDistributorShop(List<MultiSelectOption> selections) { ... }
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:heavy_equipment_filter_distributor @regression @both
Scenario: Filter heavy equipment by distributor shop
  Given the user opens the filter modal
  When the user selects a distributor shop and saves
  Then only equipment from the selected distributor should be visible
```

---

## 🔗 Related

- [TC-HEAVY-EQUIPMENT-021 — Filter by category](./tc-heavy-equipment-021-filter-by-category.md)
- [Suite index](./index.md)
