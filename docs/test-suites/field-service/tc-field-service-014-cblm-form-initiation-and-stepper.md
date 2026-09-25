# TC-FIELD-SERVICE-014 — CBLM Stepper — CBLM form initiation and 4-step stepper layout

> Suite: [Field Service](./index.md) | Priority: Critical | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-FIELD-SERVICE-014 |
| **Suite** | field-service |
| **Priority** | Critical |
| **Type** | Smoke |
| **Suggested Tags** | `@smoke @both` |
| **Data Key** | `field_service_cblm_stepper` |
| **Feature File** | `features/smoke/field_service.feature` |
| **Page Objects** | `src/pages/field-service-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that selecting Conveyor Belt Length Measurement (`FSM_CBLM`) opens `FieldServiceDetailsScreen` with the 4 horizontal stepper steps: General Details, Measurement Cycles, Take-up Positioning, and Additional Details.

---

## ✅ Preconditions

- User initiated new form from FAB (+) selecting CBLM

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Choose Form Type "Conveyor Belt Length Measurement" and tap Next | `FieldServiceDetailsScreen` opens |
| 2 | Check title bar | Title displays "Add Length Measurement" |
| 3 | Verify stepper header | 4 steps are visible: 1. General Details, 2. Measurement Cycles, 3. Take-up Positioning, 4. Additional Details |
| 4 | Attempt to advance to Step 2 without filling Site/Conveyor | "Please select a conveyor" snackbar appears; navigation is blocked |

---

## 🏁 Expected Results

- Stepper loads 4 steps and enforces mandatory conveyor selection to advance

---

## 🔍 Flutter Source Reference

```dart
// field_service_details_screen.dart
EnhanceStepper(steps: [GeneralStep, MeasurementCycleStep, PositioningStep, AdditionalDetailsStep])
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/smokedata.csv @Key:field_service_cblm_stepper @smoke @both
Scenario: Initiate CBLM form and verify 4-step stepper
  Given the user selects Conveyor Belt Length Measurement form type
  When the details screen loads
  Then 4 horizontal steps should be present with General Details active
```

---

## 🔗 Related

- [TC-FIELD-SERVICE-015 — Step 1 site conveyor](./tc-field-service-015-cblm-step1-site-conveyor-mandatory.md)
- [Suite index](./index.md)
