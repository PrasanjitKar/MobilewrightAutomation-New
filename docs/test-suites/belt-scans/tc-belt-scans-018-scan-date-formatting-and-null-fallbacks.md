# TC-BELT-SCANS-018 — Date & Nulls — scan date formatting and null fallbacks

> Suite: [Belt Scans](./index.md) | Priority: Low | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-BELT-SCANS-018 |
| **Suite** | belt-scans |
| **Priority** | Low |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `belt_scans_null_fallbacks` |
| **Feature File** | `features/regression/belt_scans.feature` |
| **Page Objects** | `src/pages/belt-scans-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that `dateOfScan` is formatted as `d MMM yyyy` (e.g. `14 Jun 2026`), and when `dateOfScan`, `site`, `conveyorModel`, or `ccm` are null, the row gracefully renders `-` without crashing or UI overflow.

---

## ✅ Preconditions

- Belt scan record with partial/empty fields exists

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Locate a record with complete data | Date is formatted as `d MMM yyyy` |
| 2 | Locate a record with null `dateOfScan` | Date column displays `-` |
| 3 | Locate a record with null `ccm` or null `site` | Displays `-` for site and CCM |
| 4 | Verify horizontal scrolling on long text | `SingleChildScrollView(scrollDirection: Axis.horizontal)` prevents overflow |

---

## 🏁 Expected Results

- Missing values gracefully fallback to `-` and date formatting is standardized

---

## 🔍 Flutter Source Reference

```dart
// belt_scan_row.dart
beltScanModel.dateOfScan != null ? DateFormat('d MMM yyyy').format(beltScanModel.dateOfScan!) : '-'
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:belt_scans_null_fallbacks @regression @both
Scenario: Date formatting and fallback display on belt scan rows
  Given belt scan records with missing metadata exist
  Then null fields should display "-" without causing layout overflow
  And valid dates should be formatted as "d MMM yyyy"
```

---

## 🔗 Related

- [TC-BELT-SCANS-014 — Mobile row](./tc-belt-scans-014-row-presentation-mobile-layout.md)
- [Suite index](./index.md)
