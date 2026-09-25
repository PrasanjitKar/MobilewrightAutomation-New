# TC-MINUTEMAN-011: Empty State When No Calculations Found

> **Suite**: `minuteman-calculation` | **Priority**: `Medium` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/screens/minuteman/minuteman_list_screen.dart` (`if (listItems.isEmpty)`)

---

## 🎯 Objective
Verify that `MinutemanListScreen` gracefully displays the empty state message (`AppLocalizations.of(context)!.noResultsFound` -> "No results found") when no calculation records exist in the database or match current search/filter criteria.

---

## 📋 Preconditions
- User is on the Minuteman calculation list screen.

---

## 🧪 Test Steps
1. Tap the search icon in the AppBar.
2. Enter an unmatchable search string (e.g., "XYZ999NONEXISTENT").
3. Observe the list viewport.
4. Verify that the empty message `Center(child: Text(AppLocalizations.of(context)!.noResultsFound))` is rendered.
5. Verify that the bottom counter widget displays `0`.
6. Clear the search and apply a filter combination that yields 0 matching records.
7. Verify that the same localized empty state is displayed consistently.

---

## 🔍 Expected Results
- "No results found" is centered on the screen when `listItems.isEmpty` is true.
- No app crashes or infinite spinners occur.

---

## 📱 Flutter Source Reference
- **Screen**: `lib/src/ui/screens/minuteman/minuteman_list_screen.dart` (`if (listItems.isEmpty) Center(child: Text(AppLocalizations.of(context)!.noResultsFound))`)
- **i18n Key**: `AppLocalizations.of(context)!.noResultsFound`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/minutemandata.csv @Key:minuteman_empty_state @regression @both
Scenario: Display empty state message when no calculation matches search
  Given the user is on the Minuteman calculation list screen
  When the user enters an unmatchable search query "NonExistentCalc12345"
  Then the message "No results found" should be centered on the screen
  And the bottom calculation count should be "0"
```
