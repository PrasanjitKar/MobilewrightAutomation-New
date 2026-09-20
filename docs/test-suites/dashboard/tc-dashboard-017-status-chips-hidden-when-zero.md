# TC-DASHBOARD-017 — Status breakdown chips are hidden when their value is zero or empty

> Suite: [Dashboard](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-DASHBOARD-017 |
| **Suite** | dashboard |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `dashboard_status_chips_zero` |
| **Feature File** | `features/regression/dashboard.feature` |
| **Page Objects** | `src/pages/dashboard.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG / PRD |

---

## 🎯 Objective

Verify that each of the good/fault/poor/critical status chips on a `HomeCard` is independently hidden (`Visibility` widget) when its corresponding count value is empty or not a positive integer, and that cards without an `ItemSummary` (Sites, Conveyors, Cover Wear, Belt Scans, Field Service, Heavy Equipment, Minuteman) never render any status chips.

---

## ✅ Preconditions

- Test account/data configured so that at least one of Inspections / Conveyor Inspect / Monitoring Device has zero items in one or more of the good/fault/poor/critical buckets

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Locate a card that supports status chips (Inspections, Conveyor Inspect, or Monitoring Device) with a known zero bucket (e.g., `critical == 0`) | The corresponding chip (e.g., critical) is not rendered/visible |
| 2 | Locate the same card's non-zero buckets | Those chips are visible with the correct count |
| 3 | Inspect any of the other 7 cards (Sites, Conveyors, Cover Wear, Belt Scans, Field Service, Heavy Equipment, Minuteman) | No good/fault/poor/critical chips are rendered at all, since these cards never pass `good`/`fault`/`poor`/`critical` parameters to `HomeCard` |

---

## 🏁 Expected Results

- Each chip's visibility is independently gated on `count.isNotEmpty && int.tryParse(count)! > 0`
- Zero-valued or unset buckets render no chip (not even an empty/zero chip)
- Cards without `ItemSummary` data never show any status chip

---

## 🔍 Flutter Source Reference

```dart
// home_card.dart — status chip visibility (representative pattern, repeated per status)
Visibility(
  visible: good != null && good!.isNotEmpty && (int.tryParse(good!) ?? 0) > 0,
  child: _StatusChip(label: 'good', count: good),
),
Visibility(
  visible: fault != null && fault!.isNotEmpty && (int.tryParse(fault!) ?? 0) > 0,
  child: _StatusChip(label: 'fault', count: fault),
),
Visibility(
  visible: poor != null && poor!.isNotEmpty && (int.tryParse(poor!) ?? 0) > 0,
  child: _StatusChip(label: 'poor', count: poor),
),
Visibility(
  visible: critical != null && critical!.isNotEmpty && (int.tryParse(critical!) ?? 0) > 0,
  child: _StatusChip(label: 'critical', count: critical),
),
```

**Semantic labels / locators:**
- Chip-level locators are scoped per card (e.g., `inspectionCard` → nested good/fault/poor/critical chip elements)
- Automation should assert chip absence via `expect(locator).toBeHidden()` or count == 0, not just skip verification

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/dashboarddata.csv @Key:dashboard_status_chips_zero @regression @both
Scenario: Status chips are hidden when their bucket count is zero
  Given the user is logged in
  And the home screen finishes loading
  And the inspection card has a zero "critical" bucket
  Then the inspection card should not display a "critical" status chip
  And the inspection card should display the non-zero status chips with correct counts
```

---

## 🔗 Related

- [TC-DASHBOARD-010 — Inspections card](./tc-dashboard-010-inspections-card-count-chips-and-navigation.md)
- [TC-DASHBOARD-011 — Conveyor Inspect card](./tc-dashboard-011-conveyor-inspect-card-count-chips-and-navigation.md)
- [TC-DASHBOARD-013 — Monitoring Device card](./tc-dashboard-013-monitoring-device-card-count-chips-and-navigation.md)
- [Suite index](./index.md)
