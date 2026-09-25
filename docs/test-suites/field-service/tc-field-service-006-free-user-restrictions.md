# TC-FIELD-SERVICE-006 — Free User — free user access restrictions

> Suite: [Field Service](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-FIELD-SERVICE-006 |
| **Suite** | field-service |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `field_service_free_user` |
| **Feature File** | `features/regression/field_service.feature` |
| **Page Objects** | `src/pages/field-service-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that a free tier user (`isFreeUser == true`) is prevented from creating or modifying field service forms and receives proper upgrade or limitation guidance.

---

## ✅ Preconditions

- User logged in with free tier account

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Log in with a free tier account | Home dashboard loads |
| 2 | Navigate to Field Service | Access is gated or read-only |
| 3 | Check FAB (+) or form creation actions | FAB (+) is hidden or displays restricted modal |

---

## 🏁 Expected Results

- Free users are restricted according to business tier definitions

---

## 🔍 Flutter Source Reference

```dart
// field_service_list_screen.dart
//check free user
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:field_service_free_user @regression @both
Scenario: Restrict field service actions for free user
  Given a free tier user is logged in
  When navigating to Field Service
  Then creation and edit actions should be restricted
```

---

## 🔗 Related

- [TC-FIELD-SERVICE-004 — Permission gating](./tc-field-service-004-permission-gating.md)
- [Suite index](./index.md)
