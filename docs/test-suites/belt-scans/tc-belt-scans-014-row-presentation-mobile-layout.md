# TC-BELT-SCANS-014 — Mobile Row — presentation on mobile viewport

> Suite: [Belt Scans](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-BELT-SCANS-014 |
| **Suite** | belt-scans |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `belt_scans_mobile_row` |
| **Feature File** | `features/regression/belt_scans.feature` |
| **Page Objects** | `src/pages/belt-scans-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that on mobile phone viewports (`DeviceHelper.isPhone()`), `BeltScanRow` renders a 2-column layout: Left column with Site Name, Conveyor Name, and Scan Date (`d MMM yyyy`); Right column with Device Type and CCM inspector name.

---

## ✅ Preconditions

- Phone device or small viewport simulator

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | View a `BeltScanRow` on a phone device | Row renders 2-column stacked details |
| 2 | Check Column 1 | Displays Site name on line 1, Conveyor name on line 2, and Scan date on line 3 |
| 3 | Check Column 2 | Displays Device Type on line 1, CCM inspector name on line 2 |
| 4 | Check Leading Icon | Custom SVG `assets/svg/belt_scan_icon.svg` is displayed |
| 5 | Check Trailing Icon | PDF icon `assets/svg/ic_pdf.svg` is displayed |

---

## 🏁 Expected Results

- Mobile phone row layout displays all essential scan metrics cleanly

---

## 🔍 Flutter Source Reference

```dart
// belt_scan_row.dart
if (DeviceHelper.isPhone())
  Expanded(
    child: Row(
      children: [
        Column(children: [Text(beltScanModel.site?.name), Text(beltScanModel.conveyorModel?.name), Text(formattedDate)]),
        Column(children: [Text(beltScanModel.deviceType), Text(beltScanModel.ccm?.fullname)]),
      ],
    ),
  )
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:belt_scans_mobile_row @regression @both
Scenario: Verify Belt Scans row presentation on phone
  Given the user is on a phone device viewing the Belt Scans list
  Then each row should display site name, conveyor name, scan date, device type, and CCM name
```

---

## 🔗 Related

- [TC-BELT-SCANS-015 — Tablet row layout](./tc-belt-scans-015-row-presentation-tablet-layout.md)
- [Suite index](./index.md)
