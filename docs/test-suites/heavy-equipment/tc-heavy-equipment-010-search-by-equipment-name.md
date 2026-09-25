# TC-HEAVY-EQUIPMENT-010 — Search — search by equipment name in list

> Suite: [Heavy Equipment](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-HEAVY-EQUIPMENT-010 |
| **Suite** | heavy-equipment |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `heavy_equipment_search` |
| **Feature File** | `features/regression/heavy_equipment.feature` |
| **Page Objects** | `src/pages/heavy-equipment-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that typing into the search bar dynamically filters equipment by matching equipment name in real time.

---

## ✅ Preconditions

- Multiple heavy equipment records exist

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Tap the search icon in the AppBar | Search bar opens with text input |
| 2 | Enter equipment name keyword (e.g. "Excavator") | List filters in real time to matching equipment items |
| 3 | Verify filtered list | Only items containing "Excavator" are shown |

---

## 🏁 Expected Results

- Search filters the equipment list instantaneously

---

## 🔍 Flutter Source Reference

```dart
// heavy_equipment_list_bloc.dart
List<HeavyEquipmentModel> search(List<HeavyEquipmentModel> heavyEquipments, String search) { ... }
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:heavy_equipment_search @regression @both
Scenario: Search heavy equipment by name keyword
  Given the user is on the Heavy Equipment list
  When the user opens search and enters "<searchTerm>"
  Then only matching heavy equipment items should be displayed
```

---

## 🔗 Related

- [TC-HEAVY-EQUIPMENT-011 — Search clear](./tc-heavy-equipment-011-search-clear-and-dismiss.md)
- [Suite index](./index.md)
