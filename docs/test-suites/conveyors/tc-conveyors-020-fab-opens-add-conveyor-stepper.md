# TC-CONVEYORS-020 — "Add Conveyor" FAB opens the 3-step form on the Details step

> Suite: [Conveyors](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYORS-020 |
| **Suite** | conveyors |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `conveyors_fab_opens_stepper` |
| **Feature File** | `features/regression/conveyors.feature` |
| **Page Objects** | `src/pages/conveyor-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify the Home "Add Conveyor" FAB option opens `ConveyorDetailsScreen` in create mode, defaulting to the Details step, with the bottom action button labelled "Create".

---

## ✅ Preconditions

- User has `Permission.add` for `BasicModule.conveyorsData`
- Device is online (Add Conveyor FAB option requires connectivity)

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open the Home Add speed-dial FAB | `addConveyor` option is visible and enabled |
| 2 | Tap "Add Conveyor" | `ConveyorDetailsScreen(conveyor: ConveyorModel())` opens |
| 3 | Observe the initial step | `Details` step (`detailsStep_$_index`) is active/selected |
| 4 | Observe the bottom action button | Labelled `create` (not `save`/`edit`) |
| 5 | Observe the app bar | Title `conveyorDetailsAppbarTitle` = "Add Conveyor" |

---

## 🏁 Expected Results

- New blank `ConveyorModel()` is used, so all fields start empty/default
- Details step is the initial active step of the 3-step stepper

---

## 🔍 Flutter Source Reference

```dart
// app.dart — Add speed-dial FAB, Add Conveyor
SemanticsLabel(
  label: 'addConveyor',
  child: SpeedDialChild(
    label: AppLocalizations.of(context)!.addConveyor,
    onTap: () => Navigator.push(
      context,
      MaterialPageRoute(builder: (_) => ConveyorDetailsScreen(conveyor: ConveyorModel())),
      settings: const RouteSettings(name: RouteNameKeys.conveyorDetailsScreen),
    ),
  ),
),
```

**Semantic labels:** `addConveyor`, `conveyorDetailsAppbarTitle`, `detailsStep_$_index`, `bottomActionButton`

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/conveyorsdata.csv @Key:conveyors_fab_opens_stepper @regression @both
Scenario: Add Conveyor FAB opens stepper on Details step
  Given the user is logged in with conveyor add permission
  When the user taps the "Add Conveyor" FAB option
  Then the conveyor details stepper should open on the Details step
  And the bottom action button should read "Create"
```

---

## 🔗 Related

- [TC-CONVEYORS-002 — Add Conveyor happy path](./tc-conveyors-002-add-conveyor-happy-path.md)
- [Suite index](./index.md)
