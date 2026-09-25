# TC-BELT-SCANS-023 — Filter Site — filter by site multi-select

> Suite: [Belt Scans](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-BELT-SCANS-023 |
| **Suite** | belt-scans |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `belt_scans_filter_by_site` |
| **Feature File** | `features/regression/belt_scans.feature` |
| **Page Objects** | `src/pages/belt-scans-filter.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that selecting one or more sites in `ContiFilterMultiSelect` dynamically restricts the belt scan list to records belonging to those site IDs (`site.companyId`), and resets subordinate conveyor selections.

---

## ✅ Preconditions

- Belt scans exist across multiple customer sites

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open Filter modal and tap Site selector | Site options popup opens with searchable list |
| 2 | Select "Site Alpha" and tap Apply inside popup | `_site` contains selected site ID; subordinate conveyor selection resets |
| 3 | Tap "Save" on filter modal | `BeltScanListFilterEvent` fires with `site: ['SiteAlphaId']` |
| 4 | Inspect list screen | Only belt scans belonging to "Site Alpha" are displayed |

---

## 🏁 Expected Results

- Site multi-selection filters scan records accurately and resets child conveyor options

---

## 🔍 Flutter Source Reference

```dart
// belt_scan_filter_modal.dart
void _setSite(List<MultiSelectOption> selections) {
  setState(() {
    _site = selections.map((e) => e.id).toList();
    _conveyor = [];
    _deviceType = [];
  });
}
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:belt_scans_filter_by_site @regression @both
Scenario: Filter belt scans by site multi-select
  Given the user opens the Belt Scans filter modal
  When the user selects one or more sites and applies
  Then only belt scans from the selected sites should be displayed
```

---

## 🔗 Related

- [TC-BELT-SCANS-024 — Filter by conveyor](./tc-belt-scans-024-filter-by-conveyor-multiselect.md)
- [Suite index](./index.md)
