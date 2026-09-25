# TC-MINUTEMAN-010: Search Clear & Dismiss

> **Suite**: `minuteman-calculation` | **Priority**: `Low` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/screens/minuteman/minuteman_list_screen.dart` (`suffixIcon`)

---

## 🎯 Objective
Verify that tapping the clear/close icon (`Icons.close`) on the active search bar clears the entered search query, dismisses the search bar overlay, and restores the complete or active filter-scoped calculation list.

---

## 📋 Preconditions
- User is on the Minuteman calculation list screen with an active search query applied.

---

## 🧪 Test Steps
1. Tap the search icon and enter query "Primary" to filter the calculation list.
2. Verify filtered results are displayed.
3. Tap the suffix close button (`IconButton(icon: Icon(Icons.close))`).
4. Observe that:
   - `searching` boolean state is set to `false`.
   - `_searchCtrl.text` is cleared (`''`).
   - `MinuteManSearchEvent(search: '')` is dispatched to `MinutemanListBloc`.
   - Search bar overlay collapses.
   - The full list of calculations (or active filter list) is restored immediately.

---

## 🔍 Expected Results
- Search bar dismisses cleanly and restores the underlying list without requiring a full reload.

---

## 📱 Flutter Source Reference
- **Screen**: `lib/src/ui/screens/minuteman/minuteman_list_screen.dart` (`suffixIcon: IconButton(...)`)
- **Event**: `MinuteManSearchEvent(search: '')`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/minutemandata.csv @Key:minuteman_search_clear @regression @both
Scenario: Clear and dismiss search bar in Minuteman calculation list
  Given the user has applied a search query "Primary" on the Minuteman calculation list
  When the user taps the close icon in the search bar
  Then the search bar should be dismissed
  And the search input should be cleared
  And the full calculation list should be restored
```
