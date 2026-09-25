# TC-COVER-WEAR-013: Empty State When No Records Found

> **Suite**: `cover-wear` | **Priority**: `Medium` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/features/coverwear/presentation/pages/coverwear_list_page.dart`

---

## 🎯 Objective
Verify that `CoverWearListPage` displays an empty state or empty list message when no cover wear event records exist or match current search/filter criteria.

---

## 📋 Preconditions
- User is on `CoverWearListPage`.

---

## 🧪 Test Steps
1. Tap search and enter an unmatchable query "ZZZNONEXISTENT123".
2. Wait 500ms for debounced search to execute.
3. Verify that `state.items` is empty (`items.isEmpty`).
4. Verify that the list renders 0 items without exceptions.
5. Verify that the bottom metadata widget displays `Total: 0`.
6. Clear search and verify the list returns to normal.

---

## 🔍 Expected Results
- Empty list is handled cleanly with zero item count and no crashes.

---

## 📱 Flutter Source Reference
- **List Page**: `lib/src/features/coverwear/presentation/pages/coverwear_list_page.dart` (`_buildList`, `state.items.length`)

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/coverweardata.csv @Key:coverwear_empty_state @regression @both
Scenario: Display empty state for unmatchable Cover Wear search
  Given the user is on the Cover Wear list page
  When the user searches for an unmatchable query "NonExistentCoverWear999"
  Then no cover wear events should be displayed in the list
  And the bottom counter should display "0"
```
