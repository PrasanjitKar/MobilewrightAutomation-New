# TC-CONVEYOR-INSPECT-014 — Thermal Camera — discovery timeout and connection failure handling

> Suite: [Conveyor Inspect](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYOR-INSPECT-014 |
| **Suite** | conveyor-inspect |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `thermal_camera_timeout_error` |
| **Feature File** | `features/regression/conveyor_inspect.feature` |
| **Page Objects** | `src/pages/thermal-camera-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that if no FLIR camera is detected within the 15-second discovery window, `ConveyorInspectThermalCameraListScreen` stops discovery, displays the "No Device Found" state (`noDeviceFoundWidget`), and provides a retry button.

---

## ✅ Preconditions

- No FLIR camera is active in range

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open `ConveyorInspectThermalCameraListScreen` | Discovery scanning starts |
| 2 | Wait for 15-second discovery timer | Timer expires; `StopDiscoveryEvent` dispatches |
| 3 | Observe screen content | `noDeviceFoundWidget()` displays "No thermal camera found" message |
| 4 | Tap "Scan Again" button | Discovery restarts with fresh 15-second window |

---

## 🏁 Expected Results

- Timeout and connection errors are caught and provide a clear retry option

---

## 🔍 Flutter Source Reference

```dart
// conveyor_inspect_thermal_camera_list_screen.dart
timerDiscovery = Timer(const Duration(seconds: 15), () => _getStopDiscoveryAndGetDevices());
// On timeout:
state.status.isTimeOut ? noDeviceFoundWidget() : ...
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:thermal_camera_timeout_error @regression @both
Scenario: Thermal camera discovery timeout
  Given no thermal camera is in range
  When the user scans for thermal cameras
  Then after 15 seconds a "No Device Found" message should be displayed
  And a retry scan button should be available
```

---

## 🔗 Related

- [TC-CONVEYOR-INSPECT-013 — Thermal camera discovery](./tc-conveyor-inspect-013-thermal-camera-discovery-flow.md)
- [Suite index](./index.md)
