# TC-MINUTEMAN-003: Navigation from Dashboard & Conveyor Info

> **Suite**: `minuteman-calculation` | **Priority**: `High` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/screens/home/home_screen.dart` & `lib/src/ui/screens/conveyors/conveyor_information_screen.dart`

---

## 🎯 Objective
Verify all navigation entry points to the Minuteman Calculation list screen: from Home/Dashboard screen on phone & tablet, and from Conveyor Information hub screen.

---

## 📋 Preconditions
- User is logged in with view permissions for Minuteman calculations.
- Test conveyor exists with associated Minuteman calculations.

---

## 🧪 Test Steps
1. **From Home Screen (Phone)**:
   - Tap the `Minuteman Calc.` card (`label: 'minutemanCalculationCard'`).
   - Verify push navigation to `MinutemanListScreen` with route `minuteman_calc_list_screen`.
   - Tap back icon and verify return to Home.
2. **From Home Screen (Tablet Split View)**:
   - Tap the `Minuteman Calc.` card in the left navigation pane.
   - Verify card is highlighted (`isSelected: true`).
   - Verify the right pane updates to display `minutemanList()` with `MinutemanRow`s.
3. **From Conveyor Information Hub**:
   - Navigate to Conveyor details screen for conveyor with Minuteman calculations.
   - Tap the `Minuteman` card (`label: 'minutemanCard'`).
   - Verify navigation to `MinutemanListScreen` with `conveyorId` parameter set and `isConveyorIdsPreSupplied: true`.
   - Verify only calculations associated with that specific conveyor are listed.

---

## 🔍 Expected Results
- Navigation routes successfully from all entry points.
- Tablet split view renders correctly without full-page navigation.
- Conveyor hub navigation pre-filters calculations specifically for the target conveyor.

---

## 📱 Flutter Source Reference
- **Home Screen**: `lib/src/ui/screens/home/home_screen.dart` (`minutemanCalculationCard`, `minutemanList()`, `RouteNameKeys.minutemanCalcListScreen`)
- **Conveyor Hub**: `lib/src/ui/screens/conveyors/conveyor_information_screen.dart` (`minutemanCard`, `MinutemanFilters(isConveyorIdsPreSupplied: true)`)
- **Route Key**: `RouteNameKeys.minutemanCalcListScreen`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/minutemandata.csv @Key:minuteman_navigation_entry @regression @both
Scenario: Navigate to Minuteman calculation list from Dashboard and Conveyor Hub
  Given the user is logged into the application
  When the user taps the Minuteman card on the dashboard
  Then the Minuteman calculation list screen should open
  When the user navigates back to dashboard
  And navigates to conveyor details for "<ConveyorName>"
  And taps the Minuteman card on conveyor hub
  Then the Minuteman calculation list should open filtered for "<ConveyorName>"
```
