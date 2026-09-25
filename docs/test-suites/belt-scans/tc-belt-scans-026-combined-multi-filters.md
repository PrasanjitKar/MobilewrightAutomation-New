# TC-BELT-SCANS-026 — Combined Filters — sort, site, conveyor, and device type filtering

> Suite: [Belt Scans](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-BELT-SCANS-026 |
| **Suite** | belt-scans |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `belt_scans_combined_filters` |
| **Feature File** | `features/regression/belt_scans.feature` |
| **Page Objects** | `src/pages/belt-scans-filter.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that combining multiple filters simultaneously (Sort A-Z + specific Site + Conveyor + Device Type) applies intersection filtering correctly.

---

## ✅ Preconditions

- Multiple scans spanning different sites, conveyors, and device types exist

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open Filter modal | Modal opens |
| 2 | Select "A-Z" sort, pick Site `S1`, Conveyor `C1`, and Device Type `MultiProtect` | All filter criteria set |
| 3 | Tap "Save" | `BeltScanListFilterEvent` dispatches |
| 4 | Inspect list screen | Records match all criteria simultaneously and are ordered alphabetically |

---

## 🏁 Expected Results

- Multi-attribute combined filter logic operates seamlessly

---

## 🔍 Flutter Source Reference

```dart
// belt_scan_list_bloc.dart
List<BeltScanModel> _filterBeltScans(List<BeltScanModel> beltScans) { ... }
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:belt_scans_combined_filters @regression @both
Scenario: Apply combined sort and multi-select filters
  Given the user opens the Belt Scans filter modal
  When the user selects sort "A-Z", site, conveyor, and device type filters
  Then the list should display only scans satisfying all combined filter criteria
```

---

## 🔗 Related

- [TC-BELT-SCANS-019 — Filter modal layout](./tc-belt-scans-019-filter-modal-layout-and-counter.md)
- [Suite index](./index.md)
