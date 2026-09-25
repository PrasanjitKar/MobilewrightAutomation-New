# TC-CONVEYOR-INSPECT-017 — Thermal Camera — capture radiometric snapshot with GPS and orientation

> Suite: [Conveyor Inspect](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYOR-INSPECT-017 |
| **Suite** | conveyor-inspect |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `thermal_camera_snapshot_capture` |
| **Feature File** | `features/regression/conveyor_inspect.feature` |
| **Page Objects** | `src/pages/thermal-camera-stream.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that tapping the capture shutter button on `ConveyorInspectThermalCameraScreen` triggers `CaptureThermalImageEvent`, captures a high-resolution radiometric JPEG image tagged with GPS coordinates and orientation metadata, and saves it to local inspection storage.

---

## ✅ Preconditions

- Thermal camera is live streaming
- Location services are enabled

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On `ConveyorInspectThermalCameraScreen`, aim camera at a conveyor idler | Subject is in focus in live stream |
| 2 | Tap the circular Shutter capture button | Shutter animation triggers; `CaptureThermalImageEvent` executes |
| 3 | Observe bottom-left thumbnail gallery badge | Snapshot counter increments by 1; thumbnail animates |
| 4 | Tap the thumbnail badge | Opens `ConveyorInspectThermalCameraImageListScreen` showing the captured thermal photo |
| 5 | Verify photo details | Image displays radiometric data and geotag metadata |

---

## 🏁 Expected Results

- Snapshot is captured with full radiometric sensor data and stored for inspection attachment

---

## 🔍 Flutter Source Reference

```dart
// conveyor_inspect_thermal_camera_screen.dart
bloc.add(CaptureThermalImageEvent(orientation: _orientation, location: _currentPosition));
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:thermal_camera_snapshot_capture @regression @both
Scenario: Capture radiometric thermal snapshot
  Given the thermal camera is live streaming
  When the user taps the shutter capture button
  Then a radiometric thermal snapshot should be saved with GPS coordinates
  And the snapshot gallery counter should increment
```

---

## 🔗 Related

- [TC-CONVEYOR-INSPECT-018 — Thermal photo gallery](./tc-conveyor-inspect-018-thermal-photo-gallery-multi-select.md)
- [Suite index](./index.md)
