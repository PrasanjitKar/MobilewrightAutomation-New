# TC-COVER-WEAR-009: Floating Action Button (FAB) Visibility & Action

> **Suite**: `cover-wear` | **Priority**: `Medium` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/features/coverwear/presentation/pages/coverwear_list_page.dart` (`_buildFAB`)

---

## 🎯 Objective
Verify that the Floating Action Button (FAB) on `CoverWearListPage` is rendered when the user has `Permission.add`, and tapping it opens `CoverWearAddScreen` with pre-populated `conveyorId` if scoped.

---

## 📋 Preconditions
- User has `Permission.add` on `BasicModule.coverWear`.

---

## 🧪 Test Steps
1. Navigate to `CoverWearListPage`.
2. Verify that the yellow FAB button (`ContiplusColors.continentalYellow`) with `ContiPlusIcon.add` icon is visible at the bottom right.
3. Tap the FAB button.
4. Verify navigation to `CoverWearAddScreen`.
5. If navigating from conveyor hub with `conveyorId`, verify that `CoverWearAddScreen` opens with the target conveyor pre-selected and locked (`isSiteConveyorLocked: true`).
6. Tap back from add screen and verify that `_coverWearListBloc` reloads the list upon return.

---

## 🔍 Expected Results
- FAB button opens the add screen with correct context and refreshes list on return.

---

## 📱 Flutter Source Reference
- **List Page**: `lib/src/features/coverwear/presentation/pages/coverwear_list_page.dart` (`_buildFAB`, `_canAddModule`)
- **Add Screen**: `lib/src/features/coverwear/presentation/pages/cover_wear_add_screen.dart` (`CoverWearAddScreen`)

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/coverweardata.csv @Key:coverwear_fab_add @regression @both
Scenario: Open Add Cover Wear screen via Floating Action Button
  Given the user is on the Cover Wear list page with add permissions
  When the user taps the yellow Floating Action Button
  Then the Add Cover Wear screen should open
  When the user navigates back to the list
  Then the Cover Wear list should reload
```
