# TC-FIELD-SERVICE-024 — SCBSQAF Stepper — SCBSQAF form initiation and 11-step stepper layout

> Suite: [Field Service](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-FIELD-SERVICE-024 |
| **Suite** | field-service |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `field_service_scbsqaf_stepper` |
| **Feature File** | `features/regression/field_service.feature` |
| **Page Objects** | `src/pages/field-service-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that selecting Steel Cord & Fabric Splice QA Form (`FSM_SCBSQAF`) opens `SteelCordAndFabricConveyorBeltDetailsScreen` with the 11 sequential steps.

---

## ✅ Preconditions

- FAB (+) tapped and Form Type "Steel Cord & Fabric Splice QA Form" selected

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Tap Next on create form modal with SCBSQAF | `SteelCordAndFabricConveyorBeltDetailsScreen` loads |
| 2 | Verify 11 steps in horizontal stepper | 1. General, 2. Splice Details, 3. Pre Splicing, 4. Splicing Materials, 5. Data Record, 6. Thermocouple Positions, 7. Readings, 8. Curing Details, 9. Finished Splice, 10. Hardness Testing, 11. Sign Off |

---

## 🏁 Expected Results

- Complete 11-step stepper is rendered and initialized in edit mode

---

## 🔍 Flutter Source Reference

```dart
// steel_cord_conveyor_belt_details_screen.dart
List<EnhanceStep> _buildAllSteps() { ... }
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:field_service_scbsqaf_stepper @regression @both
Scenario: Initiate SCBSQAF form and verify 11-step stepper
  Given the user selects Steel Cord and Fabric Splice QA form type
  When the details screen loads
  Then 11 sequential steps should be present in the horizontal stepper
```

---

## 🔗 Related

- [TC-FIELD-SERVICE-025 — SCBSQAF Step 1 & 2](./tc-field-service-025-scbsqaf-step1-2-general-and-splice-details.md)
- [Suite index](./index.md)
