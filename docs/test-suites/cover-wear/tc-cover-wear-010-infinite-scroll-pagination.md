# TC-COVER-WEAR-010: Infinite Scroll Pagination & Threshold Trigger

> **Suite**: `cover-wear` | **Priority**: `Medium` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/features/coverwear/presentation/pages/coverwear_list_page.dart` (`_onScroll`)

---

## 🎯 Objective
Verify that scrolling down `CoverWearListPage` triggers `CoverWearListLoadNextPageEvent` when remaining scroll distance reaches `<= 220px`, appending the next page of records and displaying a bottom loading spinner during pagination.

---

## 📋 Preconditions
- More than one page of Cover Wear records exists (e.g., 25+ events).

---

## 🧪 Test Steps
1. Open `CoverWearListPage`.
2. Verify initial page of items (e.g., 10 items) is rendered.
3. Scroll down towards the bottom of the list.
4. When remaining scroll extent <= 220px, observe that `_coverWearListBloc.add(const CoverWearListLoadNextPageEvent())` is dispatched.
5. Verify that `state.isPageLoading` displays a bottom `CircularProgressIndicator` during fetch.
6. Verify that newly loaded records are appended seamlessly to `state.items` without resetting scroll position.

---

## 🔍 Expected Results
- Smooth infinite scrolling without duplicate items or unexpected scroll jumps.

---

## 📱 Flutter Source Reference
- **Scroll Controller**: `lib/src/features/coverwear/presentation/pages/coverwear_list_page.dart` (`_onScroll`, `remaining <= threshold`)
- **BLoC Event**: `CoverWearListLoadNextPageEvent`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/coverweardata.csv @Key:coverwear_infinite_scroll @regression @both
Scenario: Paginate Cover Wear list via infinite scroll
  Given the user is on the Cover Wear list with multiple pages of records
  When the user scrolls down near the bottom of the list
  Then a loading spinner should appear at the bottom
  And the next page of cover wear events should be appended to the list
```
