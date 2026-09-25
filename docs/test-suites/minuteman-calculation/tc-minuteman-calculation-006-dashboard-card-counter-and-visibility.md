# TC-MINUTEMAN-006: Dashboard Card Counter & Visibility

> **Suite**: `minuteman-calculation` | **Priority**: `Medium` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/screens/home/home_screen.dart` (`minutemanCalculationCard`)

---

## 🎯 Objective
Verify that the Minuteman Calculation card on the Home/Dashboard screen displays the accurate count of accessible calculations matching `state.minutemanFullList.length`, displays the correct title and icon, and is hidden if the user lacks view permission.

---

## 📋 Preconditions
- User is logged in with access to Minuteman calculations.
- Known number of active calculations in database / Hive cache.

---

## 🧪 Test Steps
1. Navigate to Home / Dashboard screen.
2. Locate the Minuteman card with semantic label `minutemanCalculationCard`.
3. Verify the card title displays `AppLocalizations.of(context)!.minuteman` ("Minuteman Calc.").
4. Verify the card icon matches `assets/svg/minuteman.svg`.
5. Verify the counter badge displays the exact length of `state.minutemanFullList`.
6. Add or sync calculations, and verify that the counter updates reactively.
7. Switch to a user without Minuteman view permission and verify the card is not rendered on Dashboard.

---

## 🔍 Expected Results
- Dashboard card renders correctly with title, SVG icon, and reactive count badge.
- Visibility accurately mirrors `canViewMinuteman` state.

---

## 📱 Flutter Source Reference
- **Home Screen**: `lib/src/ui/screens/home/home_screen.dart` (`label: 'minutemanCalculationCard'`, `counter: state.minutemanFullList.length.toString()`)
- **BLoC State**: `MinutemanListState.minutemanFullList`
- **Icon**: `assets/svg/minuteman.svg`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/minutemandata.csv @Key:minuteman_dashboard_card @regression @both
Scenario: Verify Minuteman card counter and presentation on Dashboard
  Given the user is logged into the application
  When the user views the dashboard
  Then the Minuteman card should display title "Minuteman Calc."
  And the Minuteman card icon should be displayed
  And the card counter should display "<ExpectedTotalCount>"
```
