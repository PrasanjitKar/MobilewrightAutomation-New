# TC-DASHBOARD-027 — Hardware back button exits app only from Home; otherwise resets to Home

> Suite: [Dashboard](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-DASHBOARD-027 |
| **Suite** | dashboard |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @android` |
| **Data Key** | `dashboard_back_button_behavior` |
| **Feature File** | `features/regression/dashboard.feature` |
| **Page Objects** | `src/pages/dashboard.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | Android only (hardware/gesture back) |
| **Environments** | STG / PRD |

---

## 🎯 Objective

Verify the Android hardware/gesture back action, handled via `PopScope`/`_onWillPop`, exits the app only when the current tab is Home (`selectedPage == 0`); from any other tab it instead resets `selectedPage` back to 0 (Home) after a short delay, without exiting.

---

## ✅ Preconditions

- Test runs on Android (iOS has no equivalent hardware back gesture at the app-shell level)
- User is logged in

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | From the Home tab (`selectedPage == 0`), press the Android back button | `SystemNavigator.pop()` is invoked — the app exits/backgrounds |
| 2 | Relaunch and navigate to a non-Home tab (e.g., Conveyors, `selectedPage == 1`) | App remains in the foreground |
| 3 | Press the Android back button from the non-Home tab | App does **not** exit; after ~200ms, `AppLoadEvent(selectedPage: 0)` is dispatched, returning the user to Home |
| 4 | Repeat step 3 from other tabs (Companies, Inspections, Sites) | Same reset-to-Home behavior in every case |

---

## 🏁 Expected Results

- Back button exits the app only from the Home tab
- From any other tab, back button always lands the user back on Home rather than exiting or popping an internal route
- No crash or unexpected route stack behavior occurs across repeated back presses

---

## 🔍 Flutter Source Reference

```dart
// app.dart — _onWillPop() and PopScope
Future<bool> _onWillPop() async {
  final int page = (context.read<AppBloc>().state as AppLoadedState).selectedPage;
  if (page == 0) {
    await SystemNavigator.pop();
  }
  Future.delayed(const Duration(milliseconds: 200), () {
    appBloc.add(const AppLoadEvent(selectedPage: 0));
  });
  return page == 0;
}

// build()
return PopScope(
  canPop: false,
  onPopInvokedWithResult: (didPop, result) async {
    if (didPop) return;
    final bool result = await _onWillPop();
    if (result && context.mounted) {
      Navigator.pop(context);
    }
  },
  child: Scaffold(...),
);
```

**Semantic labels / locators:**
- N/A — this is a hardware/system back-gesture assertion, not a UI element lookup; automation should use the device back-key API and assert on app foreground/background state and on `selectedPage`/Home content visibility

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/dashboarddata.csv @Key:dashboard_back_button_behavior @regression @android
Scenario: Back button resets to Home from a non-Home tab
  Given the user is logged in
  And the user navigates to the conveyors tab
  When the user presses the device back button
  Then the home screen should be displayed
```

---

## 🔗 Related

- [TC-DASHBOARD-026 — Bottom nav active state](./tc-dashboard-026-bottom-nav-active-state-and-user-type.md)
- [Suite index](./index.md)
