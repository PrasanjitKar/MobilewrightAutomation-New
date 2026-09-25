# TC-MONITORING-DEVICES-008 — Search — search by device name, conveyor, and serial number

> Suite: [Monitoring Devices](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-MONITORING-DEVICES-008 |
| **Suite** | monitoring-devices |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `monitoring_devices_search` |
| **Feature File** | `features/regression/monitoring_devices.feature` |
| **Page Objects** | `src/pages/monitoring-devices-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that entering keywords into the search bar matches and filters monitoring devices across Device Name, Conveyor Name, Customer/Company Name, and Serial Number in real-time.

---

## ✅ Preconditions

- Multiple monitoring devices exist across different conveyors and serial numbers

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Tap the search icon on `MonitoringDeviceListScreen` | Search bar appears |
| 2 | Enter a device name keyword (e.g. `MP-Scanner`) | List filters to devices whose name contains `MP-Scanner` |
| 3 | Clear and enter a serial number (e.g. `SN-8821`) | List filters to device matching that serial number |
| 4 | Clear and enter a conveyor name | List filters to devices installed on that conveyor |

---

## 🏁 Expected Results

- Search filters across multiple attributes accurately

---

## 🔍 Flutter Source Reference

```dart
// monitoring_device_list_bloc.dart
List<MonitoringDeviceModel> _search(List<MonitoringDeviceModel> devices, String search) { ... }
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:monitoring_devices_search @regression @both
Scenario: Search monitoring devices by name or serial number
  Given the user is on the Monitoring Devices list screen
  When the user searches for "SN-8821"
  Then the matching monitoring device should be displayed
```

---

## 🔗 Related

- [TC-MONITORING-DEVICES-009 — Search clear](./tc-monitoring-devices-009-search-clear-and-dismiss.md)
- [Suite index](./index.md)
