# TC-MINUTEMAN-017: Filter Modal Layout & Real-Time Count

> **Suite**: `minuteman-calculation` | **Priority**: `High` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/screens/minuteman/minuteman_filter_modal.dart` (`MinutemanFilterModal`)

---

## 🎯 Objective
Verify the layout of the Minuteman Filter Modal bottom sheet, including Sort By radio group, Site multi-select, Conveyor multi-select, Clear Filters, Cancel, and Save buttons, plus the dynamic real-time matching count badge.

---

## 📋 Preconditions
- User is on the Minuteman calculation list screen.

---

## 🧪 Test Steps
1. Tap the filter icon in the AppBar (`_openFilter(context)`).
2. Verify that Firebase Analytics logs `logEvent(parameters: {description: 'Tapped filter button from Minuteman list'}, name: ButtonActionKeys.userActionKey)`.
3. Verify that the bottom sheet modal slides up with rounded corners (`BorderRadius.circular(15)`).
4. Inspect the filter controls:
   - **Sort By Label & Radios**: `Last Modified` (default selected), `A-Z`, and `Z-A`.
   - **Site Dropdown**: `ContiFilterMultiSelect(title: 'Site')`.
   - **Conveyor Dropdown**: `ContiFilterMultiSelect(title: 'Conveyor')`.
   - **Header Buttons**: `Clear Filters`, `Cancel` (dismiss), and `Apply/Save` with real-time result count (`FiltersTemplate`).
5. Select a site option and observe that the save button updates to show matching item count (`getCount()`).
6. Tap Cancel and verify modal closes without applying selected changes.

---

## 🔍 Expected Results
- Filter modal opens smoothly with all controls properly initialized.
- Real-time result counter updates dynamically as filter selections change.

---

## 📱 Flutter Source Reference
- **Modal Screen**: `lib/src/ui/screens/minuteman/minuteman_filter_modal.dart` (`MinutemanFilterModal`)
- **Template**: `lib/src/ui/widgets/filters_template.dart` (`FiltersTemplate`)
- **Helper**: `MinutemanFilterHelper`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/minutemandata.csv @Key:minuteman_filter_modal_layout @regression @both
Scenario: Verify Minuteman filter modal layout and real-time result counter
  Given the user is on the Minuteman calculation list screen
  When the user taps the filter icon in the AppBar
  Then the Minuteman filter modal should open
  And the Sort By options should include "Last Modified", "A-Z", and "Z-A"
  And the multi-select options for "Site" and "Conveyor" should be displayed
  When the user selects site "<SiteName>"
  Then the save button should display the dynamic matching count
```
