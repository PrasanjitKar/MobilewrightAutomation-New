# TC-CONVEYOR-INSPECT-024 — Image Viewer — radiometric thermal photo full-screen pan and zoom

> Suite: [Conveyor Inspect](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYOR-INSPECT-024 |
| **Suite** | conveyor-inspect |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `thermal_fullscreen_image_viewer` |
| **Feature File** | `features/regression/conveyor_inspect.feature` |
| **Page Objects** | `src/pages/file-preview.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that tapping any thermal finding photo opens full-screen interactive view with pinch-to-zoom, pan gesture support, temperature scale legend, and sharing/export action.

---

## ✅ Preconditions

- Inspection finding with attached radiometric thermal photo is open

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | From finding details card, tap thermal photo thumbnail | Fullscreen photo viewer opens |
| 2 | Perform pinch-to-zoom gesture on the image | Image zooms in up to 4x without crashing |
| 3 | Pan across zoomed thermal image | Smooth panning across hot zones |
| 4 | Double tap image | Resets zoom level to 1x |
| 5 | Tap close button "X" | Returns back to finding details card |

---

## 🏁 Expected Results

- High-resolution radiometric images can be examined in full detail with responsive touch gestures

---

## 🔍 Flutter Source Reference

```dart
// file_preview_screen.dart / InteractiveViewer
InteractiveViewer(
  minScale: 1.0,
  maxScale: 4.0,
  child: Image.network(finding.thermalImageUrl),
)
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:thermal_fullscreen_image_viewer @regression @both
Scenario: Zoom and pan thermal finding photo
  Given a finding details card is expanded
  When the user taps the thermal photo thumbnail
  Then the image should open full-screen
  And pinch-to-zoom and pan gestures should work smoothly
```

---

## 🔗 Related

- [TC-CONVEYOR-INSPECT-022 — Findings cards](./tc-conveyor-inspect-022-details-findings-expandable-cards.md)
- [Suite index](./index.md)
