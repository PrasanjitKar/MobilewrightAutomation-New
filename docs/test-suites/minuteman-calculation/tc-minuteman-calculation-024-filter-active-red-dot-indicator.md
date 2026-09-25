# TC-MINUTEMAN-024: Active Filter Red Dot Indicator Badge

> **Suite**: `minuteman-calculation` | **Priority**: `Low` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/screens/minuteman/minuteman_list_screen.dart` (`state.filters.hasFilters`)

---

## 🎯 Objective
Verify that an active filter indicator badge (a small red dot `CircleAvatar(backgroundColor: ContiplusColors.continentalLightRed, radius: 5)`) appears on the AppBar filter icon when any non-default filter or sort is active, and disappears when filters are cleared.

---

## 📋 Preconditions
- User is on the Minuteman calculation list screen with default filters (`MinutemanFilters()`).

---

## 🧪 Test Steps
1. Inspect the filter icon in the AppBar.
2. Verify that no red dot indicator is visible (`state.filters.hasFilters == false`).
3. Open the filter modal, select a Site, and apply.
4. Verify that `state.filters.hasFilters` evaluates to `true`.
5. Verify that the red circle indicator (`CircleAvatar`, `radius: 5`, `color: continentalLightRed`) is displayed at the top right of the filter icon.
6. Open filter modal, change sort to `A-Z`, and apply. Verify red dot remains visible.
7. Open filter modal, tap `Clear Filters`, and apply.
8. Verify that the red dot disappears completely (`SizedBox.shrink()`).

---

## 🔍 Expected Results
- Red dot badge accurately reflects whether custom filters or sorting options deviate from default.

---

## 📱 Flutter Source Reference
- **Screen**: `lib/src/ui/screens/minuteman/minuteman_list_screen.dart` (`if (state.filters.hasFilters) ...`)
- **Color**: `ContiplusColors.continentalLightRed`
- **Filter Property**: `MinutemanFilters.hasFilters`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/minutemandata.csv @Key:minuteman_filter_badge @regression @both
Scenario: Verify red dot indicator badge for active Minuteman filters
  Given the user is on the Minuteman calculation list screen with default filters
  Then the filter icon should not display an active indicator badge
  When the user opens filter modal and applies site filter "<SiteName>"
  Then the filter icon should display a red dot badge
  When the user clears all filters
  Then the filter icon should no longer display the badge
```
