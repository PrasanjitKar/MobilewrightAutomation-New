# TC-MONITORING-DEVICES-015 — Step 1 Validation — device info mandatory fields

> Suite: [Monitoring Devices](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-MONITORING-DEVICES-015 |
| **Suite** | monitoring-devices |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `monitoring_device_step1_validation` |
| **Feature File** | `features/regression/monitoring_devices.feature` |
| **Page Objects** | `src/pages/monitoring-device-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that Step 1 (`DeviceStep`) requires Device Name, Device Type, and Status; tapping Continue without filling these blocks step progression and displays a SnackBar warning.

---

## ✅ Preconditions

- User is on `Add Monitoring Device` Step 1 with empty fields

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On Step 1, leave fields empty and tap Continue / Step 2 icon | Step progression is blocked |
| 2 | Observe SnackBar | SnackBar displays "Please complete device information" (`completeDeviceInfo`) |
| 3 | Fill Device Name, select Device Type and Status | Fields are populated |
| 4 | Tap Continue | Step 1 completes and stepper transitions to Step 2 (Location) |

---

## 🏁 Expected Results

- Incomplete device metadata is caught and reported before allowing location entry

---

## 🔍 Flutter Source Reference

```dart
// monitoring_device_details_screen.dart
if (!deviceInfoComplete(state.monitoringDeviceModel)) {
  showContiSnackBar(context, AppLocalizations.of(context)!.completeDeviceInfo);
}
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:monitoring_device_step1_validation @regression @both
Scenario: Validate Step 1 mandatory device info fields
  Given the user is on Step 1 of Add Monitoring Device
  When the user taps Continue without filling mandatory fields
  Then a warning SnackBar should block progression to Step 2
```

---

## 🔗 Related

- [TC-MONITORING-DEVICES-016 — Step 2 validation](./tc-monitoring-devices-016-stepper-location-validation.md)
- [Suite index](./index.md)
