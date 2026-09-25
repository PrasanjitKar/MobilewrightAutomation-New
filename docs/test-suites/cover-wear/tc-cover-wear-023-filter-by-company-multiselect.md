# TC-COVER-WEAR-023: Filter by Company / Site Multi-Select

> **Suite**: `cover-wear` | **Priority**: `High` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/features/coverwear/presentation/widgets/coverwear_filter_modal.dart` (`_setCompany`)

---

## 🎯 Objective
Verify filtering Cover Wear events by one or multiple Customer Sites using the multi-select dropdown in `CoverWearFilterModal`.

---

## 📋 Preconditions
- Events exist across multiple customer sites.

---

## 🧪 Test Steps
1. Open `CoverWearFilterModal`.
2. Tap the Site multi-select dropdown.
3. Select Site "Eagle Mine".
4. Observe the result counter in the modal header updating.
5. Tap Save/Apply.
6. Verify that `CoverWearListLoadEvent` is dispatched with `companyIds: [eagleMineId]`.
7. Verify that all displayed event rows belong to "Eagle Mine".
8. Reopen filter modal, select an additional site "Falcon Quarry", and apply.
9. Verify that events from both "Eagle Mine" and "Falcon Quarry" are displayed.

---

## 🔍 Expected Results
- Events are strictly filtered by selected site IDs.

---

## 📱 Flutter Source Reference
- **Filter Modal**: `lib/src/features/coverwear/presentation/widgets/coverwear_filter_modal.dart` (`_setCompany`)
- **Repository Filter**: `CoverWearListQuery.filters['companyIds']`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/coverweardata.csv @Key:coverwear_filter_site @regression @both
Scenario: Filter Cover Wear events by site
  Given the user is on the Cover Wear list page
  When the user opens the filter modal
  And selects sites "Eagle Mine, Falcon Quarry"
  And taps Apply
  Then only events belonging to "Eagle Mine" or "Falcon Quarry" should be displayed
```
