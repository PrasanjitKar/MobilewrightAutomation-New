# TC-COVER-WEAR-026: Filter Red Dot Indicator Badge & Clear Reset

> **Suite**: `cover-wear` | **Priority**: `Medium` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/features/coverwear/presentation/pages/coverwear_list_page.dart` (`_hasAppliedFilters`)

---

## 🎯 Objective
Verify that a red badge dot (`CircleAvatar(backgroundColor: Colors.red, radius: 5)`) is displayed on the AppBar filter icon when non-default filters or sorting are applied, and disappears when filters are cleared.

---

## 📋 Preconditions
- User is on `CoverWearListPage` with default filters.

---

## 🧪 Test Steps
1. Inspect the AppBar filter icon.
2. Verify that no red dot badge is visible (`_hasAppliedFilters` is false).
3. Open `CoverWearFilterModal`, select a Site filter, and apply.
4. Verify that `_hasAppliedFilters` evaluates to true.
5. Verify that a red dot indicator appears on top of the filter icon.
6. Reopen filter modal and tap `Clear Filters`.
7. Verify all options reset to default (Sort: Last Modified, Site: empty, Conveyor: empty).
8. Tap Apply and verify that the red badge indicator is removed.

---

## 🔍 Expected Results
- Filter badge accurately signals active filtering state.

---

## 📱 Flutter Source Reference
- **Filter Indicator**: `lib/src/features/coverwear/presentation/pages/coverwear_list_page.dart` (`_hasAppliedFilters`)
- **Filter Reset**: `lib/src/features/coverwear/presentation/widgets/coverwear_filter_modal.dart` (`_clearFilters`)

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/coverweardata.csv @Key:coverwear_filter_badge @regression @both
Scenario: Verify filter indicator badge and clear filters reset
  Given the user is on the Cover Wear list page with default filters
  Then the filter icon should not display a red badge
  When the user applies a site filter
  Then the filter icon should display a red badge
  When the user clears all filters
  Then the red badge should disappear
```
