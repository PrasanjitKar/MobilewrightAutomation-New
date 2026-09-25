# TC-FIELD-SERVICE-031 — SCBSQAF Hardness Testing — SCBSQAF step 10 hardness testing Shore A readings

> Suite: [Field Service](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-FIELD-SERVICE-031 |
| **Suite** | field-service |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `field_service_scbsqaf_hardness` |
| **Feature File** | `features/regression/field_service.feature` |
| **Page Objects** | `src/pages/field-service-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that Step 10 (Hardness Testing) captures Shore A Durometer hardness measurements across test points (Top cover, Bottom cover, Parent belt comparison).

---

## ✅ Preconditions

- Advanced to Step 10 of SCBSQAF form

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On Step 10, enter Shore A readings for Top Cover (e.g. `65`, `64`, `66`) | Points recorded |
| 2 | Enter Shore A readings for Bottom Cover and Parent Belt | Values recorded and compared against specifications |

---

## 🏁 Expected Results

- Hardness testing durometer readings are logged successfully

---

## 🔍 Flutter Source Reference

```dart
// hardness_testing_screen.dart & hardness_input_upload_widget.dart
HardnessTestingScreen(enabled: isNew || isEdit)
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:field_service_scbsqaf_hardness @regression @both
Scenario: Record Shore A hardness testing values in SCBSQAF Step 10
  Given the user is on Step 10 Hardness Testing
  When the user logs Shore A durometer hardness readings
  Then the hardness values should be saved in the form model
```

---

## 🔗 Related

- [TC-FIELD-SERVICE-030 — Finished splice defects](./tc-field-service-030-scbsqaf-step9-finished-splice-defects.md)
- [Suite index](./index.md)
