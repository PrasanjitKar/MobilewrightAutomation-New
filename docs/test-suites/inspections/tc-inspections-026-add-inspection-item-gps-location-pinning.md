# TC-INSPECTIONS-026 — Add Item — automatic GPS location capture and map pinpointing

> Suite: [Inspections](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-INSPECTIONS-026 |
| **Suite** | inspections |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `add_inspection_item_gps_pin` |
| **Feature File** | `features/regression/inspections.feature` |
| **Page Objects** | `src/pages/inspection-item-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that when creating a new finding in `InspectionItemDetails`, the device's current GPS coordinates are automatically retrieved via `Geolocator`, pinned on the embedded map (`inspectionMap`), and stored in `_item.location`.

---

## ✅ Preconditions

- Device GPS / Location services enabled

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open `InspectionItemDetails` in create mode | `_getCurrentLocation()` runs in post-frame callback |
| 2 | Observe "Location" map section (`inspectionMap`) | Map centers on current GPS coordinates |
| 3 | Tap on the map to adjust marker pin | Location pin updates to tapped position; coordinates update in `_item.location` |
| 4 | Save item | Finding persists with exact latitude and longitude |

---

## 🏁 Expected Results

- GPS location is automatically acquired and adjustable on the interactive map

---

## 🔍 Flutter Source Reference

```dart
// inspection_item_details.dart
Position position = await Geolocator.getCurrentPosition();
setState(() {
  _item.location = LocationModel(latitude: position.latitude, longitude: position.longitude);
});
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:add_inspection_item_gps_pin @regression @both
Scenario: Automatic GPS pinning for inspection finding
  Given the device has location services enabled
  When the user creates a new inspection finding
  Then the current GPS coordinates should be pinned on the finding map
```

---

## 🔗 Related

- [TC-INSPECTIONS-024 — Add item condition](./tc-inspections-024-add-inspection-item-condition-and-status.md)
- [Suite index](./index.md)
