# TC-FIELD-SERVICE-015 — CBLM Site Conveyor — CBLM step 1 site and conveyor mandatory cascading

> Suite: [Field Service](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-FIELD-SERVICE-015 |
| **Suite** | field-service |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `field_service_cblm_site_conveyor` |
| **Feature File** | `features/regression/field_service.feature` |
| **Page Objects** | `src/pages/field-service-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that on Step 1 (General Details), selecting a Site filters the Conveyor dropdown to that site's conveyors, and selecting a Conveyor directly auto-populates its parent Site.

---

## ✅ Preconditions

- Multiple sites and conveyors available

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On Step 1, tap Site dropdown and select "Mine Site Alpha" | Site selected; conveyor list filters to Alpha's conveyors |
| 2 | Select conveyor "CV-101" | Conveyor selected |
| 3 | Clear Site and select conveyor "CV-202" directly | Site dropdown auto-fills with "Mine Site Beta" |

---

## 🏁 Expected Results

- Cascading relationship between Site and Conveyor functions bidirectionally

---

## 🔍 Flutter Source Reference

```dart
// general_steps.dart
_buildSiteDropdown(...) & _buildConveyorDropdown(...)
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:field_service_cblm_site_conveyor @regression @both
Scenario: Validate cascading site and conveyor selection in CBLM Step 1
  Given the user is on CBLM Step 1 General Details
  When the user selects a site
  Then the conveyor dropdown should be filtered to the selected site
```

---

## 🔗 Related

- [TC-FIELD-SERVICE-014 — CBLM stepper](./tc-field-service-014-cblm-form-initiation-and-stepper.md)
- [Suite index](./index.md)
