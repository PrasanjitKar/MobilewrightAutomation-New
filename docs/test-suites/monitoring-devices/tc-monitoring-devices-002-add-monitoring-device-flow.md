# TC-MONITORING-DEVICES-002 — Add Device — create new monitoring device flow

> Suite: [Monitoring Devices](./index.md) | Priority: Critical | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-MONITORING-DEVICES-002 |
| **Suite** | monitoring-devices |
| **Priority** | Critical |
| **Type** | Smoke |
| **Suggested Tags** | `@smoke @both` |
| **Data Key** | `add_monitoring_device_happy_path` |
| **Feature File** | `features/smoke/monitoring_devices.feature` |
| **Page Objects** | `src/pages/monitoring-device-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that tapping the Floating Action Button (+) opens `MonitoringDeviceDetailsScreen` in add mode, guides the user through the 2-step stepper (`DeviceStep` and `LocationStep`), and creates the device record upon saving.

---

## ✅ Preconditions

- User has add permission (`Permission.add`) for `IOTModule.beltMonitoring`

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On Monitoring Devices list, tap FAB (+) | `MonitoringDeviceDetailsScreen` opens with title "Add Monitoring Device" |
| 2 | Step 1 (Device): Fill Name, select Device Type, Status, Brand, Serial Number, and tap Continue | Step 1 validates and transitions to Step 2 |
| 3 | Step 2 (Location): Select Site, Conveyor, TimeZone, set GPS coordinates, and tap Create | `MonitoringDeviceDetailsCubit.saveMonitoringDevice()` executes |
| 4 | Verify list screen | Device is saved and appears on list screen |

---

## 🏁 Expected Results

- 2-step stepper form creates new monitoring device record successfully

---

## 🔍 Flutter Source Reference

```dart
// monitoring_device_details_screen.dart
context.read<MonitoringDeviceDetailsCubit>().saveMonitoringDevice(isEdit: false);
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/smokedata.csv @Key:add_monitoring_device_happy_path @smoke @both
Scenario: Create new monitoring device via stepper form
  Given the user is on the Monitoring Devices list
  When the user taps the add button
  And fills in device details and location details
  And taps create
  Then the new monitoring device should appear in the list
```

---

## 🔗 Related

- [TC-MONITORING-DEVICES-015 — Step 1 validation](./tc-monitoring-devices-015-stepper-device-info-validation.md)
- [Suite index](./index.md)
