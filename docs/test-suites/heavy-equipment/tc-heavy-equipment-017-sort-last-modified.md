# TC-HEAVY-EQUIPMENT-017 — Sort Last Modified — sort by last modified default

> Suite: [Heavy Equipment](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-HEAVY-EQUIPMENT-017 |
| **Suite** | heavy-equipment |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `heavy_equipment_sort_modified` |
| **Feature File** | `features/regression/heavy_equipment.feature` |
| **Page Objects** | `src/pages/heavy-equipment-filter.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that selecting "Last Modified" in the filter modal sorts heavy equipment with the most recently updated items first.

---

## ✅ Preconditions

- Multiple heavy equipment records with different update timestamps

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open filter modal and select "Last Modified" radio button | Option selected |
| 2 | Tap "Save" | Filter applies |
| 3 | Verify list ordering | Equipment items order in descending order by `updatedDate` |

---

## 🏁 Expected Results

- Equipment records order by latest modification date

---

## 🔍 Flutter Source Reference

```dart
// heavy_equipment_list_bloc.dart
filtered.sort((b, a) => a.updatedDate!.compareTo(b.updatedDate!));
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:heavy_equipment_sort_modified @regression @both
Scenario: Sort heavy equipment by last modified date
  Given the user opens the filter modal
  When the user selects "Last Modified" sort and saves
  Then the equipment list should be ordered by most recently updated first
```

---

## 🔗 Related

- [TC-HEAVY-EQUIPMENT-018 — Sort A to Z](./tc-heavy-equipment-018-sort-alphabetical-a-to-z.md)
- [Suite index](./index.md)
