# TC-DASHBOARD-032 — Heavy Equipment deep link shows an access-denied snackbar without view permission

> Suite: [Dashboard](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-DASHBOARD-032 |
| **Suite** | dashboard |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `dashboard_deep_link_access_denied` |
| **Feature File** | `features/regression/dashboard.feature` |
| **Page Objects** | `src/pages/dashboard.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG / PRD |

---

## 🎯 Objective

Verify that a Heavy Equipment deep link, when the user lacks view permission for `BasicModule.heavyEquipmentData`, shows a red "Access denied" snackbar instead of navigating; and when permission IS granted, the app correctly pops any existing Heavy Equipment detail/list route before pushing a fresh `HeavyEquipmentListScreen`.

---

## ✅ Preconditions

- Two test accounts: one **without** view permission for Heavy Equipment, one **with** it
- A way to simulate/trigger a Heavy Equipment deep link

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | As the account **without** Heavy Equipment view permission, trigger a Heavy Equipment deep link | A red `SnackBar` appears with the localized `accessDenied` message; no navigation occurs |
| 2 | As the account **with** permission, while already on `heavyEquipmentDetailsScreen`, trigger the same deep link | The app pops twice (`Navigator.of(context).pop()` x2) before pushing a fresh `HeavyEquipmentListScreen` |
| 3 | As the account **with** permission, while on `heavyEquipmentListScreen`, trigger the deep link | The app pops once, then pushes a fresh `HeavyEquipmentListScreen` |
| 4 | As the account **with** permission, while on any other route (e.g., Home, Conveyors) | No extra pop occurs; `HeavyEquipmentListScreen` is pushed directly |

---

## 🏁 Expected Results

- Access-denied snackbar appears only for the no-permission case, with no navigation side effects
- Route-aware pop logic correctly avoids stacking duplicate Heavy Equipment routes based on `MyRouteObserver().currentRoute`
- `HeavyEquipmentListScreen` is always the resulting screen for the permitted case, regardless of the pre-link route

---

## 🔍 Flutter Source Reference

```dart
// home_screen.dart — build(), Heavy Equipment deep link handling
} else if (deepLinkState.module == BasicModule.heavyEquipmentData) {
  isProcessingActiveDeeplink = true;
  if (_canViewModule(BasicModule.heavyEquipmentData)) {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final String? currentRoute = MyRouteObserver().currentRoute;
      if (currentRoute == RouteNameKeys.heavyEquipmentDetailsScreen) {
        Navigator.of(context).pop();
        Navigator.of(context).pop();
      } else if (currentRoute == RouteNameKeys.heavyEquipmentListScreen) {
        Navigator.of(context).pop();
      }
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (_) => HeavyEquipmentListScreen(isFreeUser: widget.isFreeUser),
          settings: const RouteSettings(name: RouteNameKeys.heavyEquipmentListScreen),
        ),
      );
    });
  } else {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          backgroundColor: Colors.red,
          content: Text(AppLocalizations.of(context)!.accessDenied),
        ),
      );
    });
  }
}
```

**Semantic labels / locators:**
- No dedicated semantic label for the snackbar — automation should assert on the `SnackBar` widget's text content (`accessDenied` localized string) and background color

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/dashboarddata.csv @Key:dashboard_deep_link_access_denied @regression @both
Scenario: Heavy Equipment deep link shows access denied without permission
  Given the user is logged in without heavy equipment view permission
  When a heavy equipment deep link is received
  Then an access denied message should be displayed
  And no navigation should occur
```

---

## 🔗 Related

- [TC-DASHBOARD-015 — Heavy Equipment card](./tc-dashboard-015-heavy-equipment-card-count-and-navigation.md)
- [TC-DASHBOARD-031 — Deep link routing to Home then target module](./tc-dashboard-031-deep-link-routing-to-home-then-target-module.md)
- [Suite index](./index.md)
