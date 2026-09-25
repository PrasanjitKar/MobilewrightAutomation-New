# TC-COVER-WEAR-017: Failed Upload Row Tint & Direct Retry Tap

> **Suite**: `cover-wear` | **Priority**: `High` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/features/coverwear/presentation/widgets/cover_wear_row.dart` (`ContinentalColors.uploadFailedRed`)

---

## 🎯 Objective
Verify that events in `isFailed: true` state have their entire row background tinted with light red (`ContinentalColors.uploadFailedRed`), render a retry refresh icon (`ContiPlusIcon.refresh_24x24`), and tapping the retry icon dispatches `CoverWearDataSyncEvent` specifically for that record.

---

## 📋 Preconditions
- At least one Cover Wear event has `isFailed: true` due to a simulated upload failure.

---

## 🧪 Test Steps
1. Navigate to `CoverWearListPage`.
2. Locate the failed upload event.
3. Verify that the row container background is `ContinentalColors.uploadFailedRed`.
4. Verify that the trailing widget displays `ContiPlusIcon.refresh_24x24`.
5. Tap on the refresh icon.
6. Verify that `CoverWearDataSyncEvent(postSyncLoad: CoverWearPostSyncLoad.none, ultrasonicId: coverWear.ultrasonicId)` is dispatched.
7. Verify that during sync, `state.processingUltrasonicIds` renders a `CircularProgressIndicator`.
8. Once sync succeeds, verify that the row returns to transparent background, the badge updates to "Uploaded", and gauge/PDF icons appear.

---

## 🔍 Expected Results
- Failed records are visibly distinct and can be retried directly with a single tap.

---

## 📱 Flutter Source Reference
- **Widget**: `lib/src/features/coverwear/presentation/widgets/cover_wear_row.dart` (`buildTrailingWidget`, `CoverWearDataSyncEvent`)
- **BLoC**: `CoverWearListBloc` (`on<CoverWearDataSyncEvent>`)

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/coverweardata.csv @Key:coverwear_failed_retry @regression @both
Scenario: Retry uploading a failed Cover Wear event directly from list
  Given a cover wear event with failed upload status is displayed in the list
  Then the event row background should be tinted red
  And a retry refresh icon should be displayed
  When the user taps the retry icon
  Then a sync process should be initiated for that event
  And upon success the event should display as Uploaded
```
