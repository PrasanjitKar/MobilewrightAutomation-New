# TC-MONITORING-DEVICES-022 — Map Picker — interactive map coordinate selection

> Suite: [Monitoring Devices](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-MONITORING-DEVICES-022 |
| **Suite** | monitoring-devices |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `monitoring_device_map_picker` |
| **Feature File** | `features/regression/monitoring_devices.feature` |
| **Page Objects** | `src/pages/monitoring-device-details.page.ts`, `src/pages/monitoring-device-map.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that tapping the map preview on Step 2 (`LocationStep`) opens the interactive map screen, allows dragging or tapping to place the device pin, and returns the selected Latitude and Longitude to the form inputs.

---

## ✅ Preconditions

- User is on Step 2 of `MonitoringDeviceDetailsScreen`

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On Step 2, tap the map container | Fullscreen map picker opens |
| 2 | Tap on the map to place a pin | Marker pin drops at tapped coordinate |
| 3 | Tap "Confirm Location" | Map closes; Latitude and Longitude fields update with picked coordinates |
| 4 | Tap Create | Device is saved with the chosen GPS position |

---

## 🏁 Expected Results

- Interactive map allows precise geospatial placement of monitoring hardware

---

## 🔍 Flutter Source Reference

```dart
// location_step.dart
ContiMap(markers: _deviceMarkers, ...)
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:monitoring_device_map_picker @regression @both
Scenario: Select device location via interactive map
  Given the user is on Step 2 of device details
  When the user opens the map picker and selects a coordinate
  Then the Latitude and Longitude fields should be populated with the selected values
```

---

## 🔗 Related

- [TC-MONITORING-DEVICES-014 — Map pin navigation](./tc-monitoring-devices-014-map-pin-navigation.md)
- [Suite index](./index.md)
