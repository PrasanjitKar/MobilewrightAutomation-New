# TC-DASHBOARD-031 — Deep links to Inspection/Monitoring Device route through Home first

> Suite: [Dashboard](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-DASHBOARD-031 |
| **Suite** | dashboard |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `dashboard_deep_link_routing` |
| **Feature File** | `features/regression/dashboard.feature` |
| **Page Objects** | `src/pages/dashboard.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG / PRD |

---

## 🎯 Objective

Verify that Inspection and Monitoring Device (Belt Monitoring) deep links, when received while the app is on any tab, first pop the navigator back to the first route (Home) via `Navigator.of(context).popUntil((route) => route.isFirst)`, before routing to the target destination — regardless of which tab the user was on when the link arrived.

---

## ✅ Preconditions

- User is logged in with view permission for `InspectionModule.inspectionModule` and `IOTModule.beltMonitoring`
- A way to simulate/trigger a deep link with each module type and a `contentId` (test harness, ADB intent, or universal link)
- User is on a non-Home tab or several screens deep when the link is triggered

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Navigate several screens deep (e.g., Conveyors → Conveyor details) | Navigation stack has multiple routes |
| 2 | Trigger an Inspection deep link (`DeepLinkPendingState.module == InspectionModule.inspectionModule`) while permission is granted | Navigator pops to the first route (Home), then `AppLoadEvent(selectedPage: 4, inspectionsList: ...)` switches to the Inspections tab |
| 3 | Repeat from a different deep navigation stack, this time with a Belt Monitoring deep link and a specific `contentId` | Navigator pops to the first route, then `MonitoringDeviceListScreen(isFreeUser: ..., monitoringDeviceId: <contentId>, isDeepLink: true)` is pushed directly (not via tab switch) |
| 4 | Verify `isProcessingActiveDeeplink` guards against re-triggering | Once a deep link starts processing, subsequent `DeepLinkPendingState` emissions for the same link do not re-trigger navigation until `DeepLinkInitialState` resets the flag |

---

## 🏁 Expected Results

- Both deep-link types always land the user on Home first, then continue to the target screen/tab, regardless of prior navigation depth
- Belt Monitoring deep link passes through the specific `monitoringDeviceId` and `isDeepLink: true` flag to preselect/highlight the linked device
- No duplicate navigation occurs for a single deep-link event

---

## 🔍 Flutter Source Reference

```dart
// home_screen.dart — build(), deep link handling
if (deepLinkState is DeepLinkPendingState && !isProcessingActiveDeeplink) {
  if (deepLinkState.module == InspectionModule.inspectionModule) {
    isProcessingActiveDeeplink = true;
    if (_canViewModule(InspectionModule.inspectionModule)) {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        Navigator.of(context).popUntil((route) => route.isFirst);
        BlocProvider.of<AppBloc>(context).add(
          AppLoadEvent(selectedPage: 4, inspectionsList: context.read<InspectionListBloc>().state.inspections),
        );
      });
    }
  } else if (deepLinkState.module == IOTModule.beltMonitoring &&
      _canViewModule(IOTModule.beltMonitoring)) {
    isProcessingActiveDeeplink = true;
    WidgetsBinding.instance.addPostFrameCallback((_) {
      Navigator.of(context).popUntil((route) => route.isFirst);
      Navigator.push(context, MaterialPageRoute(
        builder: (_) => MonitoringDeviceListScreen(
          isFreeUser: widget.isFreeUser,
          monitoringDeviceId: deepLinkState.contentId,
          isDeepLink: true,
        ),
        settings: const RouteSettings(name: RouteNameKeys.monitoringDeviceListScreen),
      ));
    });
  }
} else if (deepLinkState is DeepLinkInitialState) {
  isProcessingActiveDeeplink = false;
}
```

**Semantic labels / locators:**
- N/A for the routing logic itself — assert via resulting screen content/route name after triggering the deep link

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/dashboarddata.csv @Key:dashboard_deep_link_routing @regression @both
Scenario: Inspection deep link routes through Home to the Inspections tab
  Given the user is logged in
  And the user has navigated several screens deep
  When an inspection deep link is received
  Then the app should navigate back to the home screen
  And then display the inspections tab
```

---

## 🔗 Related

- [TC-DASHBOARD-013 — Monitoring Device card](./tc-dashboard-013-monitoring-device-card-count-chips-and-navigation.md)
- [TC-DASHBOARD-032 — Deep link access-denied snackbar](./tc-dashboard-032-deep-link-access-denied-snackbar.md)
- [Suite index](./index.md)
