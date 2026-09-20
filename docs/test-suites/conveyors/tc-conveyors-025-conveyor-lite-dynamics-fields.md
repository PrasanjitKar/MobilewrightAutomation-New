# TC-CONVEYORS-025 — Conveyor-Lite step conveyor dynamics fields accept and persist values

> Suite: [Conveyors](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYORS-025 |
| **Suite** | conveyors |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `conveyors_lite_dynamics_fields` |
| **Feature File** | `features/regression/conveyors.feature` |
| **Page Objects** | `src/pages/conveyor-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify the Conveyor-Lite step's dynamics fields (belt width, belt speed, tons per hour, material, idler angle, drive wrap, friction factor, etc.) accept valid input and are correctly persisted on save.

---

## ✅ Preconditions

- User has add/edit permission for conveyors; stepper on the Conveyor-Lite step

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Select a value in `beltWidthDropdown` | Value selected |
| 2 | Enter a numeric value in `beltSpeedTextField` | Accepted |
| 3 | Enter a numeric value in `tonsPerHourPeakTextField` | Accepted |
| 4 | Select/enter a value for pick material name (autocomplete) | Accepted |
| 5 | Enter a value in `angleOfIdlersTextField` (tablet: `angleOfIdlersTextFieldTab`) | Accepted |
| 6 | Select a value in `driveWrapDropdown` and `driveWrapAngleDropdown` | Accepted; angle dropdown options depend on selected drive wrap |
| 7 | Select an option via `frictionFactorRadioButton` | Derived read-only fields `frictionFactorDisabledField` / `lengthFactorDisabledField` update accordingly |
| 8 | Save the conveyor and reopen it for edit | All entered Conveyor-Lite values are shown correctly |

---

## 🏁 Expected Results

- All fields accept valid values and are preserved through save/reload
- Friction-factor selection correctly derives the disabled friction/length factor fields

---

## 🔍 Flutter Source Reference

```dart
// conveyor_lite_step.dart
// Fields: beltWidth, beltSpeed, tonsPeerHour, pickMaterialName, materialDensity, angleIdlers,
// carrySideIdler, driveWrap, takeupTension, frictionFactor (+ disabled frictionFactor/lengthFactor),
// surchargeAngle, idlerOffset, takeUpDetails, ConveyorStations(...)
```

**Semantic labels:** `beltWidthDropdown`, `beltSpeedTextField`, `tonsPerHourPeakTextField`, `angleOfIdlersTextField`/`angleOfIdlersTextFieldTab`, `driveWrapDropdown`, `driveWrapAngleDropdown`, `frictionFactorLabel`, `frictionFactorRadioButton`, `frictionFactorDisabledField`, `lengthFactorDisabledField`

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/conveyorsdata.csv @Key:conveyors_lite_dynamics_fields @regression @both
Scenario: Conveyor-Lite dynamics fields are saved correctly
  Given the user is on the Conveyor-Lite step of a new conveyor
  When the user enters valid dynamics field values
  And the user saves the conveyor
  Then the Conveyor-Lite values should be persisted correctly on reopen
```

---

## 🔗 Related

- [TC-CONVEYORS-026 — Conveyor Stations cascading selection](./tc-conveyors-026-conveyor-stations-cascading-selection.md)
- [Suite index](./index.md)
