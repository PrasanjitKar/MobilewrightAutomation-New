# TC-FIELD-SERVICE-037 — Filter Form Type, Site, Conveyor — filter by form type, site, and conveyor multi-select

> Suite: [Field Service](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-FIELD-SERVICE-037 |
| **Suite** | field-service |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `field_service_filter_multiselect` |
| **Feature File** | `features/regression/field_service.feature` |
| **Page Objects** | `src/pages/field-service-filter.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that selecting multiple Form Types, Sites, and Conveyors filters the list to matching records only.

---

## ✅ Preconditions

- Records across multiple form types and sites exist

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | In filter modal, select Form Type "Conveyor Belt Length Measurement" | Form type filtered |
| 2 | Select Site "North Quarry" | Conveyors filter to North Quarry |
| 3 | Tap "Save" | List displays only CBLM forms for North Quarry |

---

## 🏁 Expected Results

- Multi-select filters apply combined narrowing accurately

---

## 🔍 Flutter Source Reference

```dart
// field_service_filter_modal.dart
void _applyFilters() { ... FieldServiceFilter(siteIds: ..., conveyorIds: ..., formTypes: ...) }
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:field_service_filter_multiselect @regression @both
Scenario: Apply multi-criteria filtering on field service list
  Given the user opens the filter modal
  When the user selects a form type and site and applies filters
  Then only matching field service records should be displayed
```

---

## 🔗 Related

- [TC-FIELD-SERVICE-036 — Filter layout](./tc-field-service-036-filter-modal-layout-and-counter.md)
- [Suite index](./index.md)
