# TC-MONITORING-DEVICES-020 — Date Picker — installation date selection

> Suite: [Monitoring Devices](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-MONITORING-DEVICES-020 |
| **Suite** | monitoring-devices |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `monitoring_device_date_picker` |
| **Feature File** | `features/regression/monitoring_devices.feature` |
| **Page Objects** | `src/pages/monitoring-device-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that tapping the Installation Date input opens `ContiplusDatePicker`, allows picking a calendar date, and saves the timestamp into `installedDate`.

---

## ✅ Preconditions

- User is on Step 1 of `MonitoringDeviceDetailsScreen`

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Tap Installation Date field | `ContiplusDatePicker` calendar dialog opens |
| 2 | Select a date (e.g. `15 Jun 2026`) and tap OK | Dialog closes; field displays formatted date `15 Jun 2026` |
| 3 | Complete device creation | Saved device reflects selected `installedDate` |

---

## 🏁 Expected Results

- Date picker sets installation date timestamp accurately

---

## 🔍 Flutter Source Reference

```dart
// device_step.dart
ContiplusDatePicker(...)
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:monitoring_device_date_picker @regression @both
Scenario: Select device installation date via date picker
  Given the user is on Step 1 of monitoring device details
  When the user opens the date picker and selects an installation date
  Then the selected date should be formatted and displayed in the field
```

---

## 🔗 Related

- [TC-MONITORING-DEVICES-002 — Add device](./tc-monitoring-devices-002-add-monitoring-device-flow.md)
- [Suite index](./index.md)
