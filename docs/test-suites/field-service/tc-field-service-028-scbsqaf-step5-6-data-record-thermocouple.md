# TC-FIELD-SERVICE-028 — SCBSQAF Data & Thermocouple — SCBSQAF step 5 and 6 data record and thermocouple layout

> Suite: [Field Service](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-FIELD-SERVICE-028 |
| **Suite** | field-service |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `field_service_scbsqaf_data_tc` |
| **Feature File** | `features/regression/field_service.feature` |
| **Page Objects** | `src/pages/field-service-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that Step 5 (Data Record) captures dimensional measurements (cord count, step lengths, bias angle, splice length), and Step 6 (Thermocouple Positions) renders platen thermocouple sensor mapping diagrams.

---

## ✅ Preconditions

- Advanced to Step 5 & 6 of SCBSQAF form

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On Step 5 (Data Record), enter cord count, step lengths, and splice length | Values saved |
| 2 | Advance to Step 6 (Thermocouple Positions) | Platen diagram displays thermocouple sensor layout (top/bottom platens) |
| 3 | Configure active thermocouple channels | Thermocouple positions mapped |

---

## 🏁 Expected Results

- Physical dimensions and temperature sensor positions are mapped accurately

---

## 🔍 Flutter Source Reference

```dart
// data_record.dart & thermocuple_positions.dart
DataRecordStep(...) & ThermocuplePositions(...)
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:field_service_scbsqaf_data_tc @regression @both
Scenario: Record splice dimensions and map thermocouple positions
  Given the user is on SCBSQAF form
  When the user inputs splice dimensional data in Step 5 and thermocouple sensor map in Step 6
  Then dimension metrics and thermocouple layout should be saved
```

---

## 🔗 Related

- [TC-FIELD-SERVICE-027 — Splicing materials](./tc-field-service-027-scbsqaf-step4-splicing-materials-batches.md)
- [Suite index](./index.md)
