# TC-FIELD-SERVICE-026 — SCBSQAF Pre-Splicing — SCBSQAF step 3 pre-splicing environmental checklist

> Suite: [Field Service](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-FIELD-SERVICE-026 |
| **Suite** | field-service |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `field_service_scbsqaf_pre_splicing` |
| **Feature File** | `features/regression/field_service.feature` |
| **Page Objects** | `src/pages/field-service-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that Step 3 (Pre-Splicing) presents environmental and safety questions, checklist toggles, and observation notes.

---

## ✅ Preconditions

- Advanced to Step 3 of SCBSQAF form

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On Step 3, review question checklist (weather, tools condition, safety guards, workspace cleanliness) | Questions render with Yes/No/NA toggles |
| 2 | Toggle answers and add observation notes | State is saved in form model |

---

## 🏁 Expected Results

- Pre-splicing QA checklist records environmental and safety compliance

---

## 🔍 Flutter Source Reference

```dart
// pre_splicing.dart & pre_splicing_question_widget.dart
PreSplicing(enabled: isNew || isEdit)
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:field_service_scbsqaf_pre_splicing @regression @both
Scenario: Fill pre-splicing QA checklist in SCBSQAF Step 3
  Given the user is on Step 3 Pre-Splicing
  When the user answers the pre-splicing safety and environmental questions
  Then the responses and observations should be recorded
```

---

## 🔗 Related

- [TC-FIELD-SERVICE-025 — SCBSQAF Step 1 & 2](./tc-field-service-025-scbsqaf-step1-2-general-and-splice-details.md)
- [Suite index](./index.md)
