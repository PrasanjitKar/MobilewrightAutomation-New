# TC-MONITORING-DEVICES-030 — Clear Filters — reset filters to default

> Suite: [Monitoring Devices](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-MONITORING-DEVICES-030 |
| **Suite** | monitoring-devices |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `monitoring_devices_clear_filters` |
| **Feature File** | `features/regression/monitoring_devices.feature` |
| **Page Objects** | `src/pages/monitoring-devices-filter.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that tapping "Clear Filters" in the filter modal resets sort to Last Modified and clears Site, Conveyor, and Device Type selections.

---

## ✅ Preconditions

- Filters are currently applied on `MonitoringDeviceListScreen`

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open Filter modal with active selections | Modal displays active filters |
| 2 | Tap "Clear Filters" in header and tap "Save" | All filters reset to defaults |
| 3 | Observe list screen | Full unfiltered list is restored |

---

## 🏁 Expected Results

- Filters are reset cleanly back to initial state

---

## 🔍 Flutter Source Reference

```dart
// monitoring_device_filter_modal.dart
void _clearFilters() { setState(() { showAllResults = false; _clearProperties(); }); }
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:monitoring_devices_clear_filters @regression @both
Scenario: Clear applied filters in monitoring devices filter modal
  Given active filters are applied on the Monitoring Devices list
  When the user opens the filter modal, taps "Clear Filters", and saves
  Then all filters should be reset and the full list restored
```

---

## 🔗 Related

- [TC-MONITORING-DEVICES-025 — Filter modal](./tc-monitoring-devices-025-filter-modal-layout-and-counter.md)
- [Suite index](./index.md)
