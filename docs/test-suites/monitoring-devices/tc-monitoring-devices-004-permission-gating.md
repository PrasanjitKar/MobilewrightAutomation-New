# TC-MONITORING-DEVICES-004 — Permissions — permission gating for view, add, edit, and delete

> Suite: [Monitoring Devices](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-MONITORING-DEVICES-004 |
| **Suite** | monitoring-devices |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `monitoring_devices_permissions` |
| **Feature File** | `features/regression/monitoring_devices.feature` |
| **Page Objects** | `src/pages/monitoring-devices-list.page.ts`, `src/pages/monitoring-device-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that access to Monitoring Devices is gated by `IOTModule.beltMonitoring` permissions: view controls screen visibility, add controls FAB display, edit controls the Edit button, and delete controls the popup delete menu item.

---

## ✅ Preconditions

- Test users with varied permissions on `IOTModule.beltMonitoring`

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Log in with user missing view permission | Monitoring Devices card is hidden on dashboard; direct route renders empty container |
| 2 | Log in with user having view-only permission | FAB (+) is hidden; details screen displays in read-only mode without Edit button; Delete popup menu item is disabled |
| 3 | Log in with user having edit & delete permissions | Edit button and Delete popup menu item are active |

---

## 🏁 Expected Results

- Role-based access control rules are enforced across all device operations

---

## 🔍 Flutter Source Reference

```dart
// monitoring_device_details_screen.dart
final bool canDelete = context.read<UserInfoCubit>().state.user!.canAccess(IOTModule.beltMonitoring, Permission.delete);
final bool canEdit = context.read<UserInfoCubit>().state.user!.canAccess(IOTModule.beltMonitoring, Permission.edit);
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/logindata.csv @Key:monitoring_devices_permissions @regression @both
Scenario: Verify role-based permission gating for monitoring devices
  Given a user with view-only permissions on monitoring devices
  When the user opens the Monitoring Devices list
  Then the add FAB button should not be visible
```

---

## 🔗 Related

- [TC-MONITORING-DEVICES-001 — List loads](./tc-monitoring-devices-001-list-loads-with-permitted-view.md)
- [Suite index](./index.md)
