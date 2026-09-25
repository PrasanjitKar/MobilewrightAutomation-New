# TC-FIELD-SERVICE-025 — SCBSQAF General & Splice — SCBSQAF step 1 and 2 general and splice details

> Suite: [Field Service](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-FIELD-SERVICE-025 |
| **Suite** | field-service |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `field_service_scbsqaf_general_splice` |
| **Feature File** | `features/regression/field_service.feature` |
| **Page Objects** | `src/pages/field-service-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that Step 1 (General) captures Site, Conveyor, and Date, while Step 2 (Splice Details) captures Leading/Trailing belt specs (construction, rating, width, covers, age - New/Used), orientation, and number of stages/steps.

---

## ✅ Preconditions

- On Step 1 & 2 of SCBSQAF form

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | In Step 1, select Site and Conveyor | Selected and validated |
| 2 | Advance to Step 2 (Splice Details) | Splice Details form displays |
| 3 | Configure Leading Belt (New/Used), Trailing Belt, Orientation (Carry Cover Up / Pulley Cover Up), Stages (1, 2, 3), and Steps (1-5) | Selections saved into model |

---

## 🏁 Expected Results

- General and Splice specifications are recorded accurately

---

## 🔍 Flutter Source Reference

```dart
// general.dart & splice_details.dart
leadingBeltList, trailingBeltList, beltOrientationSpliceTableList, noOfStages, noOfSteps
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:field_service_scbsqaf_general_splice @regression @both
Scenario: Configure general and splice details in SCBSQAF
  Given the user is on SCBSQAF form
  When the user selects site and conveyor in Step 1 and fills splice details in Step 2
  Then belt specifications, orientation, stages, and steps should be saved
```

---

## 🔗 Related

- [TC-FIELD-SERVICE-024 — SCBSQAF Stepper](./tc-field-service-024-scbsqaf-form-initiation-stepper.md)
- [Suite index](./index.md)
