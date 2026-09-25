# TC-COVER-WEAR-014: Responsive Row Presentation (Phone vs Tablet)

> **Suite**: `cover-wear` | **Priority**: `Medium` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/features/coverwear/presentation/widgets/cover_wear_row.dart` (`DeviceHelper.isPhone()`)

---

## 🎯 Objective
Verify the responsive design of `CoverWearRow`, ensuring phone layout renders date span, site, conveyor, measured cover, status chip, and gauge/PDF cleanly, while tablet layout renders a multi-column row with flex distribution.

---

## 📋 Preconditions
- Application is running on phone and tablet viewports.
- Cover Wear events are populated in the list.

---

## 🧪 Test Steps
1. **On Phone Layout (`DeviceHelper.isPhone()` is true)**:
   - Verify top row has horizontal scrollable date span (`buildCoverWearDateWidget()`) and status badge (`_buildStatus`).
   - Verify bottom row has Site, Conveyor, Measured Cover, and trailing Gauge/PDF icon.
2. **On Tablet Layout (`!DeviceHelper.isPhone()`)**:
   - Verify single tabular row with flex-allocated columns:
     - Date Span (flex 4)
     - Site Name (flex 3)
     - Conveyor Name (flex 3)
     - Measured Cover (flex 2)
     - Trailing Widget (flex 3)
     - Status Badge (flex 2)
     - Right Arrow Svg (flex 1)
3. Verify subtle divider line separates rows.

---

## 🔍 Expected Results
- Both phone and tablet layouts present all event metadata cleanly without text clipping.

---

## 📱 Flutter Source Reference
- **Row Widget**: `lib/src/features/coverwear/presentation/widgets/cover_wear_row.dart` (`_buildPhoneView`, `_buildTabView`)

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/coverweardata.csv @Key:coverwear_row_layout @regression @both
Scenario: Verify responsive row presentation on phone and tablet
  Given the user is on the Cover Wear list page
  Then each event row should display:
    | Field          | Description                          |
    | Date Span      | Installed Date - Last Recording Date |
    | Site Name      | Resolved Company Name                |
    | Conveyor Name  | Resolved Conveyor Name               |
    | Measured Cover | Top Cover / Bottom Cover             |
    | Status Badge   | Uploaded / Pending / Failed          |
```
