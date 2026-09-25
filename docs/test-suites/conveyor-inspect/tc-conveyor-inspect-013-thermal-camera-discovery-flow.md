# TC-CONVEYOR-INSPECT-013 — Thermal Camera — discover and list nearby FLIR thermal cameras

> Suite: [Conveyor Inspect](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYOR-INSPECT-013 |
| **Suite** | conveyor-inspect |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `thermal_camera_discovery` |
| **Feature File** | `features/regression/conveyor_inspect.feature` |
| **Page Objects** | `src/pages/thermal-camera-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that `ConveyorInspectThermalCameraListScreen` initiates Bluetooth / Wi-Fi discovery of nearby FLIR thermal cameras (`StartDiscoveryEvent`), lists discovered devices with IP/signal strength, and connects when a device is selected.

---

## ✅ Preconditions

- Bluetooth and Local Network / Wi-Fi permissions are enabled
- FLIR thermal camera is powered on and in pairing mode

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | From `AddEditConveyorInspectEvent`, choose "Connect to Thermal Camera" and tap "Connect" | `ConveyorInspectThermalCameraListScreen` opens |
| 2 | Observe discovery progress | Loading animation displays while scanning (`StartDiscoveryEvent`) |
| 3 | Discovered cameras appear in list | Lists camera model (e.g. "FLIR ONE Pro", "FLIR E54") with connection details |
| 4 | Tap on a discovered FLIR camera row | Connection initiated; `DeviceConnectedEvent` dispatches |
| 5 | Wait for connection confirmation | Screen transitions automatically to `ConveyorInspectThermalCameraScreen` live view |

---

## 🏁 Expected Results

- Thermal camera hardware is discovered, paired, and initiates live thermal streaming

---

## 🔍 Flutter Source Reference

```dart
// conveyor_inspect_thermal_camera_list_screen.dart
CameraPlugin.instance.discoveryStream.listen((event) => _onDiscoveryCallBack(event));
// On connection success:
if (state.status.isConnected) {
  navigateToThermalCameraScreen(context);
}
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:thermal_camera_discovery @regression @both
Scenario: Discover and pair FLIR thermal camera
  Given Bluetooth and local network permissions are granted
  When the user opens the Thermal Camera discovery screen
  Then nearby FLIR thermal cameras should be listed
  When the user taps on the discovered FLIR camera
  Then the live thermal streaming screen should open
```

---

## 🔗 Related

- [TC-CONVEYOR-INSPECT-015 — Thermal live stream](./tc-conveyor-inspect-015-thermal-live-stream-and-color-palettes.md)
- [Suite index](./index.md)
