# TC-CONVEYORS-026 — Conveyor Stations — cascading enable/disable + single Drive/Take-up selection

> Suite: [Conveyors](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYORS-026 |
| **Suite** | conveyors |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `conveyors_stations_cascading` |
| **Feature File** | `features/regression/conveyors.feature` |
| **Page Objects** | `src/pages/conveyor-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify the `ConveyorStations` widget (embedded in both the Conveyor-Lite and Installed Belt steps) correctly cascades station enable/disable state and enforces a single Drive and single Take-up station selection.

---

## ✅ Preconditions

- User has add/edit permission for conveyors; stepper on a step containing `ConveyorStations`
- 6 stations are shown by default, all initially disabled

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Enable station 4 via `checkboxForStations_3` | Stations 1, 2, 3, and 4 are all auto-enabled |
| 2 | Select `driveRadioButton_3` (station 4) | Station 4 is marked as Drive; no other station can be Drive simultaneously |
| 3 | Select `driveRadioButton_1` (station 2) | Drive selection moves to station 2; station 4 is no longer Drive |
| 4 | Select `takeUpRadioButton_3` (station 4) | Station 4 is marked as Take-up |
| 5 | Disable station 2 via its checkbox (while it is the Drive station) | Stations 3–6 are auto-disabled; if Drive was on a now-disabled station, Drive selection moves back one station |
| 6 | Attempt to select both Drive and Take-up on the same station | Not permitted — a station cannot be both simultaneously (verify actual app behaviour before automating) |

---

## 🏁 Expected Results

- Enabling any station backfills enabling all preceding stations
- Disabling any station clears all following stations
- Only one Drive and one Take-up station can be active at a time across the whole set

---

## 🔍 Flutter Source Reference

```dart
// conveyor_stations.dart
// Initializes 6 station rows (id 1-6) if none supplied.
// Columns: Stations, Drive, Take-up.
// Enabling a station backfills all previous stations as enabled.
// Disabling a station clears later stations and may move drive/take-up one step back.
// Only one drive station and one take-up station at a time.
```

**Semantic labels:** `checkboxForStations_$index`, `driveRadioButton_$index`, `takeUpRadioButton_$index`

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/conveyorsdata.csv @Key:conveyors_stations_cascading @regression @both
Scenario: Conveyor Stations enable/disable cascades correctly
  Given the user is on a stepper step containing the Conveyor Stations widget
  When the user enables station 4
  Then stations 1 through 4 should all be enabled
  When the user disables station 2
  Then stations 3 through 6 should be automatically disabled
```

---

## 🔗 Related

- [TC-CONVEYORS-025 — Conveyor-Lite dynamics fields](./tc-conveyors-025-conveyor-lite-dynamics-fields.md)
- [Suite index](./index.md)
