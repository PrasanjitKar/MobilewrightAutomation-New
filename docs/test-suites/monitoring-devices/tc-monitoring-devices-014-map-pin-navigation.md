# TC-MONITORING-DEVICES-014 — Map Pin — GPS location map viewer navigation

> Suite: [Monitoring Devices](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-MONITORING-DEVICES-014 |
| **Suite** | monitoring-devices |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `monitoring_device_map_navigation` |
| **Feature File** | `features/regression/monitoring_devices.feature` |
| **Page Objects** | `src/pages/monitoring-devices-list.page.ts`, `src/pages/monitoring-device-map.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that tapping the map button (`mapButton_$index`) on a device card opens `MonitoringDeviceMapScreen` centering on the device's GPS pin (`device.monitoringLocation`), and is disabled when GPS is unset.

---

## ✅ Preconditions

- Device has configured GPS coordinates (`latitude != 0`, `longitude != 0`)

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Locate device card with active GPS coordinates | Map button is enabled |
| 2 | Tap map button | `MonitoringDeviceMapScreen` opens |
| 3 | Observe map view | Map is centered on device location pin |
| 4 | Tap back button | Returns to device list |

---

## 🏁 Expected Results

- Device location displays accurately on map view

---

## 🔍 Flutter Source Reference

```dart
// monitoring_device_list_card.dart
Navigator.push(context, MaterialPageRoute(builder: (_) => MonitoringDeviceMapScreen(monitoringDevice: device)));
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:monitoring_device_map_navigation @regression @both
Scenario: Navigate to map view from device card
  Given a device has valid GPS coordinates
  When the user taps the map button on the device card
  Then the device map screen should open centered on the device pin
```

---

## 🔗 Related

- [TC-MONITORING-DEVICES-022 — Coordinate picker](./tc-monitoring-devices-022-interactive-map-coordinate-picker.md)
- [Suite index](./index.md)
