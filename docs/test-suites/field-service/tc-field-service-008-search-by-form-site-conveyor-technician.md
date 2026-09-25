# TC-FIELD-SERVICE-008 — Search — search by form, site, conveyor, and technician

> Suite: [Field Service](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-FIELD-SERVICE-008 |
| **Suite** | field-service |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `field_service_search` |
| **Feature File** | `features/regression/field_service.feature` |
| **Page Objects** | `src/pages/field-service-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that typing into the search bar filters field service forms in real time by matching form name, site name, conveyor name, or test personnel name.

---

## ✅ Preconditions

- Multiple field service forms exist with known titles and sites

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Tap the search icon in the app bar | Search bar opens with text field and close icon |
| 2 | Type a specific site name (e.g., "Quarry North") | List filters instantly to records matching "Quarry North" |
| 3 | Type a technician's name (e.g., "John") | List filters to forms authored by "John" |

---

## 🏁 Expected Results

- Search dynamically matches and filters across multiple record fields

---

## 🔍 Flutter Source Reference

```dart
// field_service_list_bloc.dart
void _onDeviceSearchEvent(FieldServiceSearchEvent event, ...) { ... }
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:field_service_search @regression @both
Scenario: Search field service forms by keyword
  Given the user is on the Field Service list
  When the user opens search and enters "<searchTerm>"
  Then only matching field service records should be visible
```

---

## 🔗 Related

- [TC-FIELD-SERVICE-009 — Search clear](./tc-field-service-009-search-clear-and-dismiss.md)
- [Suite index](./index.md)
