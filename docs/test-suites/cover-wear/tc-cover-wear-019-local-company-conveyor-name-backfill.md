# TC-COVER-WEAR-019: Company & Conveyor Name Local Backfilling

> **Suite**: `cover-wear` | **Priority**: `Low` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/features/coverwear/presentation/widgets/cover_wear_row.dart` (`_maybeBackfillLocalNames`)

---

## 🎯 Objective
Verify that `CoverWearRow` uses a post-frame callback (`_maybeBackfillLocalNames`) to dispatch `CoverWearLocalNamesBackfillEvent` when company or conveyor names are missing in local storage, resolving and persisting names once `CompanyDataCubit` and `ConveyorDataCubit` load.

---

## 📋 Preconditions
- Cover Wear event in local cache has blank `companyName` or `conveyorName`.

---

## 🧪 Test Steps
1. Navigate to `CoverWearListPage`.
2. Observe row rendering for an event with unpopulated local names.
3. Observe that `CompanyDataCubit` and `ConveyorDataCubit` resolve the company and conveyor names in the UI.
4. Verify that `_maybeBackfillLocalNames` schedules a post-frame callback and dispatches `CoverWearLocalNamesBackfillEvent(ultrasonicId: ..., companyName: ..., conveyorName: ...)`.
5. Verify that `CoverWearListBloc` saves the resolved names to local Hive/SQLite storage via `UpdateCoverWearLocalNamesUseCase`.
6. Restart the app in offline mode and verify that the row immediately displays the persisted company and conveyor names without needing live cubit resolution.

---

## 🔍 Expected Results
- Local names are automatically healed and backfilled to prevent future offline display degradation.

---

## 📱 Flutter Source Reference
- **Widget**: `lib/src/features/coverwear/presentation/widgets/cover_wear_row.dart` (`_maybeBackfillLocalNames`)
- **BLoC Event**: `CoverWearLocalNamesBackfillEvent`
- **Use Case**: `UpdateCoverWearLocalNamesUseCase`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/coverweardata.csv @Key:coverwear_name_backfill @regression @both
Scenario: Auto-backfill missing company and conveyor names in local storage
  Given a cover wear event exists locally without saved company and conveyor names
  When the Cover Wear list page loads and cubits resolve the names
  Then a backfill event should be dispatched
  And the resolved names should be saved to local storage
```
