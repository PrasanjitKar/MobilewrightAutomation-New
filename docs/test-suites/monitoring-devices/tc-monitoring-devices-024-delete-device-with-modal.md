# TC-MONITORING-DEVICES-024 — Delete Device — delete device with warning modal

> Suite: [Monitoring Devices](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-MONITORING-DEVICES-024 |
| **Suite** | monitoring-devices |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `monitoring_device_delete` |
| **Feature File** | `features/regression/monitoring_devices.feature` |
| **Page Objects** | `src/pages/monitoring-device-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that selecting Delete from the AppBar popup menu opens a confirmation modal (`showDeleteConfirmationModal`), and confirming deletes the device from local and cloud storage.

---

## ✅ Preconditions

- User has delete permission on `IOTModule.beltMonitoring`

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On device details, tap 3-dots popup menu in AppBar | Menu opens showing "Delete" item with trash icon |
| 2 | Tap "Delete" | Delete confirmation modal appears |
| 3 | Tap "Cancel" | Modal closes without deleting |
| 4 | Tap "Delete" again and confirm | `deleteMonitoringDevice` dispatches; device is removed and screen pops to list |

---

## 🏁 Expected Results

- Device is deleted safely after confirmation

---

## 🔍 Flutter Source Reference

```dart
// monitoring_device_details_screen.dart
context.read<MonitoringDeviceDetailsCubit>().deleteMonitoringDevice(state.monitoringDeviceModel.monitoringDeviceId!);
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:monitoring_device_delete @regression @both
Scenario: Delete monitoring device with confirmation modal
  Given the user is on the device details screen with delete permission
  When the user selects delete from the menu and confirms
  Then the device should be deleted and the user returned to the list
```

---

## 🔗 Related

- [TC-MONITORING-DEVICES-001 — List loads](./tc-monitoring-devices-001-list-loads-with-permitted-view.md)
- [Suite index](./index.md)
