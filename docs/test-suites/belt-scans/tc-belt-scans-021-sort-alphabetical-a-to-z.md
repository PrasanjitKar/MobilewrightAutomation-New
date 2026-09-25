# TC-BELT-SCANS-021 — Sort A-Z — sort alphabetically A to Z by site name

> Suite: [Belt Scans](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-BELT-SCANS-021 |
| **Suite** | belt-scans |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `belt_scans_sort_a_to_z` |
| **Feature File** | `features/regression/belt_scans.feature` |
| **Page Objects** | `src/pages/belt-scans-filter.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that selecting "A-Z" sorting (`FilterSortBasedOn.aToZ`) orders belt scan records in ascending alphabetical order based on `site.name`.

---

## ✅ Preconditions

- Multiple belt scans across sites with varying names (e.g. "Alpha Site", "Beta Site", "Copper Mine") exist

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open Filter modal | Filter modal displays |
| 2 | Select "A-Z" radio button | `_sortBy` changes to `FilterSortBasedOn.aToZ` |
| 3 | Tap "Save" button | Modal dismisses; list sorts |
| 4 | Inspect list item order | Site names appear in ascending alphabetical order (A → Z) |

---

## 🏁 Expected Results

- List orders records accurately from A to Z by site name

---

## 🔍 Flutter Source Reference

```dart
// belt_scan_list_bloc.dart
else if (sortBy case FilterSortBasedOn.aToZ) {
  filtered.sort((a, b) {
    if (a.site?.name == null || b.site?.name == null) return -1;
    return a.site!.name!.toLowerCase().compareTo(b.site!.name!.toLowerCase());
  });
}
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:belt_scans_sort_a_to_z @regression @both
Scenario: Sort belt scans alphabetically A to Z
  Given the user opens the Belt Scans filter modal
  When the user selects "A-Z" sorting and applies
  Then the list should be sorted alphabetically from A to Z by site name
```

---

## 🔗 Related

- [TC-BELT-SCANS-022 — Sort Z-A](./tc-belt-scans-022-sort-alphabetical-z-to-a.md)
- [Suite index](./index.md)
