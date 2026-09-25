# TC-FIELD-SERVICE-030 — SCBSQAF Finished Splice — SCBSQAF step 9 finished splice and defect checklist

> Suite: [Field Service](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-FIELD-SERVICE-030 |
| **Suite** | field-service |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `field_service_scbsqaf_finished_splice` |
| **Feature File** | `features/regression/field_service.feature` |
| **Page Objects** | `src/pages/field-service-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that Step 9 (Finished Splice) captures visual post-cure inspection, splice thickness (center, edges), width comparison, and defect severity levels (None, Low, Medium, High).

---

## ✅ Preconditions

- Advanced to Step 9 of SCBSQAF form

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On Step 9, enter finished thickness measurements (Center, Left edge, Right edge) | Dimensions accepted |
| 2 | Complete defect checklist (porosity, blisters, edge straightness, surface finish) selecting severity (None, Low, Medium, High) | Defects scored |

---

## 🏁 Expected Results

- Finished splice visual quality inspection data is captured accurately

---

## 🔍 Flutter Source Reference

```dart
// finished_splice.dart
options = ['None', 'Low', 'Medium', 'High']
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:field_service_scbsqaf_finished_splice @regression @both
Scenario: Record finished splice QA inspection and defect scoring
  Given the user is on Step 9 Finished Splice
  When the user enters splice thickness dimensions and rates defect severity
  Then post-cure inspection details should be saved
```

---

## 🔗 Related

- [TC-FIELD-SERVICE-031 — Hardness testing](./tc-field-service-031-scbsqaf-step10-hardness-testing-shore-a.md)
- [Suite index](./index.md)
