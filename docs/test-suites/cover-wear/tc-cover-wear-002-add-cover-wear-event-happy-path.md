# TC-COVER-WEAR-002: Add Cover Wear Event Happy Path

> **Suite**: `cover-wear` | **Priority**: `Critical` | **Type**: `Smoke` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/features/coverwear/presentation/pages/cover_wear_add_screen.dart` | **Cubit**: `CoverWearCubit`

---

## 🎯 Objective
Verify the end-to-end happy path of creating a new Cover Wear event by selecting Site and Conveyor, confirming auto-loaded belt specifications, configuring data points, entering price/currency, and saving the event.

---

## 📋 Preconditions
- User has `Permission.add` on `BasicModule.coverWear`.
- Customer site and active conveyor exist in the database with complete belt specifications.

---

## 🧪 Test Steps
1. On `CoverWearListPage`, tap the Floating Action Button (FAB).
2. Verify navigation to `CoverWearAddScreen` with title `AppLocalizations.of(context)!.addCoverWearEvent`.
3. Select customer **Site** from the site dropdown.
4. Select target **Conveyor** from the conveyor dropdown.
5. Observe that `loadConveyorData()` auto-populates:
   - Installation date.
   - Belt width and belt length.
   - Top & Bottom cover nominal thicknesses and compounds.
   - Interactive belt cross-section diagram (`CoverWearBeltDiagram`).
6. Select Measured Cover: **Top Cover** (or **Bottom Cover**).
7. Select Number of Data Points: **Standard (7 points)**.
8. Enter actual cover thickness if needed.
9. Enter Belt Price (e.g., `15000`) and select Currency (`USD`).
10. Tap the **Next / Save** primary button in `CoverWearBottomBar`.
11. Verify that `CreateEventUseCase` executes, saves the local record with pending status, synthesizes an Installation Reading, and transitions to `CoverWearEditScreen` (or measurements view).

---

## 🔍 Expected Results
- Add form validates all required fields smoothly.
- New event record is created and persistent locally.
- Initial installation measurement reading is automatically initialized.

---

## 📱 Flutter Source Reference
- **Screen**: `lib/src/features/coverwear/presentation/pages/cover_wear_add_screen.dart` (`CoverWearAddScreen`)
- **Cubit**: `lib/src/features/coverwear/presentation/bloc/coverwear_event_form/cover_wear_cubit.dart` (`save(true)`)
- **Use Case**: `CreateEventUseCase`
- **Route Key**: `RouteNameKeys.coverWearAddScreen`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/coverweardata.csv @Key:coverwear_add_happy_path @smoke @both
Scenario: Create a new Cover Wear event successfully
  Given the user has cover wear add permissions
  When the user taps the add button on the Cover Wear list
  And selects site "<SiteName>" and conveyor "<ConveyorName>"
  And selects measured cover "Top" with "Standard" 7 data points
  And enters belt price "15000" and currency "USD"
  And taps the Save button
  Then the cover wear event should be created successfully
  And the user should be transitioned to the measurement editor
```
