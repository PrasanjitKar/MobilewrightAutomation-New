# TC-FIELD-SERVICE-010 — Empty State — empty state presentation on zero matches

> Suite: [Field Service](./index.md) | Priority: Low | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-FIELD-SERVICE-010 |
| **Suite** | field-service |
| **Priority** | Low |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `field_service_empty_state` |
| **Feature File** | `features/regression/field_service.feature` |
| **Page Objects** | `src/pages/field-service-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that entering a non-matching search term displays an empty list with count 0.

---

## ✅ Preconditions

- On `FieldServiceListScreen`

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open search and enter `XYZ999NONEXISTENT` | Query entered |
| 2 | Observe list and footer | 0 items rendered; footer shows total 0 |

---

## 🏁 Expected Results

- Empty state is displayed gracefully without errors

---

## 🔍 Flutter Source Reference

```dart
// field_service_list_screen.dart
LastUpdatedTimeAndTotalCountWidget(listLength: state.deviceList.length, ...)
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:field_service_empty_state @regression @both
Scenario: Verify empty state on zero search matches
  Given the user is searching in Field Service
  When the user enters a non-existent search term
  Then the list should display zero items
```

---

## 🔗 Related

- [TC-FIELD-SERVICE-008 — Search](./tc-field-service-008-search-by-form-site-conveyor-technician.md)
- [Suite index](./index.md)
