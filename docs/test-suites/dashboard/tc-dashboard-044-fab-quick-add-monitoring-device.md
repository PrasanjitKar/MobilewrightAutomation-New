# TC-DASHBOARD-044: FAB Quick Add — Monitoring Device Navigation

> **Suite**: `dashboard` | **Priority**: `High` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/app.dart` (`_getFloatingButton`, `addMonitoringDevice`, `MonitoringDeviceDetailsScreen`)

---

## 🎯 Objective
Verify tapping the "Add Monitoring Device" SpeedDial child option on the Dashboard FAB opens `MonitoringDeviceDetailsScreen` when the user has IoT Belt Monitoring add permission.

---

## 📋 Preconditions
- User is logged in with `IOTModule.beltMonitoring` (`Permission.add`).

---

## 🧪 Test Steps
1. On `HomeScreen`, tap the primary yellow **Add (+)** floating action button.
2. Locate and tap **Add Monitoring Device** (cloud/sensor icon) in the speed-dial menu.
3. Verify Firebase analytics logs: `'clicked FAB button from home screen for in monitoring device List screen to add'`.
4. Verify navigation to `MonitoringDeviceDetailsScreen` (`RouteNameKeys.monitoringDeviceDetailsScreen`).
5. Verify Monitoring Device wizard displays with Device Type (Conti CordProtect, Conti MultiProtect), Serial Number, and Site/Conveyor selection.

---

## 🔍 Expected Results
- `MonitoringDeviceDetailsScreen` opens directly for provisioning a new IoT monitoring unit.

---

## 📱 Flutter Source Reference
- **FAB Implementation**: `lib/src/ui/app.dart` (`_getFloatingButton`)
- **Screen**: `lib/src/ui/screens/monitoring_device/monitoring_device_details/monitoring_device_details_screen.dart`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/dashboarddata.csv @Key:dashboard_fab_add_monitoring_device @regression @both
Scenario: Open Add Monitoring Device form via Dashboard FAB speed dial
  Given the user is on the Home dashboard with Monitoring Device add permissions
  When the user opens the Add speed dial and selects "Add Monitoring Device"
  Then the Add Monitoring Device details screen should be displayed
```
