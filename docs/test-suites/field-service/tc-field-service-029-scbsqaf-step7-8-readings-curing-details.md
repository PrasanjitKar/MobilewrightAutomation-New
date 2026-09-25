# TC-FIELD-SERVICE-029 — SCBSQAF Readings & Curing — SCBSQAF step 7 and 8 temperature readings and curing

> Suite: [Field Service](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-FIELD-SERVICE-029 |
| **Suite** | field-service |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `field_service_scbsqaf_readings_curing` |
| **Feature File** | `features/regression/field_service.feature` |
| **Page Objects** | `src/pages/field-service-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that Step 7 (Readings) logs time and temperature across thermocouples through heating, dwell, and cooling phases, while Step 8 (Curing Details) records vulcanizer model, power source, pressure, and cure timestamps.

---

## ✅ Preconditions

- Advanced to Step 7 & 8 of SCBSQAF form

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On Step 7, log interval temperature readings for each thermocouple | Platen readings form updates |
| 2 | Advance to Step 8 (Curing Details) | Form displays vulcanizer parameters |
| 3 | Select Vulcanizer Model (Almex Shaw / Other), Power Source (Generator / Main's Power), Pressure, and Cure Start/Finish times | Curing profile stored in model |

---

## 🏁 Expected Results

- Thermal curing profile is logged comprehensively across vulcanization phases

---

## 🔍 Flutter Source Reference

```dart
// readings.dart, curing_details.dart, platen_thermocouple_readings_form.dart
vulcaniserModelUsedList, vulcaniserPowerSourceUsedList
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:field_service_scbsqaf_readings_curing @regression @both
Scenario: Record curing thermal readings and vulcanizer parameters
  Given the user is on SCBSQAF form
  When the user logs thermocouple readings in Step 7 and vulcanizer details in Step 8
  Then the complete vulcanization profile should be recorded
```

---

## 🔗 Related

- [TC-FIELD-SERVICE-028 — Data & Thermocouple](./tc-field-service-028-scbsqaf-step5-6-data-record-thermocouple.md)
- [Suite index](./index.md)
