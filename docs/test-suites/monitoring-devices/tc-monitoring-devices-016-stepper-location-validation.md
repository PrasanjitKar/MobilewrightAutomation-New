# TC-MONITORING-DEVICES-016 — Step 2 Validation — location mandatory fields

> Suite: [Monitoring Devices](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-MONITORING-DEVICES-016 |
| **Suite** | monitoring-devices |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `monitoring_device_step2_validation` |
| **Feature File** | `features/regression/monitoring_devices.feature` |
| **Page Objects** | `src/pages/monitoring-device-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that Step 2 (`LocationStep`) requires Site, Conveyor, and TimeZone when status is not Manufacturing (status != 4); tapping Create without these fields blocks submission and alerts the user.

---

## ✅ Preconditions

- Step 1 is complete; user is on Step 2 with active status (e.g. Running)

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On Step 2, leave Site and Conveyor unselected | Fields are empty |
| 2 | Tap Create button | Submission is blocked |
| 3 | Observe SnackBar | Displays "Please complete monitoring device information" (`completeMonitoringDeviceInfo`) |
| 4 | Select Site, Conveyor, and TimeZone | Fields are valid |
| 5 | Tap Create button | Form submits and device is saved |

---

## 🏁 Expected Results

- Location parameters are validated before device creation

---

## 🔍 Flutter Source Reference

```dart
// monitoring_device_details_screen.dart
bool isInformationComplete(MonitoringDeviceModel deviceModel) {
  return deviceInfoComplete(deviceModel) &&
      ((deviceModel.status == 4) ||
          ((deviceModel.companyId != null && deviceModel.companyId!.isNotEmpty) &&
              (deviceModel.conveyorId != null && deviceModel.conveyorId!.isNotEmpty) &&
              deviceModel.deviceTimeZone != null));
}
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:monitoring_device_step2_validation @regression @both
Scenario: Validate Step 2 location fields for active devices
  Given the user is on Step 2 of Add Monitoring Device with active status
  When the user taps Create without selecting Site and Conveyor
  Then form submission should be blocked with a warning SnackBar
```

---

## 🔗 Related

- [TC-MONITORING-DEVICES-017 — Manufacturing bypass](./tc-monitoring-devices-017-manufacturing-status-bypass.md)
- [Suite index](./index.md)
