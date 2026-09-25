# TC-COVER-WEAR-006: Granular Permission Gating (CRUD + Download)

> **Suite**: `cover-wear` | **Priority**: `Critical` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/features/coverwear/presentation/bloc/coverwear_event_form/cover_wear_cubit.dart` & `lib/src/features/coverwear/presentation/pages/coverwear_list_page.dart`

---

## 🎯 Objective
Verify granular enforcement of CRUD and Download permissions for `BasicModule.coverWear`: `Permission.view`, `Permission.add`, `Permission.edit`, `Permission.delete`, and `Permission.download`.

---

## 📋 Preconditions
- User roles configured for testing granular permission matrices.

---

## 🧪 Test Steps
1. **View Permission Denied**:
   - Login as a user without `Permission.view`.
   - Verify Cover Wear card is not rendered on Home / Conveyor Hub.
   - Verify direct navigation returns empty/blocked view.
2. **Add Permission**:
   - Login as user with `view` but without `Permission.add`.
   - Verify Floating Action Button (FAB) on `CoverWearListPage` is NOT displayed (`_canAddModule` returns false).
3. **Edit Permission**:
   - Login as user without `Permission.edit`.
   - Open `CoverWearViewScreen` and verify the "Edit" primary action button in bottom bar is hidden (`showPrimaryButton: _coverWearCubit.canEditCoverWear`).
4. **Delete Permission**:
   - Login as user without `Permission.delete`.
   - Open `CoverWearViewScreen` and verify the AppBar popup menu (containing "Delete") is NOT rendered.
5. **Download Permission**:
   - Login as user without `Permission.download`.
   - Open PDF preview in `FilePreviewScreen` and verify the download icon is hidden.

---

## 🔍 Expected Results
- All UI actions (FAB, Edit button, Delete menu, PDF download) are strictly bound to their respective permissions.

---

## 📱 Flutter Source Reference
- **Permission Getters**: `lib/src/features/coverwear/presentation/bloc/coverwear_event_form/cover_wear_cubit.dart` (`canAddCoverWear`, `canEditCoverWear`, `canViewCoverWear`, `canDeleteCoverWear`)
- **FAB Gating**: `lib/src/features/coverwear/presentation/pages/coverwear_list_page.dart` (`_canAddModule`)
- **Module**: `BasicModule.coverWear`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/coverweardata.csv @Key:coverwear_permission_gating @regression @both
Scenario Outline: Verify granular permission enforcement on Cover Wear
  Given the user is logged in with "<CoverWearPermission>" on Cover Wear
  When the user accesses the Cover Wear module
  Then the action "<ActionElement>" should be "<ExpectedVisibility>"

  Examples:
    | CoverWearPermission | ActionElement       | ExpectedVisibility |
    | View_Only           | Floating Action FAB | Hidden             |
    | View_Add            | Floating Action FAB | Visible            |
    | View_No_Edit        | Edit Button in View | Hidden             |
    | View_No_Delete      | Delete Popup Menu   | Hidden             |
    | View_No_Download    | PDF Download Icon   | Hidden             |
```
