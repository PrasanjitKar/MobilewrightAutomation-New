# TC-CONVEYORS-021 — Details step required-field validation (name, customer site)

> Suite: [Conveyors](./index.md) | Priority: Critical | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYORS-021 |
| **Suite** | conveyors |
| **Priority** | Critical |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `conveyors_details_required_fields` |
| **Feature File** | `features/regression/conveyors.feature` |
| **Page Objects** | `src/pages/conveyor-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify saving a conveyor without a name or without a customer site is blocked and shows the correct validation error message.

---

## ✅ Preconditions

- User has `Permission.add` for conveyors
- New conveyor stepper is open on the Details step

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Leave `conveyorNameTextField` blank; fill customer site; attempt to save | `ConveyorFailState(error: name)` → snackbar "Conveyor Name is required" (`conveyorNameError`) |
| 2 | Fill conveyor name; leave customer site blank; attempt to save | `ConveyorFailState(error: customer)` → snackbar "Customer Site Field is required" (`conveyorCustomerError`) |
| 3 | Fill both name and customer site; attempt to save | Save proceeds (no validation error) |

---

## 🏁 Expected Results

- Both name and customer site are mandatory; save is blocked with a specific error message for each missing field
- No partial/invalid conveyor is created in either failure case

---

## 🔍 Flutter Source Reference

```dart
// conveyor_details_screen.dart — BlocConsumer<ConveyorBloc, ConveyorState> listener
if (state is ConveyorFailState) {
  switch (state.error) {
    case ValidationConveyorErrorMessage.name:
      showSnackbar(AppLocalizations.of(context)!.conveyorNameError); // "Conveyor Name is required"
    case ValidationConveyorErrorMessage.customer:
      showSnackbar(AppLocalizations.of(context)!.conveyorCustomerError); // "Customer Site Field is required"
    ...
  }
}
```

**Semantic label:** `conveyorNameTextField` (tablet: `conveyorNameTextFieldTab`)

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/conveyorsdata.csv @Key:conveyors_details_required_fields @regression @both
Scenario Outline: Required-field validation blocks save
  Given the user is creating a new conveyor
  When the user leaves "<field>" blank and attempts to save
  Then the error message "<expectedError>" should be displayed

  Examples:
    | field         | expectedError                        |
    | Conveyor Name | Conveyor Name is required             |
    | Customer Site | Customer Site Field is required       |
```

---

## 🔗 Related

- [TC-CONVEYORS-028 — Save validation thickness/duplicate name](./tc-conveyors-028-save-validation-thickness-and-duplicate-name.md)
- [Suite index](./index.md)
