# TC-MINUTEMAN-008: Free User Action Suppression

> **Suite**: `minuteman-calculation` | **Priority**: `Medium` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/screens/minuteman/minuteman_list_screen.dart` (`isFreeUser`)

---

## 🎯 Objective
Verify that when a free user (`isFreeUser == true`) navigates to `MinutemanListScreen`, all top AppBar action icons (search, filter, sync, profile avatar) are completely hidden, providing a clean read-only calculation view.

---

## 📋 Preconditions
- User is logged in with a Free / Demo account role (`isFreeUser: true`).
- Free user has read-only access to view calculations.

---

## 🧪 Test Steps
1. Authenticate with a Free user account.
2. Navigate to the Minuteman Calculation list screen.
3. Inspect the AppBar action bar.
4. Verify that:
   - Search icon (`Icons.search`) is NOT present.
   - Filter icon (`assets/svg/filter_icon.svg`) is NOT present.
   - Sync icon (`Icons.sync`) is NOT present.
   - Profile avatar icon is NOT present.
5. Verify the calculation list still displays accessible items in read-only mode.
6. Verify pulling down to refresh is available or tapping an item still permits viewing report.

---

## 🔍 Expected Results
- `actions: widget.isFreeUser ?? false ? [] : [...]` evaluates to an empty list.
- Free user interface is streamlined without search/filter/sync controls.

---

## 📱 Flutter Source Reference
- **List Screen**: `lib/src/ui/screens/minuteman/minuteman_list_screen.dart` (`actions: widget.isFreeUser ?? false ? [] : [...]`)

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/minutemandata.csv @Key:minuteman_free_user_actions @regression @both
Scenario: Verify action suppression on Minuteman list for Free users
  Given the user is logged in with a Free User account
  When the user navigates to the Minuteman calculation list
  Then the search icon should not be visible in the AppBar
  And the filter icon should not be visible in the AppBar
  And the sync icon should not be visible in the AppBar
  And the profile avatar should not be visible in the AppBar
```
