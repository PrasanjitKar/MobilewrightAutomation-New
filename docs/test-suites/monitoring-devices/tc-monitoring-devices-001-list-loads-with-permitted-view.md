# TC-MONITORING-DEVICES-001 — List Loads — display monitoring devices list

> Suite: [Monitoring Devices](./index.md) | Priority: Critical | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-MONITORING-DEVICES-001 |
| **Suite** | monitoring-devices |
| **Priority** | Critical |
| **Type** | Smoke |
| **Suggested Tags** | `@smoke @both` |
| **Data Key** | `monitoring_devices_list_load` |
| **Feature File** | `features/smoke/monitoring_devices.feature` |
| **Page Objects** | `src/pages/monitoring-devices-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that when a user with `IOTModule.beltMonitoring` view permission opens the Monitoring Devices screen, `MonitoringDeviceListBloc` loads devices from cache and network, rendering cards with device names, customer names, conveyors, installation dates, and status badges.

---

## ✅ Preconditions

- User is authenticated with `IOTModule.beltMonitoring` view permission

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Navigate to Monitoring Devices screen | Screen opens with AppBar title "Monitoring Devices" |
| 2 | Observe loading state | `LinearProgressIndicator` shows while loading |
| 3 | Inspect device cards | `MonitoringDeviceListCard` renders device name, conveyor name, install date, and status |
| 4 | Verify bottom widget | `LastUpdatedTimeAndTotalCountWidget` renders total device count and sync time |

---

## 🏁 Expected Results

- Monitoring devices list loads and displays complete device metadata

---

## 🔍 Flutter Source Reference

```dart
// monitoring_device_list_screen.dart
final bool canView = context.read<UserInfoCubit>().state.user!.canAccess(IOTModule.beltMonitoring, Permission.view);
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/smokedata.csv @Key:monitoring_devices_list_load @smoke @both
Scenario: Monitoring devices list loads successfully
  Given the user is logged in with monitoring devices permission
  When the user opens the Monitoring Devices screen
  Then the list of monitoring devices should be displayed
```

---

## 🔗 Related

- [TC-MONITORING-DEVICES-004 — Permission gating](./tc-monitoring-devices-004-permission-gating.md)
- [Suite index](./index.md)
