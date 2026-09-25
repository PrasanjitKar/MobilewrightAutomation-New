# TC-MONITORING-DEVICES-005 — Dashboard Card — home screen card counter and navigation

> Suite: [Monitoring Devices](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-MONITORING-DEVICES-005 |
| **Suite** | monitoring-devices |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `monitoring_devices_dashboard_card` |
| **Feature File** | `features/regression/monitoring_devices.feature` |
| **Page Objects** | `src/pages/dashboard.page.ts`, `src/pages/monitoring-devices-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that `HomeCard` for Monitoring Devices on Dashboard displays the device icon, title "Monitoring Devices", and dynamic counter badge matching total devices loaded in `MonitoringDeviceListBloc`.

---

## ✅ Preconditions

- User is on Home Dashboard

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Locate `monitoringDeviceCard` on Dashboard | Card renders with title "Monitoring Devices" |
| 2 | Check badge counter | Number matches `state.deviceList.length` |
| 3 | Tap the card | Navigates to `MonitoringDeviceListScreen` |

---

## 🏁 Expected Results

- Dashboard card displays real-time device counter and opens list on tap

---

## 🔍 Flutter Source Reference

```dart
// home_screen.dart
SemanticsLabel(
  label: 'monitoringDeviceCard',
  child: HomeCard(
    title: AppLocalizations.of(context)!.monitoringDevices,
    counter: state.deviceList.length.toString(),
  ),
)
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:monitoring_devices_dashboard_card @regression @both
Scenario: Verify Dashboard Monitoring Devices card counter
  Given the user is on the Dashboard
  Then the Monitoring Devices card should display the total device count
  When the user taps the Monitoring Devices card
  Then the Monitoring Devices screen should open
```

---

## 🔗 Related

- [TC-MONITORING-DEVICES-003 — Navigation sources](./tc-monitoring-devices-003-navigation-sources.md)
- [Suite index](./index.md)
