# TC-FIELD-SERVICE-020 — CBLM Take-Up Positioning — CBLM step 3 take-up positioning and drawing

> Suite: [Field Service](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-FIELD-SERVICE-020 |
| **Suite** | field-service |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `field_service_cblm_takeup_pos` |
| **Feature File** | `features/regression/field_service.feature` |
| **Page Objects** | `src/pages/field-service-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that selecting a Take-up Type and Belt Status in Step 3 displays the corresponding technical reference drawing and note.

---

## ✅ Preconditions

- Advanced to Step 3 (Take-up Positioning) of CBLM form

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Select "Take-Up Type" (e.g., Gravity) | Type selected |
| 2 | Select "Status of Belt During Survey" (e.g., Stopped / Running) | Status selected |
| 3 | Observe Drawing section | Technical diagram for selected take-up type loads via `CachedNetworkImage` with disclaimer note |

---

## 🏁 Expected Results

- Take-up positioning dropdowns dynamically render visual reference drawings

---

## 🔍 Flutter Source Reference

```dart
// positioning_step.dart
_buildTakeUpPositioningDropdown(...) & _buildImage()
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:field_service_cblm_takeup_pos @regression @both
Scenario: Display technical drawing on take-up type selection
  Given the user is on Step 3 Take-Up Positioning
  When the user selects a take-up type
  Then the technical reference drawing should be displayed
```

---

## 🔗 Related

- [TC-FIELD-SERVICE-021 — Take-up length dimensions](./tc-field-service-021-cblm-step3-takeup-length-dimensions.md)
- [Suite index](./index.md)
