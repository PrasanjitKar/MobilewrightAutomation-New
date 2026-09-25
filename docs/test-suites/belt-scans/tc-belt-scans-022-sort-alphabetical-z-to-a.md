# TC-BELT-SCANS-022 — Sort Z-A — sort alphabetically Z to A by site name

> Suite: [Belt Scans](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-BELT-SCANS-022 |
| **Suite** | belt-scans |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `belt_scans_sort_z_to_a` |
| **Feature File** | `features/regression/belt_scans.feature` |
| **Page Objects** | `src/pages/belt-scans-filter.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that selecting "Z-A" sorting (`FilterSortBasedOn.zToA`) orders belt scan records in descending alphabetical order based on `site.name`.

---

## ✅ Preconditions

- Multiple belt scans across sites with varying names exist

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open Filter modal | Filter modal displays |
| 2 | Select "Z-A" radio button | `_sortBy` changes to `FilterSortBasedOn.zToA` |
| 3 | Tap "Save" button | Modal dismisses; list sorts |
| 4 | Inspect list item order | Site names appear in descending alphabetical order (Z → A) |

---

## 🏁 Expected Results

- List orders records accurately from Z to A by site name

---

## 🔍 Flutter Source Reference

```dart
// belt_scan_list_bloc.dart
else if (sortBy case FilterSortBasedOn.zToA) {
  filtered.sort((b, a) {
    if (a.site?.name == null || b.site?.name == null) return 1;
    return a.site!.name!.toLowerCase().compareTo(b.site!.name!.toLowerCase());
  });
}
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:belt_scans_sort_z_to_a @regression @both
Scenario: Sort belt scans alphabetically Z to A
  Given the user opens the Belt Scans filter modal
  When the user selects "Z-A" sorting and applies
  Then the list should be sorted alphabetically from Z to A by site name
```

---

## 🔗 Related

- [TC-BELT-SCANS-021 — Sort A-Z](./tc-belt-scans-021-sort-alphabetical-a-to-z.md)
- [Suite index](./index.md)
