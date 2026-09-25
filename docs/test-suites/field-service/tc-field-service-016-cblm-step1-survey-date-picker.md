# TC-FIELD-SERVICE-016 — CBLM Survey Date — CBLM step 1 survey date picker and past date check

> Suite: [Field Service](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-FIELD-SERVICE-016 |
| **Suite** | field-service |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `field_service_cblm_survey_date` |
| **Feature File** | `features/regression/field_service.feature` |
| **Page Objects** | `src/pages/field-service-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that on Step 1, the Survey Date picker formats dates as `d MMM yyyy` and disables future dates (`futureDateDisable: true`).

---

## ✅ Preconditions

- On Step 1 (General Details) of CBLM form

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Tap the Survey Date input field | Calendar date picker dialog appears |
| 2 | Observe future dates | Future calendar dates are grayed out and unselectable |
| 3 | Pick today's date or a past date | Date is populated in format (e.g. `15 Sep 2026`) |

---

## 🏁 Expected Results

- Survey Date accepts valid past/present dates and disables future selections

---

## 🔍 Flutter Source Reference

```dart
// general_steps.dart
ContiplusDatePicker(format: 'd MMM yyyy', futureDateDisable: true, ...)
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:field_service_cblm_survey_date @regression @both
Scenario: Validate CBLM survey date picker restrictions
  Given the user is on Step 1 of CBLM form
  When the user opens the survey date picker
  Then future dates should be disabled and selected date formatted as "d MMM yyyy"
```

---

## 🔗 Related

- [TC-FIELD-SERVICE-015 — Step 1 site conveyor](./tc-field-service-015-cblm-step1-site-conveyor-mandatory.md)
- [Suite index](./index.md)
