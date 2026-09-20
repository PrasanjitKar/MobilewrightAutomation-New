# TC-CONVEYORS-027 — Installed Belt step: carcass type toggles plies vs. cords/pitch/diameter fields

> Suite: [Conveyors](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYORS-027 |
| **Suite** | conveyors |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `conveyors_installed_belt_carcass_conditional` |
| **Feature File** | `features/regression/conveyors.feature` |
| **Page Objects** | `src/pages/conveyor-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify the Installed Belt step's carcass-type selection correctly toggles between "number of plies" fields and "number of cords + cord pitch/diameter" fields.

---

## ✅ Preconditions

- User has add/edit permission for conveyors; stepper on the Installed Belt step

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Select a fabric/ply-based carcass type | `noOfPilesTextField` (tablet: `noOfPilesTextFieldTab`) is shown; cord fields are hidden |
| 2 | Select "ST" (steel cord) carcass type | `noOfCordsTextField` (tablet: `noOfCordsTextFieldTab`), `cordPitch`, and `cordDiameter` fields are shown instead; plies field is hidden |
| 3 | Enter valid values for the visible field set and save | Values persist correctly for the selected carcass type |
| 4 | Reopen the conveyor and change carcass type again | Form correctly re-toggles the visible field set; previously entered values for the no-longer-visible set are not required for save |

---

## 🏁 Expected Results

- Exactly one of {plies} or {cords, pitch, diameter} is visible/required at a time, driven by carcass type
- Switching carcass type does not corrupt other Installed Belt fields (compound, thickness, breaker, etc.)

---

## 🔍 Flutter Source Reference

```dart
// installed_belt_step.dart
// carcass type: number of plies OR number of cords/cord pitch/cord diameter (when carcass is "ST")
// AppLocalizations: carcass, numberOfPlies, numberOfCords, cordPitch, cordDiameter
```

**Semantic labels:** `noOfPilesTextField`/`noOfPilesTextFieldTab`, `noOfCordsTextField`/`noOfCordsTextFieldTab`, `cordPitch`, `cordDiameter`

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/conveyorsdata.csv @Key:conveyors_installed_belt_carcass_conditional @regression @both
Scenario Outline: Carcass type toggles the correct field set
  Given the user is on the Installed Belt step
  When the user selects carcass type "<carcassType>"
  Then only the "<expectedFields>" fields should be visible

  Examples:
    | carcassType | expectedFields                          |
    | Fabric      | Number of Plies                         |
    | ST          | Number of Cords, Cord Pitch, Cord Diameter |
```

---

## 🔗 Related

- [TC-CONVEYORS-028 — Save validation thickness/duplicate name](./tc-conveyors-028-save-validation-thickness-and-duplicate-name.md)
- [Suite index](./index.md)
