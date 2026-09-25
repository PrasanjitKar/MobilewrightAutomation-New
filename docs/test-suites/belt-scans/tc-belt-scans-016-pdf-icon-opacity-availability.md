# TC-BELT-SCANS-016 — PDF Icon — report availability opacity indication

> Suite: [Belt Scans](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-BELT-SCANS-016 |
| **Suite** | belt-scans |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `belt_scans_pdf_opacity` |
| **Feature File** | `features/regression/belt_scans.feature` |
| **Page Objects** | `src/pages/belt-scans-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that `BeltScanRow` dynamically adjusts the opacity of the trailing PDF report icon (`assets/svg/ic_pdf.svg`): full opacity (`1.0`) when `report.url` is present and actionable, and half opacity (`0.5`) when no report URL exists.

---

## ✅ Preconditions

- Belt scan records with both available and unavailable report URLs exist

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Locate a belt scan with an existing report URL | PDF icon displays at 100% opacity (`1.0`) |
| 2 | Tap the row | Opens PDF report preview screen |
| 3 | Return and locate a belt scan without report URL (`report.url == null` or empty) | PDF icon displays dimmed at 50% opacity (`0.5`) |
| 4 | Tap the dimmed row | Tap does not attempt to open PDF viewer |

---

## 🏁 Expected Results

- PDF availability is visually distinct and inactive rows prevent invalid viewer launches

---

## 🔍 Flutter Source Reference

```dart
// belt_scan_row.dart
Opacity(
  opacity: beltScanModel.report?.url?.isNotEmpty ?? false ? 1 : 0.5,
  child: SvgPicture.asset('assets/svg/ic_pdf.svg'),
)
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:belt_scans_pdf_opacity @regression @both
Scenario: Verify PDF icon opacity based on report availability
  Given belt scans with and without report files exist
  Then scans with reports should show full opacity PDF icons
  And scans without reports should show dimmed 50% opacity PDF icons
```

---

## 🔗 Related

- [TC-BELT-SCANS-002 — Report preview](./tc-belt-scans-002-open-and-preview-pdf-report.md)
- [Suite index](./index.md)
