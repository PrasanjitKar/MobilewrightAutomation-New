# TC-CONVEYORS-002 — Add Conveyor — create a new conveyor with required fields (happy path)

> Suite: [Conveyors](./index.md) | Priority: Critical | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYORS-002 |
| **Suite** | conveyors |
| **Priority** | Critical |
| **Type** | Smoke |
| **Suggested Tags** | `@smoke @both` |
| **Data Key** | `conveyors_add_happy_path` |
| **Feature File** | `features/smoke/conveyors.feature` |
| **Page Objects** | `src/pages/conveyor-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that a user with `Permission.add` for `BasicModule.conveyorsData` can create a new conveyor from the Home "Add Conveyor" FAB by filling only the required fields, and that it is saved and appears in the list.

---

## ✅ Preconditions

- User is logged in with `BasicModule.conveyorsData` / `Permission.add`
- Device is online
- A valid customer site exists to assign the new conveyor to

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | From Home, open the Add speed-dial FAB and tap "Add Conveyor" | `ConveyorDetailsScreen(conveyor: ConveyorModel())` opens on the **Details** step |
| 2 | Enter a unique conveyor name in `conveyorNameTextField` | Value accepted |
| 3 | Select a Customer Site | Value accepted |
| 4 | Tap `nextButton` through Conveyor-Lite and Installed Belt steps without changing optional fields | Stepper advances; no validation errors |
| 5 | Tap `bottomActionButton` (labelled `create`) | `ConveyorValidateAndSaveToLocalEvent` dispatched |
| 6 | Observe result | `ConveyorSavingLocalState` → snackbar "Conveyor Saved Locally"; screen pops back |
| 7 | Return to the Conveyors list | New conveyor appears in `conveyorListItem_$index` rows and list count increments |

---

## 🏁 Expected Results

- New conveyor is created, saved locally, and (when online) synced to the server
- New conveyor is visible in the list with the entered name and site
- No validation errors block the save when only required fields are filled

---

## 🔍 Flutter Source Reference

```dart
// app.dart — Add speed-dial FAB
SemanticsLabel(
  label: 'addConveyor',
  child: SpeedDialChild(
    label: AppLocalizations.of(context)!.addConveyor, // "Add Conveyor"
    onTap: () => Navigator.push(
      context,
      MaterialPageRoute(builder: (_) => ConveyorDetailsScreen(conveyor: ConveyorModel())),
      settings: const RouteSettings(name: RouteNameKeys.conveyorDetailsScreen),
    ),
  ),
),

// conveyor_bloc.dart — save success path
emit(state.copyWith(status: ConveyorSavingLocalState()));
// snackbar: AppLocalizations.of(context)!.conveyorSavedLocally ("Conveyor Saved Locally")
```

**Semantic labels / locators:**
- `addConveyor` — FAB speed-dial option
- `conveyorNameTextField` — name input (required)
- `bottomActionButton` — create/save/edit button (label depends on mode)
- `nextButton` / `previousButton` — stepper navigation

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/conveyorsdata.csv @Key:conveyors_add_happy_path @smoke @both
Scenario: Add a new conveyor with only required fields
  Given the user is logged in
  When the user taps the "Add Conveyor" FAB option
  And the user enters "td.ConveyorName" as the conveyor name
  And the user selects "td.CustomerSite" as the customer site
  And the user saves the new conveyor
  Then the conveyor should be saved successfully
  And the conveyor "td.ConveyorName" should appear in the conveyors list
```

---

## 🔗 Related

- [TC-CONVEYORS-021 — Details step required-field validation](./tc-conveyors-021-details-step-required-field-validation.md)
- [Suite index](./index.md)
