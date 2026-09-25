# TC-FIELD-SERVICE-007 — Pull to Refresh — pull to refresh and list reload

> Suite: [Field Service](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-FIELD-SERVICE-007 |
| **Suite** | field-service |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `field_service_pull_refresh` |
| **Feature File** | `features/regression/field_service.feature` |
| **Page Objects** | `src/pages/field-service-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that dragging down the list triggers `RefreshIndicator`, firing `FieldServiceListLoadEvent` to fetch latest server updates.

---

## ✅ Preconditions

- On `FieldServiceListScreen`

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Swipe down from the top of the list | Refresh spinner triggers |
| 2 | Wait for request completion | Spinner dismisses and list re-renders with fresh data |

---

## 🏁 Expected Results

- List reloads cleanly without state corruption

---

## 🔍 Flutter Source Reference

```dart
// field_service_list_screen.dart
RefreshIndicator(onRefresh: () async { fieldServiceListBloc.add(const FieldServiceListLoadEvent()); })
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:field_service_pull_refresh @regression @both
Scenario: Pull to refresh field service list
  Given the user is viewing the Field Service list
  When the user pulls down the list to refresh
  Then the list should reload with updated server data
```

---

## 🔗 Related

- [TC-FIELD-SERVICE-001 — List load](./tc-field-service-001-list-loads-with-permitted-view.md)
- [Suite index](./index.md)
