# TC-FIELD-SERVICE-017 — CBLM Equipment & Calibration — CBLM step 1 equipment used and auto-calibration

> Suite: [Field Service](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-FIELD-SERVICE-017 |
| **Suite** | field-service |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `field_service_cblm_equipment` |
| **Feature File** | `features/regression/field_service.feature` |
| **Page Objects** | `src/pages/field-service-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that selecting an Equipment from the `Equipment Used` dropdown automatically populates the read-only Calibration field with its associated calibration string.

---

## ✅ Preconditions

- Master data catalog `fsmCblmEquipment` populated with equipment records

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On Step 1, tap "Equipment Used" dropdown | Dropdown lists available devices (e.g. Tachometer / Laser) |
| 2 | Select a device | Device is selected |
| 3 | Observe "Calibration" input field | Calibration field auto-fills with equipment's calibration metadata (read-only) |

---

## 🏁 Expected Results

- Calibration string is automatically retrieved and displayed

---

## 🔍 Flutter Source Reference

```dart
// general_steps.dart
calibrationController.text = fieldServiceModel.formResponseData?.equipmentUsed?.calibration ?? '';
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:field_service_cblm_equipment @regression @both
Scenario: Auto-populate calibration from selected equipment
  Given the user is on Step 1 of CBLM form
  When the user selects an option in Equipment Used
  Then the Calibration field should be automatically filled and disabled
```

---

## 🔗 Related

- [TC-FIELD-SERVICE-015 — Step 1 site conveyor](./tc-field-service-015-cblm-step1-site-conveyor-mandatory.md)
- [Suite index](./index.md)
