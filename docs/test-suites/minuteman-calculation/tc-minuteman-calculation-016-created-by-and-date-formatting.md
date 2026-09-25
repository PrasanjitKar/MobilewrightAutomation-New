# TC-MINUTEMAN-016: Creator Name & Created Date Formatting

> **Suite**: `minuteman-calculation` | **Priority**: `Low` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/screens/minuteman/widgets/minuteman_row.dart` (`minutemanModel.createdBy`, `createdDate`)

---

## 🎯 Objective
Verify that `MinutemanRow` properly formats and displays the creator's full name (`minutemanModel.createdBy?.fullName`) and formats the creation date as `d MMM yyyy` using `intl.DateFormat`, falling back cleanly to `'-'` when null.

---

## 📋 Preconditions
- User is on the Minuteman calculation list screen.
- Calculations exist with populated creator and timestamp fields, as well as null/empty fields for boundary testing.

---

## 🧪 Test Steps
1. Navigate to the Minuteman calculation list.
2. Locate a calculation item created on `2024-05-18T14:30:00Z` by user `John Doe`.
3. Verify that Creator Name is displayed as `John Doe`.
4. Verify that Created Date is formatted and displayed as `18 May 2024`.
5. Locate an item where `createdBy` is null and verify `'-'` is displayed.
6. Locate an item where `createdDate` is null and verify `'-'` is displayed.

---

## 🔍 Expected Results
- Dates are formatted cleanly according to international date standards (`d MMM yyyy`).
- Null attributes display fallback dash `'-'` without breaking layout.

---

## 📱 Flutter Source Reference
- **Widget**: `lib/src/ui/screens/minuteman/widgets/minuteman_row.dart` (`DateFormat('d MMM yyyy').format(minutemanModel.createdDate!)`)
- **Package**: `intl` (`DateFormat`)

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/minutemandata.csv @Key:minuteman_date_formatting @regression @both
Scenario: Verify creator full name and date formatting in calculation rows
  Given the user is on the Minuteman calculation list screen
  When the user views calculation row "<CalculationName>"
  Then the creator name should display "<ExpectedCreatorName>"
  And the creation date should display "<ExpectedFormattedDate>"
```
