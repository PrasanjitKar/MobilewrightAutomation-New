# TC-CONVEYORS-033 — Conveyor Information hub shows permission-gated navigation cards

> Suite: [Conveyors](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYORS-033 |
| **Suite** | conveyors |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `conveyors_information_hub_cards` |
| **Feature File** | `features/regression/conveyors.feature` |
| **Page Objects** | `src/pages/conveyor-information.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify the Conveyor Information hub shows exactly the cards the signed-in user has view permission for, and that each card navigates to its correct destination.

---

## ✅ Preconditions

- Test users/roles covering each permission module listed below (full-permission user and at least one restricted user)
- A conveyor exists to open the Information hub for

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | As a full-permission user, open a conveyor's Information hub | All 8 cards are visible: Technical Data, File Manager, Cover Wear, Inspections, Conveyor Inspect, Belt Scans, Monitoring Devices, Minuteman |
| 2 | Tap "Technical Data" (`technicalDataCard`) | Opens `ConveyorDetailsScreen(isReadOnly: true)` |
| 3 | Tap "File Manager" (`fileManagerCard`) | Opens `FileManagerScreen` |
| 4 | Tap "Cover Wear" (`coverWearCard`) | Opens `CoverWearListPage(conveyorId: ...)` |
| 5 | Tap "Inspections" (`inspectionCard`) | Opens `InspectionListScreen` (free user) or switches the bottom-nav tab via `AppLoadEvent(selectedPage: 4, ...)` (full user) |
| 6 | Tap "Belt Scans" (`beltScanCard`) | Opens `BeltScanListScreen(conveyorId: ...)` |
| 7 | Tap "Monitoring Devices" (`monitoringDeviceCard`) | Opens `MonitoringDeviceListScreen` |
| 8 | Tap "Minuteman" (`minutemanCard`) | Opens `MinutemanListScreen(conveyorId: ...)` |
| 9 | As a user missing one specific module permission (e.g. `BasicModule.coverWear`) | Only that module's card (`coverWearCard`) is hidden; all other permitted cards remain visible |

---

## 🏁 Expected Results

- Each card's visibility is independently gated by its own permission module/`Permission.view` check
- Navigation targets and route names match exactly as documented

---

## 🔍 Flutter Source Reference

```dart
// conveyor_information_screen.dart — permission checks per card
// BasicModule.uploadDownloadFiles / Permission.view       -> File Manager
// BasicModule.conveyorsData / Permission.view             -> Technical Data
// InspectionModule.inspectionModule / Permission.view     -> Inspections
// BasicModule.coverWear / Permission.view                 -> Cover Wear
// ConveyorInspectModule.conveyorInspectModule / Permission.view -> Conveyor Inspect
// IOTModule.beltMonitoring / Permission.view               -> Monitoring Devices
// BasicModule.minutemanConveyor OR BasicModule.minutemanElevator / Permission.view -> Minuteman
// BasicModule.beltScan / Permission.view                   -> Belt Scans
```

**Semantic labels:** `technicalDataCard`, `fileManagerCard`, `coverWearCard`, `inspectionCard`, `conveyorInspectLabel`, `beltScanCard`, `monitoringDeviceCard`, `minutemanCard`

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/conveyorsdata.csv @Key:conveyors_information_hub_cards @regression @both
Scenario: Information hub shows permission-gated cards
  Given the user opens the Conveyor Information hub for "td.ConveyorName"
  Then only the cards for modules the user can view should be displayed
  When the user taps the "Technical Data" card
  Then the conveyor Technical Data screen should open in read-only mode
```

---

## 🔗 Related

- [TC-CONVEYORS-034 — Information hub back navigation](./tc-conveyors-034-information-hub-back-navigation.md)
- [Suite index](./index.md)
