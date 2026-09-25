# TC-COVER-WEAR-012: Search Clear & Dismissal

> **Suite**: `cover-wear` | **Priority**: `Low` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/features/coverwear/presentation/pages/coverwear_list_page.dart` (`cancelSearch`)

---

## 🎯 Objective
Verify that tapping the close icon (`Icons.close`) on the search bar clears the search input, dismisses the search bar overlay, and restores the unfiltered or active filter-scoped list.

---

## 📋 Preconditions
- User is on `CoverWearListPage` with an active search query applied.

---

## 🧪 Test Steps
1. Perform a search for keyword "Conveyor 1".
2. Verify filtered search results are displayed.
3. Tap the close icon (`IconButton(icon: Icon(Icons.close))`) in the search bar.
4. Verify `cancelSearch(context)` executes:
   - Cancels pending debounce timer.
   - Sets `searching = false`.
   - Clears `_searchCtrl.text`.
   - Dispatches `CoverWearListLoadEvent(query: CoverWearListQuery(searchText: null))`.
5. Verify that the full calculation list is restored.

---

## 🔍 Expected Results
- Search bar dismisses cleanly and underlying list resets immediately.

---

## 📱 Flutter Source Reference
- **Method**: `lib/src/features/coverwear/presentation/pages/coverwear_list_page.dart` (`cancelSearch`)

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/coverweardata.csv @Key:coverwear_search_dismiss @regression @both
Scenario: Clear and dismiss Cover Wear search bar
  Given the user has applied a search query on the Cover Wear list
  When the user taps the close icon in the search bar
  Then the search bar should be closed
  And the full Cover Wear list should be restored
```
