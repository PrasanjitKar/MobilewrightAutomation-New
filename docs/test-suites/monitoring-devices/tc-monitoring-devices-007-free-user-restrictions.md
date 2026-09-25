# TC-MONITORING-DEVICES-007 — Free User — free user account mode restrictions

> Suite: [Monitoring Devices](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-MONITORING-DEVICES-007 |
| **Suite** | monitoring-devices |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `monitoring_devices_free_user` |
| **Feature File** | `features/regression/monitoring_devices.feature` |
| **Page Objects** | `src/pages/monitoring-devices-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that for free user accounts (`isFreeUser == true`), the Floating Action Button (+) is hidden, search and filter actions are omitted, and device editing is disabled.

---

## ✅ Preconditions

- User logged in under free/guest account tier

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open Monitoring Devices list as a free user | List loads in read-only mode |
| 2 | Check FAB button | FAB is not displayed |
| 3 | Tap on a device card to view details | `MonitoringDeviceDetailsScreen` opens in view mode; Edit action is disabled |

---

## 🏁 Expected Results

- Free users are restricted from adding or modifying monitoring devices

---

## 🔍 Flutter Source Reference

```dart
// monitoring_device_list_screen.dart
floatingActionButton: ((widget.isFreeUser ?? false) || !_canAddModule(context)) ? null : ...
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/logindata.csv @Key:monitoring_devices_free_user @regression @both
Scenario: Free user restrictions on monitoring devices
  Given a free user accesses the Monitoring Devices screen
  Then the add floating action button should not be present
```

---

## 🔗 Related

- [TC-MONITORING-DEVICES-004 — Permission gating](./tc-monitoring-devices-004-permission-gating.md)
- [Suite index](./index.md)
