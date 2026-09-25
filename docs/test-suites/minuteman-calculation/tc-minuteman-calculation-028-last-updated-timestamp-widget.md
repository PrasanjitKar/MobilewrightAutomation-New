# TC-MINUTEMAN-028: Last Updated Timestamp & Total Count Widget

> **Suite**: `minuteman-calculation` | **Priority**: `Low` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/screens/minuteman/minuteman_list_screen.dart` (`LastUpdatedTimeAndTotalCountWidget`)

---

## 🎯 Objective
Verify that the bottom metadata widget `LastUpdatedTimeAndTotalCountWidget` renders the exact calculation list length and formats the sync epoch timestamp into a localized readable date/time string.

---

## 📋 Preconditions
- User is on the Minuteman calculation list screen.
- Sync timestamp stored in SDK/Hive cache.

---

## 🧪 Test Steps
1. Navigate to the Minuteman calculation list screen.
2. Scroll to the bottom and locate `LastUpdatedTimeAndTotalCountWidget`.
3. Verify parameter `module: 'Minuteman'`.
4. Verify `listLength` matches `listItems.length`.
5. Verify `lastUpdatedTime` renders formatted string: e.g., `Last synchronized 12 Sep 2024, 10:45 AM`.
6. Apply a filter that reduces items to 2 calculations.
7. Verify the widget count updates reactively to show `2`.
8. Clear filters and verify count returns to full total.

---

## 🔍 Expected Results
- Total count and timestamp update reactively as list contents change.

---

## 📱 Flutter Source Reference
- **Widget**: `lib/src/ui/widgets/last_updated_time_and_total_count_widget.dart`
- **Usage**: `lib/src/ui/screens/minuteman/minuteman_list_screen.dart` (`LastUpdatedTimeAndTotalCountWidget(listLength: listItems.length, lastUpdatedTime: state.lastUpdatedTime, module: 'Minuteman')`)

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/minutemandata.csv @Key:minuteman_bottom_metadata @regression @both
Scenario: Verify last updated time and total count widget on Minuteman list
  Given the user is on the Minuteman calculation list screen
  Then the bottom metadata bar should display the total calculation count
  And the last synchronized timestamp should be formatted correctly
  When a filter is applied reducing results to "<FilteredCount>"
  Then the bottom count should update to display "<FilteredCount>"
```
