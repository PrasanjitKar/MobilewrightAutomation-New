# TC-MINUTEMAN-012: Row Presentation Phone Layout

> **Suite**: `minuteman-calculation` | **Priority**: `Medium` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/screens/minuteman/widgets/minuteman_row.dart` (`if (DeviceHelper.isPhone())`)

---

## 🎯 Objective
Verify the responsive mobile phone layout of `MinutemanRow`, ensuring that calculation type SVG icon, bold title, site name, conveyor name, creator name, and created date are laid out properly without UI overflow.

---

## 📋 Preconditions
- Application is running on a mobile phone viewport (portrait orientation).
- Calculations exist with various string lengths.

---

## 🧪 Test Steps
1. Navigate to the Minuteman calculation list on a phone device.
2. Inspect individual `MinutemanRow` widgets.
3. Verify the left section contains the type SVG icon with proper top padding (0 for elevator, 8 for conveyor).
4. Verify the top line displays the calculation name in `ContiplusStyle.boldFonts16pxBFont` wrapped in `SingleChildScrollView(scrollDirection: Axis.horizontal)`.
5. Verify the 2-column grid below the title:
   - **Column 1 (width: screen width / 3)**:
     - Site name (resolved via `CompanyDataCubit`) in `regularFont12pxR`.
     - Conveyor name (resolved via `ConveyorDataCubit`) in `regularFont12pxR`.
   - **Column 2 (width: screen width / 3)**:
     - Creator full name (`minutemanModel.createdBy?.fullName`) in `regularFont12pxR`.
     - Creation date formatted as `d MMM yyyy` (e.g. "15 Jan 2025").
6. Verify a divider line (`Divider(color: ContiplusColors.continentalGray3)`) separates rows.

---

## 🔍 Expected Results
- Row renders cleanly on phone screens with zero pixel overflow warnings.
- Horizontal scroll wrappers handle long calculation names and site names gracefully.

---

## 📱 Flutter Source Reference
- **Widget**: `lib/src/ui/screens/minuteman/widgets/minuteman_row.dart` (`DeviceHelper.isPhone()`)
- **Styles**: `ContiplusStyle.boldFonts16pxBFont`, `ContiplusStyle.regularFont12pxR`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/minutemandata.csv @Key:minuteman_row_phone @regression @both
Scenario: Verify Minuteman calculation row layout on phone devices
  Given the user is on the Minuteman calculation list screen on a phone
  Then each calculation row should display:
    | Element      | Style / Format      |
    | Type Icon    | SVG Elevator/Convey |
    | Calc Name    | Bold 16px           |
    | Site Name    | Regular 12px        |
    | Conveyor Name| Regular 12px        |
    | Created By   | Creator Full Name   |
    | Created Date | d MMM yyyy          |
```
