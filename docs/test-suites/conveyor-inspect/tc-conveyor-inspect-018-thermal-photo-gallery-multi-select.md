# TC-CONVEYOR-INSPECT-018 — Thermal Camera — image gallery selection, deletion, and LHS/RHS assignment

> Suite: [Conveyor Inspect](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYOR-INSPECT-018 |
| **Suite** | conveyor-inspect |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `thermal_gallery_selection_assignment` |
| **Feature File** | `features/regression/conveyor_inspect.feature` |
| **Page Objects** | `src/pages/thermal-camera-gallery.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that `ConveyorInspectThermalCameraImageListScreen` displays captured thermal photos in a grid, enables multi-select mode, supports batch deletion, and allows assigning selected photos to the LHS or RHS of the inspection event.

---

## ✅ Preconditions

- Multiple thermal snapshots have been captured in the session

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open `ConveyorInspectThermalCameraImageListScreen` | Grid of captured thermal snapshots displays |
| 2 | Tap "Select" in top right | Selection checkboxes appear on all thumbnails |
| 3 | Select 3 images and tap "Delete" icon | Confirmation dialog displays; confirming removes images |
| 4 | Select remaining images and tap "Assign to LHS" | Images are bundled and attached to Left Hand Side |
| 5 | Tap "Done" / Back | Returns to `AddEditConveyorInspectEvent` with attached files updated |

---

## 🏁 Expected Results

- Gallery allows complete management and side assignment of captured thermal images

---

## 🔍 Flutter Source Reference

```dart
// conveyor_inspect_thermal_camera_image_list_screen.dart
bloc.add(AssignImagesToSideEvent(side: InspectionSide.lhs, imageIds: selectedIds));
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:thermal_gallery_selection_assignment @regression @both
Scenario: Manage and assign captured thermal images
  Given captured thermal snapshots exist in the camera gallery
  When the user opens the thermal image gallery
  And selects photos and assigns them to "LHS"
  Then the photos should be attached to the LHS inspection event
```

---

## 🔗 Related

- [TC-CONVEYOR-INSPECT-017 — Snapshot capture](./tc-conveyor-inspect-017-thermal-snapshot-capture.md)
- [Suite index](./index.md)
