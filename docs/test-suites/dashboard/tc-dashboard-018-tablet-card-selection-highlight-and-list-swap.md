# TC-DASHBOARD-018 — Tablet card selection swaps inline list panel and applies highlight border

> Suite: [Dashboard](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-DASHBOARD-018 |
| **Suite** | dashboard |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `dashboard_tablet_card_selection` |
| **Feature File** | `features/regression/dashboard.feature` |
| **Page Objects** | `src/pages/dashboard.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android (tablet form factor) |
| **Environments** | STG / PRD |

---

## 🎯 Objective

Verify that on tablet, tapping any card only updates `selectedListType` (no navigation away from Home): the inline list panel below the card strip swaps to the selected module's list, and the tapped card receives a 2px red selection border while all other cards are unselected.

---

## ✅ Preconditions

- Test runs on a tablet-classed device (`DeviceHelper.isPhone() == false`)
- User has view permission for at least two different modules to allow a selection swap test

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Note the default `selectedListType` (`ListType.site`) on first Home load | Sites card shows the 2px red selection border by default |
| 2 | Tap the Conveyors card | `selectedListType` updates to `ListType.conveyor`; Conveyors card now shows the red border; Sites card border is removed |
| 3 | Inspect the inline list panel below the card strip | `getSelectedList(selectedListType)` renders the Conveyors list (via `conveyorList()`) |
| 4 | Repeat for at least 2 more cards (e.g., Inspections, Monitoring Device) | Each tap swaps both the border highlight and the inline list content accordingly |
| 5 | Confirm no navigation occurred (still on Home screen, bottom nav tab unchanged) | User remains on the Home tab throughout |

---

## 🏁 Expected Results

- Exactly one card is highlighted (red border) at any time, matching `selectedListType`
- The inline list panel content always matches the currently selected card
- No screen transition or bottom-nav tab change occurs

---

## 🔍 Flutter Source Reference

```dart
// home_screen.dart — tablet-only inline list panel
Expanded(
  child: Padding(
    padding: const EdgeInsets.only(top: 16, left: 20, right: 20),
    child: Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(10),
        border: Border.all(width: 1.2, color: ContinentalColors.grey2),
      ),
      child: getSelectedList(selectedListType),
    ),
  ),
),

// home_card_container.dart — selection border
Container(
  decoration: BoxDecoration(
    border: isSelected
        ? Border.all(width: 2, color: ContinentalColors.red)
        : Border.all(width: 1, color: Colors.transparent),
  ),
  child: child,
),
```

**Semantic labels / locators:**
- Card wrappers: `siteCard`, `conveyorCard`, `inspectionCard`, `conveyorInspectCard`, `beltScanCard`, `monitoringDeviceCard`, `heavyEquipmentCard`, `minutemanCalculationCard` (Field Service has none — see TC-DASHBOARD-014)
- List content locators: `conveyorListItemFromHomeScreen_$index`, `inspectionListItemFromHomeScreen_$index`, and analogous per-module list-item labels

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/dashboarddata.csv @Key:dashboard_tablet_card_selection @regression @both
Scenario: Tablet card tap swaps inline list panel and highlight
  Given the user is logged in on a tablet device
  And the home screen finishes loading
  When the user taps the conveyor card
  Then the conveyor card should show the selection highlight
  And the inline list panel should display the conveyor list
```

---

## 🔗 Related

- [TC-DASHBOARD-004 — Tablet layout split view](./tc-dashboard-004-tablet-layout-split-view.md)
- [TC-DASHBOARD-019 — Tablet inline row tap and tooltip](./tc-dashboard-019-tablet-inline-row-tap-and-tooltip.md)
- [Suite index](./index.md)
