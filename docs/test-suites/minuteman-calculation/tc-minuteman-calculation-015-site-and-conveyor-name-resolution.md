# TC-MINUTEMAN-015: Dynamic Site & Conveyor Name Resolution

> **Suite**: `minuteman-calculation` | **Priority**: `Medium` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/screens/minuteman/widgets/minuteman_row.dart` (`CompanyDataCubit` & `ConveyorDataCubit`)

---

## 🎯 Objective
Verify that `MinutemanRow` dynamically resolves human-readable Site Names from `CompanyDataCubit.state.siteList` using `minutemanModel.siteId`, and Conveyor Names from `ConveyorDataCubit.state.conveyorFullList` using `minutemanModel.conveyorId`, falling back to `'-'` when unresolvable.

---

## 📋 Preconditions
- User is on the Minuteman calculation list screen.
- Company and Conveyor data cubits are loaded on screen initialization.

---

## 🧪 Test Steps
1. Navigate to the Minuteman calculation list screen.
2. Verify that `initState` calls `CompanyDataCubit.getCompanyList()` and `ConveyorDataCubit.getConveyorList()`.
3. Locate a calculation row with valid `siteId` and `conveyorId`.
4. Verify that `BlocBuilder<CompanyDataCubit, CompanyDataState>` resolves the correct site name from the company list.
5. Verify that `BlocBuilder<ConveyorDataCubit, ConveyorDataState>` resolves the correct conveyor name from the conveyor list.
6. Locate or simulate a calculation item with null/unmatched `siteId` or `conveyorId`.
7. Verify that the UI displays fallback dash `'-'` without throwing null pointer exceptions.

---

## 🔍 Expected Results
- Foreign key identifiers (`siteId`, `conveyorId`) correctly resolve to human-readable site and conveyor names in real time.
- Unmatched keys degrade gracefully to `'-'`.

---

## 📱 Flutter Source Reference
- **Widget**: `lib/src/ui/screens/minuteman/widgets/minuteman_row.dart` (`BlocBuilder<CompanyDataCubit, CompanyDataState>`, `BlocBuilder<ConveyorDataCubit, ConveyorDataState>`)
- **Init Cubits**: `lib/src/ui/screens/minuteman/minuteman_list_screen.dart` (`context.read<CompanyDataCubit>().getCompanyList()`)

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/minutemandata.csv @Key:minuteman_name_resolution @regression @both
Scenario: Verify dynamic site and conveyor name resolution in Minuteman rows
  Given the user is on the Minuteman calculation list screen
  When the calculation row is rendered for calculation "<CalculationName>"
  Then the site name should resolve to "<ExpectedSiteName>"
  And the conveyor name should resolve to "<ExpectedConveyorName>"
```
