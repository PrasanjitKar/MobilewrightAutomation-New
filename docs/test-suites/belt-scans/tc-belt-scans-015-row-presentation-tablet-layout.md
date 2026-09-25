# TC-BELT-SCANS-015 — Tablet Row — presentation on tablet multi-column view

> Suite: [Belt Scans](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-BELT-SCANS-015 |
| **Suite** | belt-scans |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `belt_scans_tablet_row` |
| **Feature File** | `features/regression/belt_scans.feature` |
| **Page Objects** | `src/pages/belt-scans-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that on tablet viewports (`!DeviceHelper.isPhone()`), `BeltScanRow` renders a full-width multi-column table row with Date, Device Type, Site Name, Conveyor Name, CCM Inspector Name, PDF indicator, and right chevron icon.

---

## ✅ Preconditions

- Tablet device or iPad simulator

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open Belt Scans list on a tablet | Multi-column table layout renders |
| 2 | Verify columns from left to right | Scan Icon → Date (`d MMM yyyy`) → Device Type → Site Name → Conveyor Name → CCM Inspector → PDF Icon → Chevron Icon |
| 3 | Check selected highlight | When row is highlighted, background color is `ContinentalColors.white2` |

---

## 🏁 Expected Results

- Tablet view takes advantage of horizontal space with clean tabular row alignment

---

## 🔍 Flutter Source Reference

```dart
// belt_scan_row.dart
if (!DeviceHelper.isPhone())
  Expanded(
    child: Row(
      children: [
        Text(formattedDate),
        Text(beltScanModel.deviceType),
        Text(beltScanModel.site?.name),
        Text(beltScanModel.conveyorModel?.name),
        Text(beltScanModel.ccm?.fullname),
      ],
    ),
  )
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:belt_scans_tablet_row @regression @both
Scenario: Verify Belt Scans row presentation on tablet
  Given the user is on a tablet device viewing Belt Scans
  Then each row should render in a multi-column format with chevron navigation icon
```

---

## 🔗 Related

- [TC-BELT-SCANS-014 — Mobile row layout](./tc-belt-scans-014-row-presentation-mobile-layout.md)
- [Suite index](./index.md)
