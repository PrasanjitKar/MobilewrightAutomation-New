# TC-BELT-SCANS-017 — Device Types — rendering diagnostic monitoring device types

> Suite: [Belt Scans](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-BELT-SCANS-017 |
| **Suite** | belt-scans |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `belt_scans_device_types` |
| **Feature File** | `features/regression/belt_scans.feature` |
| **Page Objects** | `src/pages/belt-scans-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that `BeltScanRow` accurately renders different hardware diagnostic device types (e.g. `MultiProtect`, `CordProtect`, `Ultrasonics`, `Minuteman`, `Drone Scan`) corresponding to the `deviceType` field of `BeltScanModel`.

---

## ✅ Preconditions

- Belt scan records generated from different diagnostic device types exist

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Locate scan records across various device types | Rows render |
| 2 | Verify text value for `deviceType` | Correct string (e.g. `MultiProtect`, `CordProtect`) is rendered without truncation |
| 3 | When `deviceType` is null or empty | Displays fallback dash `-` |

---

## 🏁 Expected Results

- Diagnostic hardware origin of each scan is clearly identified in the UI

---

## 🔍 Flutter Source Reference

```dart
// belt_scan_row.dart
Text(
  beltScanModel.deviceType ?? '-',
  style: _getTextStyle(),
  maxLines: 1,
)
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:belt_scans_device_types @regression @both
Scenario: Verify device type rendering on belt scan rows
  Given belt scans from multiple monitoring devices exist
  Then each scan row should display its corresponding device type or fallback dash
```

---

## 🔗 Related

- [TC-BELT-SCANS-025 — Filter by device type](./tc-belt-scans-025-filter-by-device-type-multiselect.md)
- [Suite index](./index.md)
