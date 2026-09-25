# TC-MONITORING-DEVICES-028 — Filter Device Type — filter by monitoring device type

> Suite: [Monitoring Devices](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-MONITORING-DEVICES-028 |
| **Suite** | monitoring-devices |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `monitoring_devices_filter_device_type` |
| **Feature File** | `features/regression/monitoring_devices.feature` |
| **Page Objects** | `src/pages/monitoring-devices-filter.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that selecting a device type (e.g. `MultiProtect`) in the filter modal displays only devices of that hardware type.

---

## ✅ Preconditions

- Multiple device types exist

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open Filter modal and select Device Type `MultiProtect` | Selection applied |
| 2 | Tap "Save" | Filter executes |
| 3 | Observe list screen | Only `MultiProtect` devices are displayed |

---

## 🏁 Expected Results

- Device type filtering isolates specific hardware models

---

## 🔍 Flutter Source Reference

```dart
// monitoring_device_filter_modal.dart
void _seDeviceType(List<String> deviceNames) { ... }
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:monitoring_devices_filter_device_type @regression @both
Scenario: Filter monitoring devices by device type
  Given the user opens the monitoring devices filter modal
  When the user selects device type "MultiProtect" and applies
  Then only MultiProtect devices should be displayed
```

---

## 🔗 Related

- [TC-MONITORING-DEVICES-025 — Filter modal](./tc-monitoring-devices-025-filter-modal-layout-and-counter.md)
- [Suite index](./index.md)
