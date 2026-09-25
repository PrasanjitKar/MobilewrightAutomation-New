# TC-INSPECTIONS-014 — Filter Modal — sort inspections by Last Modified, A-Z, Z-A, Upload Pending, Uploaded

> Suite: [Inspections](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-INSPECTIONS-014 |
| **Suite** | inspections |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `inspection_filter_sort_options` |
| **Feature File** | `features/regression/inspections.feature` |
| **Page Objects** | `src/pages/inspections-filter-modal.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that `InspectionFiltersModal` provides sorting options ("Last Modified", "A to Z", "Z to A", "Upload Pending", "Uploaded") and orders the inspection records accordingly.

---

## ✅ Preconditions

- User is on `InspectionListScreen` with multiple inspection records

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open `InspectionFiltersModal` | Filter modal opens |
| 2 | Select "A to Z" (`aToZ`) sort option and tap "Apply" | Inspections are ordered alphabetically ascending by name |
| 3 | Re-open modal, select "Z to A" (`zToA`) and tap "Apply" | Inspections are ordered alphabetically descending by name |
| 4 | Re-open modal, select "Upload Pending" (`uploadPending`) and tap "Apply" | Pending upload inspections are pinned to the top of the list |
| 5 | Re-open modal, select "Last Modified" (`lastModified`) and tap "Apply" | Most recently modified inspections appear first |

---

## 🏁 Expected Results

- Sorting criteria correctly reorder the inspection list items

---

## 🔍 Flutter Source Reference

```dart
// inspection_list_bloc.dart
switch (sortBy) {
  case FilterSortBasedOn.lastModified:
    result.sort((a, b) => (b.updatedDate ?? DateTime(0)).compareTo(a.updatedDate ?? DateTime(0)));
  case FilterSortBasedOn.aToZ:
    result.sort((a, b) => a.name!.toLowerCase().compareTo(b.name!.toLowerCase()));
  case FilterSortBasedOn.zToA:
    result.sort((b, a) => a.name!.toLowerCase().compareTo(b.name!.toLowerCase()));
  case FilterSortBasedOn.uploadPending:
    ...
}
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:inspection_filter_sort_options @regression @both
Scenario: Sort inspections by name and status
  Given the user is on the Inspections screen
  When the user opens the filter modal and selects sort "A to Z"
  Then the inspections list should be sorted alphabetically from A to Z
```

---

## 🔗 Related

- [TC-INSPECTIONS-012 — Filter modal hierarchy](./tc-inspections-012-filter-modal-by-corporate-site-and-conveyor.md)
- [Suite index](./index.md)
