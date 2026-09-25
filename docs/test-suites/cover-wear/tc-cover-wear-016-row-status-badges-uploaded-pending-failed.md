# TC-COVER-WEAR-016: Status Badges (Uploaded, Pending, Failed)

> **Suite**: `cover-wear` | **Priority**: `High` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/features/coverwear/presentation/widgets/cover_wear_row.dart` (`_buildStatus`)

---

## 🎯 Objective
Verify that `CoverWearRow` displays distinct status badge pills based on synchronization state: Uploaded (light green), Upload Pending (cream), and Upload Failed (light red).

---

## 📋 Preconditions
- List contains events in synced, pending, and failed upload states.

---

## 🧪 Test Steps
1. Navigate to `CoverWearListPage`.
2. Locate a synced event (`!isFailed && !isPending`).
   - Verify badge displays text `AppLocalizations.of(context)!.uploaded` ("Uploaded").
   - Verify badge background is `ContiplusColors.continentalLightGreen.withValues(alpha: 0.2)`.
3. Locate an offline-created or pending event (`isPending: true`).
   - Verify badge displays text `AppLocalizations.of(context)!.uploadPending` ("Upload Pending").
   - Verify badge background is `ContiplusColors.continentalCream`.
4. Locate an event where upload failed (`isFailed: true`).
   - Verify badge displays text `AppLocalizations.of(context)!.uploadFailed` ("Upload Failed").
   - Verify badge background is `ContiplusColors.continentalLightRed.withValues(alpha: 0.2)`.

---

## 🔍 Expected Results
- Status badges clearly communicate event cloud synchronization state.

---

## 📱 Flutter Source Reference
- **Widget**: `lib/src/features/coverwear/presentation/widgets/cover_wear_row.dart` (`_buildStatus`)
- **Colors**: `continentalLightGreen`, `continentalCream`, `continentalLightRed`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/coverweardata.csv @Key:coverwear_status_badges @regression @both
Scenario Outline: Verify Cover Wear status badges
  Given a cover wear event with status "<SyncStatus>"
  When the user views the event in the list
  Then the status badge should display "<ExpectedBadgeText>"
  And the badge color should match "<ExpectedColor>"

  Examples:
    | SyncStatus | ExpectedBadgeText | ExpectedColor |
    | Synced     | Uploaded          | Light Green   |
    | Pending    | Upload Pending    | Cream         |
    | Failed     | Upload Failed     | Light Red     |
```
