# TC-DASHBOARD-036: Bottom Nav — Tools Tab Navigation

> **Suite**: `dashboard` | **Priority**: `High` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/app.dart` (`_buildBottomAppBar`, `toolsTab`) & `lib/src/ui/screens/tools/tools_screen.dart`

---

## 🎯 Objective
Verify tapping the Tools tab (`toolsTab`) in the bottom navigation bar switches `selectedPage` to index 3, renders `ToolsScreen`, and displays all available calculation and engineering tools (Capacity, Troughability, Roll Length, Safety Factor Calculator, Unit Converter, Belt Cycle Time, Wrap Angle, Digital Catalogues).

---

## 📋 Preconditions
- User is logged in.

---

## 🧪 Test Steps
1. On `HomeScreen`, locate the bottom navigation bar.
2. Tap the **Tools** icon (`toolsTab`).
3. Verify `AppBloc.add(AppLoadEvent(selectedPage: 3))` is dispatched.
4. Verify `ToolsScreen` is rendered in a grid layout.
5. Verify the following tool cards are visible:
   - Capacity
   - Troughability
   - Roll Length
   - Safety Factor Calculator
   - Unit Converter
   - Belt Cycle Time
   - Wrap Angle
   - Digital Catalogues
6. Verify the Tools icon is highlighted as active in the bottom navigation bar.

---

## 🔍 Expected Results
- Tools overview screen displays all engineering calculator cards with active tab state indicated.

---

## 📱 Flutter Source Reference
- **Bottom Navigation**: `lib/src/ui/app.dart` (`_buildBottomAppBar`, `toolsTab`)
- **Screen**: `lib/src/ui/screens/tools/tools_screen.dart`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/dashboarddata.csv @Key:dashboard_bottom_nav_tools @regression @both
Scenario: Navigate to Tools tab via bottom navigation bar
  Given the user is on the Home dashboard screen
  When the user taps the Tools icon in the bottom navigation bar
  Then the Tools screen should be displayed with all engineering calculator cards
  And the Tools icon should be highlighted as active
```
