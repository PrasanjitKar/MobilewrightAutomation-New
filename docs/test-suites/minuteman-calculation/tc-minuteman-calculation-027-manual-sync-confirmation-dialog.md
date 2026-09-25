# TC-MINUTEMAN-027: Manual Sync with Confirmation Dialog

> **Suite**: `minuteman-calculation` | **Priority**: `High` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/screens/minuteman/minuteman_list_screen.dart` (`Icons.sync`)

---

## 🎯 Objective
Verify that tapping the sync icon in the AppBar displays the confirmation dialog (`AlertDialog`), and confirming with "OK" dispatches `MinutemanListLoadEvent(hardRefresh: true)` to force a complete server refresh, while "Cancel" dismisses the dialog.

---

## 📋 Preconditions
- User is on the Minuteman calculation list screen.
- User is a standard/permitted user (not free user).

---

## 🧪 Test Steps
1. Locate the sync icon button (`Icons.sync`) in the AppBar.
2. Verify that while loading, the icon color is `Colors.grey`, and when idle, it is `Colors.black`.
3. Tap the sync icon.
4. Verify that Firebase Analytics logs `description: 'Tapped sync button from Minuteman list'`.
5. Verify that `showDialog<dynamic>` displays an `AlertDialog` containing:
   - Body text: `AppLocalizations.of(context)!.syncConfirmation`
   - Actions: `OK` button and `Cancel` button.
6. **Cancel Flow**:
   - Tap `Cancel`.
   - Verify Firebase Analytics logs `description: 'Clicked cancel button from Minuteman sync popup'`.
   - Verify dialog closes without triggering sync.
7. **OK Flow**:
   - Tap sync icon again and tap `OK`.
   - Verify Firebase Analytics logs `description: 'Clicked ok button from Minuteman sync popup'`.
   - Verify dialog closes.
   - Verify `minuteManBloc.add(const MinutemanListLoadEvent(hardRefresh: true))` is dispatched.
   - Verify linear progress indicator displays during the hard sync.

---

## 🔍 Expected Results
- Sync confirmation modal prevents accidental data synchronization.
- OK triggers complete `hardRefresh: true` SDK synchronization.

---

## 📱 Flutter Source Reference
- **List Screen**: `lib/src/ui/screens/minuteman/minuteman_list_screen.dart` (`Icons.sync`, `showDialog(AlertDialog)`)
- **i18n Keys**: `AppLocalizations.of(context)!.syncConfirmation`, `ok`, `cancel`
- **BLoC Event**: `MinutemanListLoadEvent(hardRefresh: true)`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/minutemandata.csv @Key:minuteman_manual_sync @regression @both
Scenario: Trigger manual synchronization from Minuteman calculation list
  Given the user is on the Minuteman calculation list screen
  When the user taps the sync button in the AppBar
  Then a sync confirmation dialog should be displayed
  When the user taps "Cancel" in the dialog
  Then the dialog should close without syncing
  When the user taps sync button and confirms with "OK"
  Then a hard refresh of Minuteman calculations should be initiated
```
