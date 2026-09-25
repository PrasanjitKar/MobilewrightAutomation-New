# TC-MONITORING-DEVICES-027 — Filter Conveyor — cascading conveyor multi-select

> Suite: [Monitoring Devices](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-MONITORING-DEVICES-027 |
| **Suite** | monitoring-devices |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `monitoring_devices_filter_conveyor` |
| **Feature File** | `features/regression/monitoring_devices.feature` |
| **Page Objects** | `src/pages/monitoring-devices-filter.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that selecting conveyors in the filter modal narrows the device list to those installed on the selected conveyors.

---

## ✅ Preconditions

- Devices across multiple conveyors exist

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open Filter modal and choose conveyor `CV-1` | Conveyor selected |
| 2 | Tap "Save" | Filter applies |
| 3 | Observe list screen | Only devices on conveyor `CV-1` are rendered |

---

## 🏁 Expected Results

- Conveyor selection filters devices accurately

---

## 🔍 Flutter Source Reference

```dart
// monitoring_device_filter_modal.dart
void setConveyorIds(List<String> conveyorIds) { ... }
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:monitoring_devices_filter_conveyor @regression @both
Scenario: Filter monitoring devices by conveyor
  Given the user opens the monitoring devices filter modal
  When the user selects a conveyor and applies the filter
  Then only devices on the selected conveyor should be displayed
```

---

## 🔗 Related

- [TC-MONITORING-DEVICES-026 — Filter by site](./tc-monitoring-devices-026-filter-by-site-multiselect.md)
- [Suite index](./index.md)
