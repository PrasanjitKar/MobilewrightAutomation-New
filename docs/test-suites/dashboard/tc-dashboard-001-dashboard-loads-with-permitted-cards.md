# TC-DASHBOARD-001 — Dashboard loads with app bar title "Home" and all permission-eligible cards

> Suite: [Dashboard](./index.md) | Priority: Critical | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-DASHBOARD-001 |
| **Suite** | dashboard |
| **Priority** | Critical |
| **Type** | Smoke |
| **Suggested Tags** | `@smoke @both` |
| **Data Key** | `dashboard_load` |
| **Feature File** | `features/smoke/dashboard.feature` |
| **Page Objects** | `src/pages/dashboard.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG / PRD |

---

## 🎯 Objective

Verify that after a successful login the app lands on the Home screen (the dashboard), the top app bar shows the "Home" title, and a card is rendered for every module the signed-in user has view permission for.

---

## ✅ Preconditions

- User has successfully logged in (see `TC-LOGIN-006`)
- Test account has view permission for at least Sites, Conveyors, and Inspections

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Observe the screen immediately after login | Home screen (`HomeScreen`) is displayed |
| 2 | Inspect the top app bar | Title (`appbarTitle`) reads "Home" |
| 3 | Wait for the module summary to finish loading | `LinearProgressIndicator` (shown while `SummaryState.newStatus == loading`) disappears |
| 4 | Inspect the card grid/strip | A card is visible for every module the user can view (e.g. `siteCard`, `conveyorCard`, `inspectionCard`) |
| 5 | Inspect the last-updated indicator | `lastUpdatedTimeHomeScreen` label is visible once `state.lastUpdate` is non-zero |

---

## 🏁 Expected Results

- Home screen loads without error after login
- App bar title = "Home"
- All permission-eligible cards render with a count value (not stuck on a loading spinner)
- Last-updated sync time is visible

---

## 🔍 Flutter Source Reference

```dart
// home_screen.dart — build()
if (DeviceHelper.isPhone()) DeviceHelper.setPortrait(); else DeviceHelper.setLandscape();
return Material(
  child: UpgradeAlert(
    showIgnore: false,
    child: BlocBuilder<DeepLinkBloc, DeepLinkState>(
      builder: (context, deepLinkState) {
        return BlocBuilder<SummaryBloc, SummaryState>(
          builder: (context, state) {
            return RefreshIndicator(
              onRefresh: () async => context.read<SummaryBloc>().add(
                const SummaryRefreshModulesEvent(refreshSource: PullToRefresh()),
              ),
              child: SafeArea(
                child: Column(children: [
                  if (state.newStatus == SummaryStatus.loading) const LinearProgressIndicator(),
                  if (DeviceHelper.isPhone())
                    Expanded(child: GridView.count(crossAxisCount: 2, children: _getHomeCards(context, state))),
                  ...
                ]),
              ),
            );
          },
        );
      },
    ),
  ),
);

// conti_app_bar.dart — build()
title: SemanticsLabel(label: 'appbarTitle', child: Text(appBarTitles[state.selectedPage])),
// appBarTitles[0] == AppLocalizations.of(context)!.home  →  "Home"
```

**Semantic labels / locators:**
- `appbarTitle` — app bar title text
- `siteCard`, `conveyorCard`, `coverWearCard`, `inspectionCard`, `conveyorInspectCard`, `beltScanCard`, `monitoringDeviceCard`, `heavyEquipmentCard`, `minutemanCalculationCard` — dashboard cards
- `lastUpdatedTimeHomeScreen` — last synced time indicator

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/testdata.csv @Key:dashboard_load @smoke @both
Scenario: Dashboard loads with permitted cards after login
  Given the user is logged in
  When the home screen finishes loading
  Then the app bar title should read "Home"
  And the conveyor card should be displayed on the home screen
  And the site card should be displayed on the home screen
  And the last updated time should be displayed on the home screen
```

---

## 🔗 Related

- [TC-LOGIN-006 — Successful login with valid credentials](../login/tc-login-006-successful-login.md)
- [TC-DASHBOARD-002 — Card visibility is permission-based](./tc-dashboard-002-card-visibility-permission-based.md)
- [Suite index](./index.md)
