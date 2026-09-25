# TC-COVER-WEAR-005: Navigation from Dashboard & Conveyor Hub

> **Suite**: `cover-wear` | **Priority**: `High` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/screens/home/home_screen.dart` & `lib/src/ui/screens/conveyors/conveyor_information_screen.dart`

---

## 🎯 Objective
Verify navigation entry points to Cover Wear: from Home/Dashboard screen on phone & tablet, and from Conveyor Information hub with pre-applied conveyor filtering.

---

## 📋 Preconditions
- User is logged in with view permissions for Cover Wear.
- Test conveyors exist with associated Cover Wear events.

---

## 🧪 Test Steps
1. **Home Screen (Phone)**:
   - Locate and tap the `Cover Wear` card (`label: 'coverWearCard'`).
   - Verify push navigation to `CoverWearListPage`.
   - Tap the back button and verify return to Home.
2. **Home Screen (Tablet Split View)**:
   - Tap `Cover Wear` in the left dashboard pane.
   - Verify the card is highlighted (`isSelected: true`).
   - Verify the right pane updates to show `coverWearListView()`.
   - Scroll the right list and verify `_coverWearScrollListener` loads subsequent pages seamlessly.
3. **Conveyor Information Hub**:
   - Navigate to Conveyor details screen for conveyor with Cover Wear events.
   - Tap the `Cover Wear` card (`label: 'coverWearCard'`).
   - Verify navigation to `CoverWearListPage` with `conveyorId: widget.conveyorId`.
   - Verify the list is strictly scoped to events belonging to that specific conveyor.

---

## 🔍 Expected Results
- Navigation paths work reliably across phone, tablet split view, and conveyor hub.

---

## 📱 Flutter Source Reference
- **Home Screen**: `lib/src/ui/screens/home/home_screen.dart` (`coverWearCard`, `coverWearListView()`)
- **Conveyor Hub**: `lib/src/ui/screens/conveyors/conveyor_information_screen.dart` (`coverWearCard`)
- **Route Key**: `RouteNameKeys.coverWearListScreen`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/coverweardata.csv @Key:coverwear_navigation @regression @both
Scenario: Navigate to Cover Wear from Dashboard and Conveyor Hub
  Given the user is logged into the mobile application
  When the user taps the Cover Wear card on the dashboard
  Then the Cover Wear list page should open
  When the user returns to dashboard and navigates to conveyor "<ConveyorName>"
  And taps the Cover Wear card in conveyor hub
  Then the Cover Wear list should open filtered for conveyor "<ConveyorName>"
```
