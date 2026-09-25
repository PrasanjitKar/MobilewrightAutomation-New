# TC-FIELD-SERVICE-003 — Navigation Sources — dashboard card and drawer entry points

> Suite: [Field Service](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-FIELD-SERVICE-003 |
| **Suite** | field-service |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `field_service_navigation_sources` |
| **Feature File** | `features/regression/field_service.feature` |
| **Page Objects** | `src/pages/dashboard.page.ts`, `src/pages/field-service-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that users can navigate to Field Service from the Home dashboard card and side menu drawer, landing directly on `FieldServiceListScreen`.

---

## ✅ Preconditions

- User logged in with `InternalToolsModule.fieldService` access

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On Home Dashboard, locate the "Field Service" module card | Card displays total count of forms |
| 2 | Tap the Field Service card | Navigates to `FieldServiceListScreen` |
| 3 | Tap Back, open Navigation Drawer, and select "Field Service" | Navigates to `FieldServiceListScreen` |

---

## 🏁 Expected Results

- Both entry points successfully transition to Field Service list

---

## 🔍 Flutter Source Reference

```dart
// home_screen.dart & app.dart
RouteNameKeys.fieldServiceListScreen
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:field_service_navigation_sources @regression @both
Scenario: Navigate to field service from dashboard and drawer
  Given the user is on the Home dashboard
  When the user taps the Field Service module card
  Then the Field Service list screen should be displayed
```

---

## 🔗 Related

- [TC-FIELD-SERVICE-001 — List load](./tc-field-service-001-list-loads-with-permitted-view.md)
- [Suite index](./index.md)
