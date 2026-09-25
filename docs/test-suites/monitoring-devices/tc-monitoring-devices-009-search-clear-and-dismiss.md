# TC-MONITORING-DEVICES-009 — Search Clear — search bar clear and close behavior

> Suite: [Monitoring Devices](./index.md) | Priority: Low | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-MONITORING-DEVICES-009 |
| **Suite** | monitoring-devices |
| **Priority** | Low |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `monitoring_devices_search_clear` |
| **Feature File** | `features/regression/monitoring_devices.feature` |
| **Page Objects** | `src/pages/monitoring-devices-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that tapping the "X" suffix icon in the search bar clears the query string, dismisses the search bar, dispatches `MonitoringDeviceSearchEvent(searchText: '')`, and restores the full device list.

---

## ✅ Preconditions

- Search query is active on `MonitoringDeviceListScreen`

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | With an active search filter, tap "X" button | Search text clears, search bar closes |
| 2 | Observe device list | Full unfiltered list of devices is restored |

---

## 🏁 Expected Results

- Search input clears and full device list is displayed

---

## 🔍 Flutter Source Reference

```dart
// monitoring_device_list_screen.dart
suffixIcon: IconButton(icon: const Icon(Icons.close), onPressed: () { ... })
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:monitoring_devices_search_clear @regression @both
Scenario: Clear search query on Monitoring Devices screen
  Given a search query is active on the Monitoring Devices screen
  When the user taps the clear search button
  Then the search bar should close and the full device list should be restored
```

---

## 🔗 Related

- [TC-MONITORING-DEVICES-008 — Search by name](./tc-monitoring-devices-008-search-by-name-and-serial.md)
- [Suite index](./index.md)
