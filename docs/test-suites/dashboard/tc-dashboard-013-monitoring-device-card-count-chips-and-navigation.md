# TC-DASHBOARD-013 — Monitoring Device card shows correct count, status chips, and navigates correctly

> Suite: [Dashboard](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-DASHBOARD-013 |
| **Suite** | dashboard |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `dashboard_monitoring_device_card` |
| **Feature File** | `features/regression/dashboard.feature` |
| **Page Objects** | `src/pages/dashboard.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG / PRD |

---

## 🎯 Objective

Verify the Monitoring Device card displays the correct total count plus good/fault/poor/critical status chips (belt monitoring / IoT devices), and navigates correctly to `MonitoringDeviceListScreen`.

---

## ✅ Preconditions

- User has view permission for `IOTModule.beltMonitoring`
- At least one monitoring device exists in each of the good/fault/poor/critical states

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Locate the `monitoringDeviceCard` on the Home screen | Card is visible with title "Monitoring Devices" |
| 2 | Read the count value | Count equals `ItemSummary.count` computed via `monitoringDeviceListState.getMonitoringDeviceSummary()` |
| 3 | Read the status chips | Good/fault/poor/critical chip values match the computed `ItemSummary` |
| 4 | Tap the card (phone) | `MonitoringDeviceListScreen(isFreeUser: widget.isFreeUser)` is pushed via named route `RouteNameKeys.monitoringDeviceListScreen` |
| 5 | Tap the card (tablet) | Inline list panel swaps to Monitoring Devices; card is highlighted |

---

## 🏁 Expected Results

- Total count and status chips match the computed `ItemSummary`
- Navigation carries the correct `isFreeUser` flag
- This card also participates in the deep-link flow for `IOTModule.beltMonitoring` (see TC-DASHBOARD-031)

---

## 🔍 Flutter Source Reference

```dart
// home_screen.dart — _getHomeCards(), Monitoring Device card
final ItemSummary summary = monitoringDeviceListState.getMonitoringDeviceSummary();
SemanticsLabel(
  label: 'monitoringDeviceCard',
  child: HomeCard(
    isSelected: !DeviceHelper.isPhone() && selectedListType == ListType.monitoringDevice,
    callback: () {
      if (DeviceHelper.isPhone()) {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (_) => MonitoringDeviceListScreen(isFreeUser: widget.isFreeUser),
            settings: const RouteSettings(name: RouteNameKeys.monitoringDeviceListScreen),
          ),
        );
      } else {
        setState(() { selectedListType = ListType.monitoringDevice; });
      }
    },
    title: AppLocalizations.of(context)!.monitoringDevices, // "Monitoring Devices"
    counter: summary.count.toString(),
    good: summary.good.toString(),
    fault: summary.fault.toString(),
    poor: summary.poor.toString(),
    critical: summary.critical.toString(),
  ),
),
```

**Semantic labels / locators:**
- `monitoringDeviceCard` — outer card wrapper
- `Monitoring Devices` — inner title text
- `Monitoring Devices-count` — total count text label (`exact: false` match required)

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/dashboarddata.csv @Key:dashboard_monitoring_device_card @regression @both
Scenario: Monitoring Device card shows correct count and status chips
  Given the user is logged in
  And the home screen finishes loading
  Then the monitoring device card count should match "td.ExpectedMonitoringDeviceCount"
  When the user taps the monitoring device card
  Then the monitoring device list screen should be displayed
```

---

## 🔗 Related

- [TC-DASHBOARD-031 — Deep link routing to target module](./tc-dashboard-031-deep-link-routing-to-home-then-target-module.md)
- [Suite index](./index.md)
