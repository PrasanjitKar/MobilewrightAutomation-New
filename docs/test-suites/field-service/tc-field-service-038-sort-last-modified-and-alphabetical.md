# TC-FIELD-SERVICE-038 — Sorting — sort by last modified, A-Z, and Z-A

> Suite: [Field Service](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-FIELD-SERVICE-038 |
| **Suite** | field-service |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `field_service_sorting` |
| **Feature File** | `features/regression/field_service.feature` |
| **Page Objects** | `src/pages/field-service-filter.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that selecting Last Modified, A-Z, or Z-A sorting in the filter modal reorders the field service list accordingly.

---

## ✅ Preconditions

- Multiple field service forms exist

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open filter modal, select "A-Z" sort, tap Save | List sorts alphabetically by form name |
| 2 | Open filter modal, select "Z-A" sort, tap Save | List sorts reverse alphabetically |
| 3 | Open filter modal, select "Last Modified", tap Save | List sorts by latest update timestamp |

---

## 🏁 Expected Results

- Sorting correctly reorders records according to chosen sorting criteria

---

## 🔍 Flutter Source Reference

```dart
// field_service_list_bloc.dart
List<FieldServiceModel> _sort(List<FieldServiceModel> devices, FilterSortBasedOn sortBy) { ... }
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:field_service_sorting @regression @both
Scenario: Sort field service list by date and alphabetically
  Given the user is on Field Service list
  When the user selects "A-Z" sort in the filter modal and saves
  Then the records should be ordered alphabetically
```

---

## 🔗 Related

- [TC-FIELD-SERVICE-036 — Filter layout](./tc-field-service-036-filter-modal-layout-and-counter.md)
- [Suite index](./index.md)
