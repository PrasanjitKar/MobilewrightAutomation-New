# TC-MONITORING-DEVICES-029 — Sorting — sort by last modified, A-Z, and Z-A

> Suite: [Monitoring Devices](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-MONITORING-DEVICES-029 |
| **Suite** | monitoring-devices |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `monitoring_devices_sorting` |
| **Feature File** | `features/regression/monitoring_devices.feature` |
| **Page Objects** | `src/pages/monitoring-devices-filter.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that selecting Last Modified, A-Z, or Z-A sorting in the filter modal reorders the monitoring devices list accordingly.

---

## ✅ Preconditions

- Multiple devices exist with varying names and update timestamps

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open Filter modal, select "A-Z" sort, and tap Save | List sorts in alphabetical order by device name |
| 2 | Open Filter modal, select "Z-A" sort, and tap Save | List sorts in reverse alphabetical order |
| 3 | Open Filter modal, select "Last Modified", and tap Save | List sorts with most recently updated device first |

---

## 🏁 Expected Results

- Sorting orders records accurately based on selected rule

---

## 🔍 Flutter Source Reference

```dart
// monitoring_device_list_bloc.dart
List<MonitoringDeviceModel> _sort(List<MonitoringDeviceModel> devices, FilterSortBasedOn sortBy) { ... }
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:monitoring_devices_sorting @regression @both
Scenario: Sort monitoring devices alphabetically and by date
  Given the user opens the filter modal
  When the user selects "A-Z" sorting and applies
  Then the devices should be displayed in alphabetical order
```

---

## 🔗 Related

- [TC-MONITORING-DEVICES-025 — Filter modal](./tc-monitoring-devices-025-filter-modal-layout-and-counter.md)
- [Suite index](./index.md)
