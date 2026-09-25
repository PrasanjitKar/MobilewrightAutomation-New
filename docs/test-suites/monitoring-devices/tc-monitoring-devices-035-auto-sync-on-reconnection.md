# TC-MONITORING-DEVICES-035 — Auto Sync — sync pending queue on reconnection

> Suite: [Monitoring Devices](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-MONITORING-DEVICES-035 |
| **Suite** | monitoring-devices |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `monitoring_devices_auto_sync` |
| **Feature File** | `features/regression/monitoring_devices.feature` |
| **Page Objects** | `src/pages/monitoring-devices-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that when internet connectivity is restored, `MonitoringDeviceListBloc` automatically syncs all pending creations, edits, and deletions with the server.

---

## ✅ Preconditions

- Pending device records are queued in local cache

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Have pending device changes on device while offline | Changes queued |
| 2 | Restore internet connectivity | Connection event fires |
| 3 | Observe list screen | Sync executes in background; pending badges clear automatically |

---

## 🏁 Expected Results

- Background sync reconciles all offline changes upon network recovery

---

## 🔍 Flutter Source Reference

```dart
// monitoring_device_list_bloc.dart
Future<void> _mapMonitoringDeviceListSync(...) async { ... }
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:monitoring_devices_auto_sync @regression @both
Scenario: Automatic synchronization of monitoring devices on network restore
  Given pending monitoring device changes exist offline
  When internet connectivity is restored
  Then pending changes should be automatically synced to the server
```

---

## 🔗 Related

- [TC-MONITORING-DEVICES-033 — Offline creation](./tc-monitoring-devices-033-offline-creation-pending-badge.md)
- [Suite index](./index.md)
