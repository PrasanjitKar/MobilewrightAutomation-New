# TC-FIELD-SERVICE-032 — SCBSQAF Sign Off — SCBSQAF step 11 sign-off and approver signatures

> Suite: [Field Service](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-FIELD-SERVICE-032 |
| **Suite** | field-service |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `field_service_scbsqaf_sign_off` |
| **Feature File** | `features/regression/field_service.feature` |
| **Page Objects** | `src/pages/field-service-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that Step 11 (Sign Off) captures Customer Representative details, Technician signature, Supervisor signature, and final sign-off approval.

---

## ✅ Preconditions

- Advanced to Step 11 of SCBSQAF form

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On Step 11, enter Customer Representative Name and Company | Details saved |
| 2 | Capture Technician digital signature on canvas | Signature stroke captured |
| 3 | Capture Supervisor digital signature on canvas | Signature stroke captured |
| 4 | Tap Save/Create | Form completes and submits/saves |

---

## 🏁 Expected Results

- Complete sign-off authorization with dual signatures is captured

---

## 🔍 Flutter Source Reference

```dart
// sign_off.dart & supervisior_widget.dart
SignOffScreen(enabled: isNew || isEdit)
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:field_service_scbsqaf_sign_off @regression @both
Scenario: Authorize and sign off SCBSQAF form in Step 11
  Given the user is on Step 11 Sign Off
  When the user enters representative info and signs the canvas
  Then the form should be authorized and saved successfully
```

---

## 🔗 Related

- [TC-FIELD-SERVICE-024 — SCBSQAF Stepper](./tc-field-service-024-scbsqaf-form-initiation-stepper.md)
- [Suite index](./index.md)
