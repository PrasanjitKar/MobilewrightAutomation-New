# TC-FIELD-SERVICE-027 — SCBSQAF Materials — SCBSQAF step 4 splicing materials and batch expiries

> Suite: [Field Service](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-FIELD-SERVICE-027 |
| **Suite** | field-service |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `field_service_scbsqaf_materials` |
| **Feature File** | `features/regression/field_service.feature` |
| **Page Objects** | `src/pages/field-service-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that Step 4 (Splicing Materials) captures splicing kit details, cement/solution batch numbers, expiry dates, cover rubber, tie gum, noodle rubber, and storage conditions.

---

## ✅ Preconditions

- Advanced to Step 4 of SCBSQAF form

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On Step 4, enter Splicing Kit ID, Cement Batch Number, and Expiry Date | Inputs accepted |
| 2 | Enter Cover Rubber and Tie Gum batch and expiry details | Inputs accepted |
| 3 | Toggle storage condition verification | Storage compliance recorded |

---

## 🏁 Expected Results

- Splicing materials QA data is documented completely

---

## 🔍 Flutter Source Reference

```dart
// splicing_materials.dart & edit_splicing_materials.dart
SplicingMaterials(isSteelCord: isSteelCord, isEnabled: isNew || isEdit)
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:field_service_scbsqaf_materials @regression @both
Scenario: Record splicing materials and batch expiries in SCBSQAF Step 4
  Given the user is on Step 4 Splicing Materials
  When the user enters kit details, batch numbers, and expiry dates
  Then all material tracking fields should be saved
```

---

## 🔗 Related

- [TC-FIELD-SERVICE-026 — Pre-splicing checklist](./tc-field-service-026-scbsqaf-step3-pre-splicing-checklist.md)
- [Suite index](./index.md)
