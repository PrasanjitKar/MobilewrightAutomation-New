# TC-CONVEYORS-022 — Details step head/tail latitude/longitude coordinate fields

> Suite: [Conveyors](./index.md) | Priority: Low | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYORS-022 |
| **Suite** | conveyors |
| **Priority** | Low |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `conveyors_details_coordinates` |
| **Feature File** | `features/regression/conveyors.feature` |
| **Page Objects** | `src/pages/conveyor-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify the Details step's head/tail latitude and longitude fields accept valid coordinate input and are preserved on save.

---

## ✅ Preconditions

- User has add/edit permission for conveyors; stepper open on Details step

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Enter a valid latitude/longitude in `headLatitudeField` / `headLongitudeField` | Values accepted |
| 2 | Enter a valid latitude/longitude in `tailLatitudeField` / `tailLongitudeField` | Values accepted |
| 3 | Save the conveyor | Coordinates persist and are shown correctly on reopening (edit mode) |
| 4 | Enter an out-of-range or malformed coordinate (e.g. latitude > 90) | `ConveyorFailState(error: coordinateIncorrect)` blocks save |

---

## 🏁 Expected Results

- Valid coordinates are stored and displayed correctly
- Invalid coordinates are rejected before the conveyor is saved

---

## 🔍 Flutter Source Reference

```dart
// details_step.dart
// LocationInputField-backed fields: headLatitudeField, headLongitudeField, tailLatitudeField, tailLongitudeField
// AppLocalizations: coordinates, coordinatesHead, coordinatesTail
```

**Semantic labels:** `headLatitudeField`, `headLongitudeField`, `tailLatitudeField`, `tailLongitudeField`

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/conveyorsdata.csv @Key:conveyors_details_coordinates @regression @both
Scenario: Coordinates are entered and saved correctly
  Given the user is creating or editing a conveyor
  When the user enters head and tail coordinates "td.HeadLat/td.HeadLng" and "td.TailLat/td.TailLng"
  And the user saves the conveyor
  Then the coordinates should be persisted correctly
```

---

## 🔗 Related

- [Suite index](./index.md)
