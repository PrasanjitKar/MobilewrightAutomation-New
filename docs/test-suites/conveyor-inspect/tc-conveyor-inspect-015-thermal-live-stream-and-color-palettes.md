# TC-CONVEYOR-INSPECT-015 — Thermal Camera — live texture stream and color palette switching

> Suite: [Conveyor Inspect](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYOR-INSPECT-015 |
| **Suite** | conveyor-inspect |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `thermal_camera_live_stream` |
| **Feature File** | `features/regression/conveyor_inspect.feature` |
| **Page Objects** | `src/pages/thermal-camera-stream.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that `ConveyorInspectThermalCameraScreen` renders the real-time FLIR radiometric thermal texture (`Texture(textureId: state.textureId!)`), displays center spot temperature, and allows switching between thermal color palettes (Iron, Rainbow, Gray, Lava).

---

## ✅ Preconditions

- FLIR thermal camera is paired and streaming live data

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On `ConveyorInspectThermalCameraScreen`, verify live stream | Native thermal `Texture` widget renders 60fps radiometric stream |
| 2 | Observe center reticle temperature | Real-time spot temperature is displayed (e.g. `45.2 °C`) |
| 3 | Tap Palette button in toolbar | Palette selection bottom sheet opens |
| 4 | Select "Rainbow" palette | Stream switches colors to Rainbow palette |
| 5 | Select "Lava" palette | Stream switches colors to Lava palette |
| 6 | Select "Iron" palette | Stream returns to default Iron thermal palette |

---

## 🏁 Expected Results

- Live radiometric stream operates smoothly with real-time temperature telemetry and responsive palette switching

---

## 🔍 Flutter Source Reference

```dart
// conveyor_inspect_thermal_camera_screen.dart
Texture(textureId: state.textureId!)
// Palette change:
bloc.add(ChangeColorPaletteEvent(palette: selectedPalette));
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:thermal_camera_live_stream @regression @both
Scenario: Thermal camera live stream and color palette switching
  Given the FLIR thermal camera is connected
  When the user views the live thermal camera screen
  Then the radiometric texture stream and spot temperature should be visible
  When the user changes the palette to "Rainbow"
  Then the thermal stream palette should update immediately
```

---

## 🔗 Related

- [TC-CONVEYOR-INSPECT-016 — Min-max temperature picker](./tc-conveyor-inspect-016-thermal-min-max-temperature-picker.md)
- [Suite index](./index.md)
