# TC-CONVEYORS-028 — Save validation — top/bottom cover thickness rule and duplicate-name check

> Suite: [Conveyors](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYORS-028 |
| **Suite** | conveyors |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `conveyors_save_thickness_duplicate_validation` |
| **Feature File** | `features/regression/conveyors.feature` |
| **Page Objects** | `src/pages/conveyor-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify saving a conveyor is blocked when the top cover thickness is lower than the bottom cover thickness, and when the conveyor name already exists.

---

## ✅ Preconditions

- User has add permission for conveyors
- An existing conveyor with a known name is present, to test the duplicate-name path

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On Installed Belt, set Top Cover Thickness lower than Bottom Cover Thickness; attempt to save | `ConveyorFailState(error: bottomBiggerThanTop)` → snackbar "Top Cover Thickness is lower than Bottom Cover Thickness" (`conveyorBottomBiggerThanError`) |
| 2 | Correct the thickness values so Top ≥ Bottom; attempt to save again | Validation passes for this rule |
| 3 | Enter a conveyor name that already exists for another conveyor; attempt to save | `ConveyorFailState(error: exist)` → snackbar "Conveyor name is already exist" (`conveyorNameExist`) |
| 4 | Enter fractional thickness values (e.g. "3 1/2") | `parseFlexibleDouble` correctly parses the fraction for comparison, no false validation failure |

---

## 🏁 Expected Results

- Top cover thickness must be ≥ bottom cover thickness, else save is blocked with the exact error text above
- Duplicate conveyor names (case-sensitivity per source logic) are blocked with the exact error text above
- Fractional thickness input is parsed correctly and does not cause spurious validation failures

---

## 🔍 Flutter Source Reference

```dart
// conveyor_bloc.dart — validation before save
// - belt top/bottom thickness consistency: top must be >= bottom
// - Parse logic for thickness supports fractions via parseFlexibleDouble
// - validate name uniqueness before adding to pendings

// conveyor_details_screen.dart — error mapping
// ValidationConveyorErrorMessage.bottomBiggerThanTop -> conveyorBottomBiggerThanError
// ValidationConveyorErrorMessage.exist -> conveyorNameExist
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/conveyorsdata.csv @Key:conveyors_save_thickness_duplicate_validation @regression @both
Scenario: Top cover thickness lower than bottom blocks save
  Given the user is creating a conveyor with Top Cover Thickness "td.TopThickness" and Bottom Cover Thickness "td.BottomThickness"
  When the user attempts to save
  Then the error "Top Cover Thickness is lower than Bottom Cover Thickness" should be displayed

Scenario: Duplicate conveyor name blocks save
  Given a conveyor named "td.ExistingConveyorName" already exists
  When the user creates a new conveyor named "td.ExistingConveyorName" and attempts to save
  Then the error "Conveyor name is already exist" should be displayed
```

---

## 🔗 Related

- [TC-CONVEYORS-021 — Details step required-field validation](./tc-conveyors-021-details-step-required-field-validation.md)
- [Suite index](./index.md)
