# TC-CONVEYOR-INSPECT-023 — Fullscreen Map — GPS route line and interactive defect hotspot pins

> Suite: [Conveyor Inspect](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYOR-INSPECT-023 |
| **Suite** | conveyor-inspect |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `conveyor_inspect_fullscreen_map` |
| **Feature File** | `features/regression/conveyor_inspect.feature` |
| **Page Objects** | `src/pages/conveyor-inspect-map.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that `ConveyorInspectFullscreenMap` renders the complete conveyor GPS polyline path with color-coded defect hotspot marker pins at exact GPS positions, and tapping a pin opens a modal preview of the finding.

---

## ✅ Preconditions

- Inspection event contains GPS geotagged findings along the conveyor path

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On `ConveyorInspectDetailsScreen`, tap "View Fullscreen Map" button | `ConveyorInspectFullscreenMap` opens |
| 2 | Observe map rendering | Google/Mapbox map renders conveyor polyline path |
| 3 | Observe defect pins along path | Colored hotspot pins (Red for Critical, Yellow for Warning) appear at GPS points |
| 4 | Tap on a red defect pin | Callout bubble / bottom sheet displays finding summary (Idler #, Temp, Side) |
| 5 | Tap "View Finding" inside callout | Directly scrolls / focuses on that finding's full details |

---

## 🏁 Expected Results

- Fullscreen geospatial visualization accurately maps thermal hotspots across the conveyor route

---

## 🔍 Flutter Source Reference

```dart
// conveyor_inspect_fullscreen_map.dart
GoogleMap(
  polylines: {Polyline(polylineId: PolylineId('conveyor_route'), points: routePoints)},
  markers: findingMarkers,
)
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:conveyor_inspect_fullscreen_map @regression @both
Scenario: Interactive defect hotspot map exploration
  Given the user is on the Conveyor Inspect details screen
  When the user opens the Fullscreen Map
  Then the conveyor GPS route and defect hotspot pins should be displayed
  When the user taps on a defect hotspot pin
  Then the finding summary callout should be displayed
```

---

## 🔗 Related

- [TC-CONVEYOR-INSPECT-022 — Findings cards](./tc-conveyor-inspect-022-details-findings-expandable-cards.md)
- [Suite index](./index.md)
