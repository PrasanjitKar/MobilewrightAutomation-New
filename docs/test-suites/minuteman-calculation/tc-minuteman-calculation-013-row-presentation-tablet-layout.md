# TC-MINUTEMAN-013: Row Presentation Tablet Tabular Layout

> **Suite**: `minuteman-calculation` | **Priority**: `Medium` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/screens/minuteman/widgets/minuteman_row.dart` (`if (!DeviceHelper.isPhone())`)

---

## 🎯 Objective
Verify the multi-column tabular layout of `MinutemanRow` on tablet/iPad devices, ensuring proportional column widths, background highlight color when selected, and right chevron indicators.

---

## 📋 Preconditions
- Application is running on a tablet/iPad device (landscape or portrait).
- Minuteman calculation records are available in the list.

---

## 🧪 Test Steps
1. Launch the app on a tablet device and open the Minuteman calculation list (either full screen or right split pane from Dashboard).
2. Inspect the tabular row structure for each calculation item.
3. Verify proportional column allocations:
   - Type SVG icon (left padded).
   - Calculation Name (`width: screen width / 5`, 2 max lines).
   - Site Name (`width: screen width / 10`, 2 max lines).
   - Conveyor Name (`width: screen width / 10`, 2 max lines).
   - Created By (`width: screen width / 8`, 2 max lines).
   - Created Date (`width: screen width / 10`, formatted `d MMM yyyy`).
   - Chevron right icon (`Icons.chevron_right`, color: `ContinentalColors.conveyorStepBlackColor`).
4. Select a row (`isHighlight: true`) and verify its background changes to `ContinentalColors.white2`.
5. Unselect or select another row and verify background returns to `Colors.transparent`.

---

## 🔍 Expected Results
- Tablet row renders all 5 columns with proper horizontal alignment and scrolling if text exceeds boundaries.
- Selection highlight provides clear visual feedback on tablet split view.

---

## 📱 Flutter Source Reference
- **Widget**: `lib/src/ui/screens/minuteman/widgets/minuteman_row.dart` (`!DeviceHelper.isPhone()`)
- **Colors**: `ContinentalColors.white2`, `ContinentalColors.conveyorStepBlackColor`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/minutemandata.csv @Key:minuteman_row_tablet @regression @both
Scenario: Verify Minuteman calculation row layout on tablet devices
  Given the user is on the Minuteman calculation list screen on a tablet
  Then each calculation row should render tabular columns for Name, Site, Conveyor, Creator, Date
  And each row should have a right chevron navigation indicator
  When the user taps on a calculation row
  Then the row background should display the selected highlight color
```
