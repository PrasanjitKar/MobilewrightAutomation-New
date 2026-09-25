# TC-HEAVY-EQUIPMENT-009 — Footer Widget — last updated timestamp and counter footer

> Suite: [Heavy Equipment](./index.md) | Priority: Low | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-HEAVY-EQUIPMENT-009 |
| **Suite** | heavy-equipment |
| **Priority** | Low |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `heavy_equipment_footer_widget` |
| **Feature File** | `features/regression/heavy_equipment.feature` |
| **Page Objects** | `src/pages/heavy-equipment-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that `LastUpdatedTimeAndTotalCountWidget` in the list footer renders the accurate total count and formatted last sync time.

---

## ✅ Preconditions

- On `HeavyEquipmentListScreen`

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Scroll to the bottom of the Heavy Equipment list | Footer widget is visible |
| 2 | Verify count | Matches the number of rendered equipment rows |
| 3 | Verify timestamp | Displays last updated sync time |

---

## 🏁 Expected Results

- List footer accurately displays list metadata and sync status

---

## 🔍 Flutter Source Reference

```dart
// heavy_equipment_list_screen.dart
LastUpdatedTimeAndTotalCountWidget(listLength: listItems.length, lastUpdatedTime: state.lastUpdatedTime, module: 'HeavyEquipment')
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:heavy_equipment_footer_widget @regression @both
Scenario: Verify heavy equipment footer count and sync timestamp
  Given the user is on the Heavy Equipment list
  Then the footer should display the total items count and last updated time
```

---

## 🔗 Related

- [TC-HEAVY-EQUIPMENT-005 — Dashboard counter](./tc-heavy-equipment-005-dashboard-card-counter.md)
- [Suite index](./index.md)
