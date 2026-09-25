# TC-FIELD-SERVICE-018 — CBLM Ambient Temp & Diagram — CBLM step 1 ambient temperature and belt diagram

> Suite: [Field Service](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-FIELD-SERVICE-018 |
| **Suite** | field-service |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `field_service_cblm_ambient_diagram` |
| **Feature File** | `features/regression/field_service.feature` |
| **Page Objects** | `src/pages/field-service-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that Ambient Temperature accepts decimal numeric inputs with trailing `°C`, and the Conveyor Belt Diagram widget renders dynamic belt specs.

---

## ✅ Preconditions

- On Step 1 of CBLM form

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Enter `28.5` in Ambient Temperature | Decimal input accepted with trailing `°C` |
| 2 | Scroll to Conveyor Belt Details section | `ConveyorBeltDiagram` renders schematic view of conveyor setup |

---

## 🏁 Expected Results

- Ambient temperature validates correctly and schematic renders properly

---

## 🔍 Flutter Source Reference

```dart
// general_steps.dart
_buildAmbientTemperature(...) & ConveyorBeltDiagram(isEdit: widget.enabled)
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:field_service_cblm_ambient_diagram @regression @both
Scenario: Validate ambient temperature and belt diagram rendering
  Given the user is on Step 1 of CBLM form
  When the user inputs ambient temperature "28.5"
  Then the value should be retained and conveyor belt diagram rendered
```

---

## 🔗 Related

- [TC-FIELD-SERVICE-015 — Step 1 site conveyor](./tc-field-service-015-cblm-step1-site-conveyor-mandatory.md)
- [Suite index](./index.md)
