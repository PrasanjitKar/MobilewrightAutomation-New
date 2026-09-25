# TC-SITES-023 — Site Details map renders site location marker and conveyor routes

> Suite: [Sites](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-SITES-023 |
| **Suite** | sites |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `site_details_map_markers` |
| **Feature File** | `features/regression/sites.feature` |
| **Page Objects** | `src/pages/site-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that the interactive `ContiMap` widget on `SiteDetailsScreen` places a marker at the site's latitude/longitude and renders conveyor location markers and polylines for all conveyors associated with the site.

---

## ✅ Preconditions

- Site has defined `location.latitude` and `location.longitude`
- Site has conveyors with head and tail coordinates

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Navigate to `SiteDetailsScreen` for the site | Details screen loads |
| 2 | Scroll down to the map section | `ContiMap` widget is rendered |
| 3 | Inspect map markers | Marker with site name is positioned at `company.location` |
| 4 | Inspect conveyor routes | Head and tail coordinates of all site conveyors are plotted as markers |
| 5 | Perform zoom and pan gestures on the map | Map responds smoothly without crashing |

---

## 🏁 Expected Results

- Google Maps displays site coordinates accurately
- Conveyor polylines/markers correctly link to the site

---

## 🔍 Flutter Source Reference

```dart
// site_details_screen.dart
Widget map() {
  return SizedBox(
    height: DeviceHelper.isPhone() ? 300 : 222,
    child: ContiMap(
      conveyorList: widget.conveyorList ?? [],
      markers: [
        if (widget.company.location != null)
          ContiMapMarker(
            lat: widget.company.location!.latitude!,
            long: widget.company.location!.longitude!,
            title: widget.company.name ?? '',
          ),
      ],
    ),
  );
}
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:site_details_map_markers @regression @both
Scenario: Verify site map renders location marker and conveyor routes
  Given the user is on the site details screen
  When the map widget is visible
  Then the map should render the site marker at "td.Latitude", "td.Longitude"
```

---

## 🔗 Related

- [TC-SITES-003 — Site details read only view](./tc-sites-003-site-details-read-only-and-map-view.md)
- [Suite index](./index.md)
