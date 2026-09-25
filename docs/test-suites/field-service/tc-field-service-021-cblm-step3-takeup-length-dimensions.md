# TC-FIELD-SERVICE-021 — CBLM Take-Up Dimensions — CBLM step 3 dynamic length dimensions (A, B, D)

> Suite: [Field Service](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-FIELD-SERVICE-021 |
| **Suite** | field-service |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `field_service_cblm_takeup_dims` |
| **Feature File** | `features/regression/field_service.feature` |
| **Page Objects** | `src/pages/field-service-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that Step 3 dynamically renders Length A and Length B input fields, and conditionally renders Length D when Take-Up Type is "Gravity".

---

## ✅ Preconditions

- On Step 3 of CBLM form

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Select Take-Up Type "Screw" | Length A and Length B input fields appear with trailing `m` |
| 2 | Switch Take-Up Type to "Gravity" | Length D input field appears alongside or replaces fields as per type |
| 3 | Enter numerical values (e.g. `12`, `15`) | Values saved to cubit state |

---

## 🏁 Expected Results

- Dynamic length inputs adjust according to selected take-up geometry

---

## 🔍 Flutter Source Reference

```dart
// positioning_step.dart
if (state.fieldServiceModel.formResponseData?.takeUpType!.name == 'Gravity') { ... MapEntry(2, 'D') ... }
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:field_service_cblm_takeup_dims @regression @both
Scenario: Dynamic length dimension inputs on take-up type change
  Given the user is on Step 3 Take-Up Positioning
  When the user selects "Gravity" take-up type
  Then Length D input should be rendered and accept numeric input
```

---

## 🔗 Related

- [TC-FIELD-SERVICE-020 — Take-up positioning drawing](./tc-field-service-020-cblm-step3-takeup-positioning-drawing.md)
- [Suite index](./index.md)
