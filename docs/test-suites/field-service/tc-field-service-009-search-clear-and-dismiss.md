# TC-FIELD-SERVICE-009 — Search Clear — search clear and dismiss keyboard

> Suite: [Field Service](./index.md) | Priority: Low | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-FIELD-SERVICE-009 |
| **Suite** | field-service |
| **Priority** | Low |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `field_service_search_clear` |
| **Feature File** | `features/regression/field_service.feature` |
| **Page Objects** | `src/pages/field-service-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that tapping the "close" (X) icon in the search bar clears query text, closes the search bar, and restores the full list.

---

## ✅ Preconditions

- Search query is active with filtered results

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On active search bar with text, tap the "X" suffix icon | Search text clears, search bar closes, and keyboard dismisses |
| 2 | Observe list | Full unfiltered list is restored |

---

## 🏁 Expected Results

- Search state resets cleanly

---

## 🔍 Flutter Source Reference

```dart
// field_service_list_screen.dart
setState(() { searching = false; _searchCtrl.text = ''; onSearch(); });
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:field_service_search_clear @regression @both
Scenario: Clear and dismiss search in field service
  Given an active search query is applied on Field Service
  When the user taps the search close icon
  Then the search bar should dismiss and the full list be restored
```

---

## 🔗 Related

- [TC-FIELD-SERVICE-008 — Search](./tc-field-service-008-search-by-form-site-conveyor-technician.md)
- [Suite index](./index.md)
