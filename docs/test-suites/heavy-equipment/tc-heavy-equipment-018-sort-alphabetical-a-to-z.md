# TC-HEAVY-EQUIPMENT-018 — Sort A-Z — sort alphabetical A to Z

> Suite: [Heavy Equipment](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-HEAVY-EQUIPMENT-018 |
| **Suite** | heavy-equipment |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `heavy_equipment_sort_az` |
| **Feature File** | `features/regression/heavy_equipment.feature` |
| **Page Objects** | `src/pages/heavy-equipment-filter.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that selecting "A-Z" sort in the filter modal reorders the heavy equipment list in ascending alphabetical order by equipment name.

---

## ✅ Preconditions

- Multiple heavy equipment records with varying names

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open filter modal and select "A-Z" radio button | Option selected |
| 2 | Tap "Save" | Filter executes |
| 3 | Verify list ordering | Equipment items sort alphabetically from A to Z |

---

## 🏁 Expected Results

- Equipment records sort in alphabetical order (A to Z)

---

## 🔍 Flutter Source Reference

```dart
// heavy_equipment_list_bloc.dart
if (sortBy case FilterSortBasedOn.aToZ) { filtered.sort((a, b) => a.name!.toLowerCase().compareTo(b.name!.toLowerCase())); }
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:heavy_equipment_sort_az @regression @both
Scenario: Sort heavy equipment alphabetically A to Z
  Given the user opens the filter modal
  When the user selects "A-Z" sort and saves
  Then the equipment list should be ordered alphabetically from A to Z
```

---

## 🔗 Related

- [TC-HEAVY-EQUIPMENT-019 — Sort Z to A](./tc-heavy-equipment-019-sort-alphabetical-z-to-a.md)
- [Suite index](./index.md)
