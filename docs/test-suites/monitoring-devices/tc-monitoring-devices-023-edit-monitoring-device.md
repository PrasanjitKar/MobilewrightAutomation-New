# TC-MONITORING-DEVICES-023 — Edit Device — modify existing monitoring device

> Suite: [Monitoring Devices](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-MONITORING-DEVICES-023 |
| **Suite** | monitoring-devices |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `monitoring_device_edit` |
| **Feature File** | `features/regression/monitoring_devices.feature` |
| **Page Objects** | `src/pages/monitoring-device-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that opening a device in view mode, tapping Edit, modifying fields (e.g. status, firmware version, comments), and tapping Save dispatches update call and persists changes.

---

## ✅ Preconditions

- User has edit permission on `IOTModule.beltMonitoring`
- Existing device record is open

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open existing device details in view mode | Screen opens with title "View Device" |
| 2 | Tap "Edit" button at bottom | Screen switches to edit mode (`isView = false`); title updates to "Edit Monitoring Device" |
| 3 | Modify Firmware Version and Comments | Fields update |
| 4 | Tap "Save" button | `saveMonitoringDevice(isEdit: true)` executes |
| 5 | Verify list screen | Device card reflects updated values |

---

## 🏁 Expected Results

- Device details are modified and saved cleanly

---

## 🔍 Flutter Source Reference

```dart
// monitoring_device_details_screen.dart
context.read<MonitoringDeviceDetailsCubit>().saveMonitoringDevice(isEdit: true);
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:monitoring_device_edit @regression @both
Scenario: Edit existing monitoring device details
  Given the user opens an existing monitoring device in view mode
  When the user taps edit, modifies firmware version, and saves
  Then the updated details should be saved and displayed
```

---

## 🔗 Related

- [TC-MONITORING-DEVICES-002 — Add device](./tc-monitoring-devices-002-add-monitoring-device-flow.md)
- [Suite index](./index.md)
