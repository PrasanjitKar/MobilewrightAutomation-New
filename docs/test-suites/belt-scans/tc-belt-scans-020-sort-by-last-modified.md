# TC-BELT-SCANS-020 — Sort Last Modified — sort by updated date descending

> Suite: [Belt Scans](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-BELT-SCANS-020 |
| **Suite** | belt-scans |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `belt_scans_sort_last_modified` |
| **Feature File** | `features/regression/belt_scans.feature` |
| **Page Objects** | `src/pages/belt-scans-filter.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that selecting "Last Modified" sorting (`FilterSortBasedOn.lastModified`) orders belt scan records by `updatedDate` in descending order (most recently modified first).

---

## ✅ Preconditions

- Multiple belt scans with varying `updatedDate` timestamps exist

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open Filter modal | Default sort is "Last Modified" |
| 2 | Select "Last Modified" radio and tap Save / Apply | Modal closes; `BeltScanListFilterEvent` executes |
| 3 | Inspect order of scan records | Scans are ordered with the newest `updatedDate` at the top |

---

## 🏁 Expected Results

- List orders records accurately by updated timestamp

---

## 🔍 Flutter Source Reference

```dart
// belt_scan_list_bloc.dart
if (sortBy case FilterSortBasedOn.lastModified) {
  filtered.sort((b, a) => a.updatedDate!.compareTo(b.updatedDate!));
}
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:belt_scans_sort_last_modified @regression @both
Scenario: Sort belt scans by last modified date
  Given the user opens the Belt Scans filter modal
  When the user selects "Last Modified" sorting and applies
  Then the list should display the most recently modified scans at the top
```

---

## 🔗 Related

- [TC-BELT-SCANS-021 — Sort A-Z](./tc-belt-scans-021-sort-alphabetical-a-to-z.md)
- [Suite index](./index.md)
