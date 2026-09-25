# TC-CONVEYOR-INSPECT-016 — Thermal Camera — manual min and max temperature range picker

> Suite: [Conveyor Inspect](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYOR-INSPECT-016 |
| **Suite** | conveyor-inspect |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `thermal_temperature_range_picker` |
| **Feature File** | `features/regression/conveyor_inspect.feature` |
| **Page Objects** | `src/pages/thermal-camera-stream.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that `ConveyorInspectThermalCameraScreen` allows switching from Auto temperature span to Manual temperature span, setting minimum and maximum threshold temperatures (between 0.0 °C and 120.9 °C) via double-ended temperature slider.

---

## ✅ Preconditions

- Live thermal camera streaming is active

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On `ConveyorInspectThermalCameraScreen`, tap the Temperature Span button | Temperature range configuration panel opens |
| 2 | Switch mode from "Auto" to "Manual" | Min and Max slider controls become active |
| 3 | Adjust Min temperature slider to `25.0 °C` | Color gradient floor clamps to 25.0 °C |
| 4 | Adjust Max temperature slider to `90.0 °C` | Color gradient ceiling clamps to 90.0 °C |
| 5 | Tap "Apply" | `SetTemperatureRangeEvent` sends range values to thermal sensor engine |

---

## 🏁 Expected Results

- Thermal camera scale adjusts dynamically to highlight thermal anomalies within the target temperature band

---

## 🔍 Flutter Source Reference

```dart
// conveyor_inspect_thermal_camera_screen.dart
bloc.add(SetTemperatureRangeEvent(minTemp: min, maxTemp: max));
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:thermal_temperature_range_picker @regression @both
Scenario: Set manual temperature range on thermal camera
  Given the thermal camera is in live stream mode
  When the user sets manual temperature range from 25.0 °C to 90.0 °C
  Then the radiometric display scale should clamp to the specified range
```

---

## 🔗 Related

- [TC-CONVEYOR-INSPECT-015 — Thermal live stream](./tc-conveyor-inspect-015-thermal-live-stream-and-color-palettes.md)
- [Suite index](./index.md)
