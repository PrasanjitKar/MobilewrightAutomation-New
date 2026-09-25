# TC-COVER-WEAR-032: Delete Event Confirmation Flow & Cascading Removal

> **Suite**: `cover-wear` | **Priority**: `High` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/features/coverwear/presentation/pages/coverwear_list_page.dart` (`_showDeleteConfirmationDialog`)

---

## 🎯 Objective
Verify the deletion workflow of a Cover Wear event from the options menu, confirming modal warning prompt, user cancellation, successful deletion, local cache purge, and remote synchronization.

---

## 📋 Preconditions
- User has `BasicModule.coverWear` with `delete` permission.
- Cover Wear event exists.

---

## 🧪 Test Steps
1. On `CoverWearListPage` or `CoverWearViewScreen`, open the overflow options menu and select `Delete`.
2. Verify `ContiAlertDialog` displays with warning: "Are you sure you want to delete this Cover Wear event and all its measurement readings?".
3. Tap **Cancel** button.
4. Verify dialog closes and event remains intact in the list.
5. Tap `Delete` again and tap **Confirm Delete**.
6. Verify `CoverWearListBloc` emits `CoverWearDeleteEvent` and shows loading indicator.
7. Verify event is removed from local SQLite/Hive database and remote backend.
8. Verify a success snackbar "Cover Wear event deleted successfully" is displayed.

---

## 🔍 Expected Results
- Event and all associated readings and photos are safely deleted upon user confirmation.

---

## 📱 Flutter Source Reference
- **Delete Dialog**: `lib/src/features/coverwear/presentation/pages/coverwear_list_page.dart` (`_showDeleteConfirmationDialog`)
- **BLoC**: `lib/src/features/coverwear/presentation/bloc/coverwear_list/coverwear_list_bloc.dart` (`CoverWearDeleteEvent`)

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/coverweardata.csv @Key:coverwear_delete @regression @both
Scenario: Delete a Cover Wear event with confirmation
  Given the user selects delete on a Cover Wear event
  When the confirmation dialog appears and user cancels
  Then the event should not be deleted
  When the user confirms deletion
  Then the event should be removed from the list and database
```
