# TC-MONITORING-DEVICES-010 — Empty State — display when no devices match

> Suite: [Monitoring Devices](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-MONITORING-DEVICES-010 |
| **Suite** | monitoring-devices |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `monitoring_devices_empty_state` |
| **Feature File** | `features/regression/monitoring_devices.feature` |
| **Page Objects** | `src/pages/monitoring-devices-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that when search or filters match 0 monitoring devices, the screen displays "No Results Found" and suppresses the bottom counter widget.

---

## ✅ Preconditions

- User is on `MonitoringDeviceListScreen`

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Enter a non-matching search term (e.g. `NONEXISTENT_999`) | Search completes |
| 2 | Observe screen body | "No Results Found" message is centered |
| 3 | Clear search query | Normal device card list reappears |

---

## 🏁 Expected Results

- Clean empty state rendering when no records match

---

## 🔍 Flutter Source Reference

```dart
// monitoring_device_list_screen.dart
if (listItems.isEmpty) Center(child: Text(AppLocalizations.of(context)!.noResultsFound))
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:monitoring_devices_empty_state @regression @both
Scenario: Display empty state when no monitoring devices match
  Given the user is on the Monitoring Devices list
  When the user searches for a non-existent device
  Then the "No Results Found" message should be displayed
```

---

## 🔗 Related

- [TC-MONITORING-DEVICES-008 — Search by name](./tc-monitoring-devices-008-search-by-name-and-serial.md)
- [Suite index](./index.md)
