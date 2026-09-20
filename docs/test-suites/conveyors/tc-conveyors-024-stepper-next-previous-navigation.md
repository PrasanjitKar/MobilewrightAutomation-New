# TC-CONVEYORS-024 — Stepper Next/Previous navigation across Details/Conveyor-Lite/Installed Belt

> Suite: [Conveyors](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYORS-024 |
| **Suite** | conveyors |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `conveyors_stepper_navigation` |
| **Feature File** | `features/regression/conveyors.feature` |
| **Page Objects** | `src/pages/conveyor-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify the 3-step conveyor form's Next/Previous controls correctly move between Details → Conveyor-Lite → Installed Belt (and back), and that entered data on each step is preserved when navigating away and back.

---

## ✅ Preconditions

- User has add/edit permission for conveyors; stepper open in create or edit mode

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On the Details step, enter valid required data, tap `nextButton` | Advances to the Conveyor-Lite step (`conveyorLiteStep_$_index` active) |
| 2 | On Conveyor-Lite, enter some field values, tap `nextButton` | Advances to the Installed Belt step (`installedBeltStep_$_index` active) |
| 3 | On Installed Belt, tap `previousButton` | Returns to Conveyor-Lite with previously entered values intact |
| 4 | Tap `previousButton` again | Returns to Details with previously entered values intact |
| 5 | On the Details step, attempt to tap `nextButton` with required fields missing | Blocked — remains on Details step with validation feedback |

---

## 🏁 Expected Results

- Data entered on any step persists in the in-memory `ConveyorModel` while navigating between steps
- Forward navigation from Details is blocked until required fields are valid (tied to TC-CONVEYORS-021)
- Step icons (`ConveyorStepIcon`) reflect the currently active/completed step

---

## 🔍 Flutter Source Reference

```dart
// conveyor_step/conveyor_stepper_controls.dart
// previousButton / nextButton — dispatch step index changes on the EnhanceStepper
// Uses AppLocalizations.of(context)!.previous / .next
```

**Semantic labels:** `previousButton`/`previousButtonTab`, `nextButton`/`nextButtonTab`, `detailsStep_$_index`, `conveyorLiteStep_$_index`, `installedBeltStep_$_index`

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/conveyorsdata.csv @Key:conveyors_stepper_navigation @regression @both
Scenario: Stepper navigation preserves entered data
  Given the user is creating a new conveyor with valid Details data
  When the user navigates Next to Conveyor-Lite and Installed Belt
  And the user navigates Previous back to Details
  Then the previously entered Details data should still be present
```

---

## 🔗 Related

- [TC-CONVEYORS-021 — Details step required-field validation](./tc-conveyors-021-details-step-required-field-validation.md)
- [Suite index](./index.md)
