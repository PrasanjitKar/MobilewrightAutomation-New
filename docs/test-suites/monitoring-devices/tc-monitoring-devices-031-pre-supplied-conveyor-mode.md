# TC-MONITORING-DEVICES-031 — Pre-Supplied — pre-supplied conveyor mode locked filters

> Suite: [Monitoring Devices](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-MONITORING-DEVICES-031 |
| **Suite** | monitoring-devices |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `monitoring_devices_pre_supplied_mode` |
| **Feature File** | `features/regression/monitoring_devices.feature` |
| **Page Objects** | `src/pages/monitoring-devices-filter.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that when navigated from Conveyor Information (`isConveyorIdsPreSupplied: true`), the Conveyor selector is locked/disabled in the filter modal and cannot be cleared.

---

## ✅ Preconditions

- Navigated to Monitoring Devices from Conveyor Details

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open Filter modal | Modal opens in pre-supplied mode |
| 2 | Observe Conveyor selector | Conveyor selector is disabled |
| 3 | Tap "Clear Filters" | Conveyor filter remains locked; other filters reset |

---

## 🏁 Expected Results

- Contextual conveyor selection remains locked

---

## 🔍 Flutter Source Reference

```dart
// monitoring_device_filter_modal.dart
if (!isConveyorIdsPreSupplied) { _conveyorIds = []; }
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:monitoring_devices_pre_supplied_mode @regression @both
Scenario: Verify locked conveyor filter in pre-supplied mode
  Given the user opened monitoring devices from a conveyor details screen
  When the user opens the filter modal
  Then the conveyor filter should be locked and preserved on clear
```

---

## 🔗 Related

- [TC-MONITORING-DEVICES-006 — Conveyor info card](./tc-monitoring-devices-006-conveyor-info-card-and-auto-filter.md)
- [Suite index](./index.md)
