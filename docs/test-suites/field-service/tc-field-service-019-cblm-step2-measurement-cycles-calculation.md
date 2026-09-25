# TC-FIELD-SERVICE-019 — CBLM Cycles Calculation — CBLM step 2 measurement cycles and auto-calculation

> Suite: [Field Service](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-FIELD-SERVICE-019 |
| **Suite** | field-service |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `field_service_cblm_cycles_calc` |
| **Feature File** | `features/regression/field_service.feature` |
| **Page Objects** | `src/pages/field-service-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that entering data across up to 6 measurement cycles (Belt Length, Speed, Quality Factor) automatically recalculates summary statistics (Average Length, Standard Deviation, Min/Max Length, Average Speed, Average Quality Factor).

---

## ✅ Preconditions

- Advanced to Step 2 (Measurement Cycles) of CBLM form

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | In Cycle 1, enter Belt Length `500.0`, Speed `4.5`, Quality Factor `0.95` | Fields accept values |
| 2 | In Cycle 2, enter Belt Length `502.0`, Speed `4.6`, Quality Factor `0.97` | Fields accept values |
| 3 | Observe summary section | Average Length displays `501.00`, Min Length `500.00`, Max Length `502.00`, Standard Deviation calculated, Average Speed `4.55`, Average Quality Factor `0.96` |

---

## 🏁 Expected Results

- Real-time statistical recalculation functions accurately on every keystroke

---

## 🔍 Flutter Source Reference

```dart
// measurement_cycle_step.dart
void _calculate() { ... _averageLength.text = ...; _standardDeviation.text = ...; }
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:field_service_cblm_cycles_calc @regression @both
Scenario: Auto-calculate summary statistics in CBLM Step 2
  Given the user is on Step 2 Measurement Cycles
  When the user enters values for cycles 1 and 2
  Then average length, standard deviation, and average speed should auto-calculate
```

---

## 🔗 Related

- [TC-FIELD-SERVICE-014 — CBLM stepper](./tc-field-service-014-cblm-form-initiation-and-stepper.md)
- [Suite index](./index.md)
