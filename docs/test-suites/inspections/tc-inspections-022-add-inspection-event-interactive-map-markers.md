# TC-INSPECTIONS-022 — Add Event — interactive map renders site/conveyor GPS pins

> Suite: [Inspections](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-INSPECTIONS-022 |
| **Suite** | inspections |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `add_inspection_map_markers` |
| **Feature File** | `features/regression/inspections.feature` |
| **Page Objects** | `src/pages/inspection-add.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that `InspectionEventStep` displays an interactive `ContiMap` widget (`siteMap`) rendering GPS pins for the selected site and its associated conveyors, enabling user location and full map panning/zooming.

---

## ✅ Preconditions

- Selected Site has valid GPS latitude and longitude coordinates
- Location services permission is granted

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On `AddInspectionEventScreen`, select a Site with geographic coordinates | `siteMap` loads Google Maps / Apple Maps view |
| 2 | Observe map pins | Pin marker is placed at the site's latitude/longitude (`ContiMapMarker`) |
| 3 | Check conveyor polylines/markers | If conveyors have GPS paths or coordinates, markers are rendered on the map |
| 4 | Pinch-to-zoom and pan the map | Map responds fluidly to touch gestures |

---

## 🏁 Expected Results

- Interactive map provides visual geolocation verification for the site being inspected

---

## 🔍 Flutter Source Reference

```dart
// inspection_info_step.dart
ContiMap(
  enableMyLocation: true,
  conveyorList: state.inspection.siteId != null ? conveyorState.bySite(state.inspection.siteId!) : [],
  markers: [
    if (state.inspection.localSite?.location != null)
      ContiMapMarker(
        lat: state.inspection.localSite!.location!.latitude!,
        long: state.inspection.localSite!.location!.longitude!,
        title: state.inspection.localSite!.name ?? '',
      ),
  ],
)
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:add_inspection_map_markers @regression @both
Scenario: Interactive map markers on Add Inspection screen
  Given the user selects a site with geographic coordinates
  When the user views the Site Map section
  Then the map should render a pin marker at the site's GPS location
```

---

## 🔗 Related

- [TC-INSPECTIONS-020 — Site selection auto-naming](./tc-inspections-020-add-inspection-event-site-selection-auto-naming.md)
- [Suite index](./index.md)
