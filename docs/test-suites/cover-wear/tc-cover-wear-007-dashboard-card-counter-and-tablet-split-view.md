# TC-COVER-WEAR-007: Dashboard Card Counter & Tablet Split View

> **Suite**: `cover-wear` | **Priority**: `Medium` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/screens/home/home_screen.dart` (`coverWearCard`)

---

## 🎯 Objective
Verify that the Cover Wear card on the Home/Dashboard displays the live count of active cover wear events, handles selection highlight in tablet split view, and reloads the preview pane when tapped.

---

## 📋 Preconditions
- User is on the Dashboard screen.

---

## 🧪 Test Steps
1. Locate the Cover Wear card on the Dashboard (`label: 'coverWearCard'`).
2. Verify that the card title displays `AppLocalizations.of(context)!.coverWear` ("Cover Wear").
3. Verify that the card icon matches `ContiPlusIcon.coverWear_24x24`.
4. Verify that the counter badge displays `state.totalCount.toString()`.
5. On a tablet device:
   - Tap the Cover Wear card.
   - Verify `selectedListType = ListType.coverWear` and `isSelected: true` updates card styling.
   - Verify the right split pane displays `coverWearListView()`.
   - Scroll through the right pane and verify pagination triggers without losing selection.

---

## 🔍 Expected Results
- Dashboard card renders reactive counter and title.
- Tablet split view coordinates list presentation seamlessly.

---

## 📱 Flutter Source Reference
- **Dashboard Screen**: `lib/src/ui/screens/home/home_screen.dart` (`coverWearCard`, `coverWearListView()`)
- **BLoC**: `CoverWearListBloc` (`state.totalCount`)

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/coverweardata.csv @Key:coverwear_dashboard_card @regression @both
Scenario: Verify Cover Wear dashboard card counter and tablet split view
  Given the user is on the dashboard
  Then the Cover Wear card should display title "Cover Wear"
  And the card counter should display "<ExpectedTotalCount>"
  When the user taps the card on a tablet
  Then the right pane should load the Cover Wear event list
```
