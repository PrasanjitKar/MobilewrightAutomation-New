# TC-HEAVY-EQUIPMENT-019 — Sort Z-A — sort alphabetical Z to A

> Suite: [Heavy Equipment](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-HEAVY-EQUIPMENT-019 |
| **Suite** | heavy-equipment |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `heavy_equipment_sort_za` |
| **Feature File** | `features/regression/heavy_equipment.feature` |
| **Page Objects** | `src/pages/heavy-equipment-filter.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that selecting "Z-A" sort in the filter modal reorders the heavy equipment list in descending alphabetical order by equipment name.

---

## ✅ Preconditions

- Multiple heavy equipment records with varying names

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open filter modal and select "Z-A" radio button | Option selected |
| 2 | Tap "Save" | Filter executes |
| 3 | Verify list ordering | Equipment items sort reverse alphabetically from Z to A |

---

## 🏁 Expected Results

- Equipment records sort in reverse alphabetical order (Z to A)

---

## 🔍 Flutter Source Reference

```dart
// heavy_equipment_list_bloc.dart
else if (sortBy case FilterSortBasedOn.zToA) { filtered.sort((b, a) => a.name!.toLowerCase().compareTo(b.name!.toLowerCase())); }
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:heavy_equipment_sort_za @regression @both
Scenario: Sort heavy equipment reverse alphabetically Z to A
  Given the user opens the filter modal
  When the user selects "Z-A" sort and saves
  Then the equipment list should be ordered reverse alphabetically from Z to A
```

---

## 🔗 Related

- [TC-HEAVY-EQUIPMENT-018 — Sort A to Z](./tc-heavy-equipment-018-sort-alphabetical-a-to-z.md)
- [Suite index](./index.md)
