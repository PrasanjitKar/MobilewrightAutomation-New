# TC-COVER-WEAR-025: Filter Sorting (Last Modified, A-Z, Z-A)

> **Suite**: `cover-wear` | **Priority**: `Medium` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/features/coverwear/presentation/widgets/coverwear_filter_modal.dart` & `CoverWearSortBy`

---

## 🎯 Objective
Verify sorting Cover Wear events by Last Modified (`CoverWearSortBy.lastModified`), A-Z (`CoverWearSortBy.aToZ`), and Z-A (`CoverWearSortBy.zToA`).

---

## 📋 Preconditions
- Multiple Cover Wear events exist with varied timestamps and conveyor names.

---

## 🧪 Test Steps
1. **Sort by Last Modified**:
   - Open filter modal, choose `Last Modified`, and tap Apply.
   - Verify events are sorted chronologically by `updatedDate` descending.
2. **Sort by A-Z**:
   - Open filter modal, choose `A-Z`, and tap Apply.
   - Verify events are sorted alphabetically ascending by conveyor name.
3. **Sort by Z-A**:
   - Open filter modal, choose `Z-A`, and tap Apply.
   - Verify events are sorted alphabetically descending by conveyor name.

---

## 🔍 Expected Results
- Sorting orders the list accurately according to the selected criterion.

---

## 📱 Flutter Source Reference
- **Enum**: `lib/src/features/coverwear/domain/repositories/cover_wear_repository.dart` (`CoverWearSortBy`)
- **Filter Modal**: `lib/src/features/coverwear/presentation/widgets/coverwear_filter_modal.dart`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/coverweardata.csv @Key:coverwear_sort @regression @both
Scenario Outline: Sort Cover Wear events by different criteria
  Given the user is on the Cover Wear list page
  When the user opens the filter modal and selects sort "<SortOption>"
  And taps Apply
  Then the events should be ordered by "<SortOption>"

  Examples:
    | SortOption    |
    | Last Modified |
    | A-Z           |
    | Z-A           |
```
