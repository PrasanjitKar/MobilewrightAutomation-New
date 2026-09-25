# TC-FIELD-SERVICE-036 — Filter Layout — filter modal layout and dynamic record counter

> Suite: [Field Service](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-FIELD-SERVICE-036 |
| **Suite** | field-service |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `field_service_filter_layout` |
| **Feature File** | `features/regression/field_service.feature` |
| **Page Objects** | `src/pages/field-service-filter.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that tapping the filter icon opens `FieldServiceFilterModal` with Sort options (Last Modified, A-Z, Z-A), Multi-selects for Form Type, Site, Conveyor, and a dynamic total count calculator.

---

## ✅ Preconditions

- On `FieldServiceListScreen`

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Tap the filter icon in the app bar | `FieldServiceFilterModal` bottom sheet opens |
| 2 | Verify filter sections | Displays Sort by (Last Modified, A-Z, Z-A), Form Type, Site, and Conveyor multi-selects |
| 3 | Observe bottom button | Displays "Save (N Results)" where $N$ dynamically updates with criteria selection |

---

## 🏁 Expected Results

- Filter modal displays all criteria sections and dynamic result counter

---

## 🔍 Flutter Source Reference

```dart
// field_service_filter_modal.dart
FiltersTemplate(totalResultCount: count, ...)
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:field_service_filter_layout @regression @both
Scenario: Open field service filter modal and verify dynamic counter
  Given the user is on the Field Service list
  When the user opens the filter modal
  Then sort options, form types, site, and conveyor multi-selects should be displayed with dynamic result count
```

---

## 🔗 Related

- [TC-FIELD-SERVICE-037 — Filter by form type, site, conveyor](./tc-field-service-037-filter-by-formtype-site-conveyor.md)
- [Suite index](./index.md)
