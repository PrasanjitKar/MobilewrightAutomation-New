# TC-DASHBOARD-026 — Bottom navigation reflects active tab and differs for guest vs authenticated users

> Suite: [Dashboard](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-DASHBOARD-026 |
| **Suite** | dashboard |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `dashboard_bottom_nav_active_state` |
| **Feature File** | `features/regression/dashboard.feature` |
| **Page Objects** | `src/pages/dashboard.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG / PRD |

---

## 🎯 Objective

Verify the bottom navigation bar tab set and active-state highlighting differ correctly for guest/free users versus authenticated full users, and that tapping a tab (or a Home card) updates `selectedPage` and the active tab highlight consistently.

---

## ✅ Preconditions

- One authenticated (full) user session and one guest/free-user session

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Log in as a guest/free user | `_getFreeUserScreen(selectedPage)` renders a reduced tab set (`active: state.selectedPage == 0/1/2/3`) |
| 2 | Log in as an authenticated full user | `_getScreen(state)` renders the full tab set, where the Corporates/Sites tab is marked active for **both** `selectedPage == 2` and `selectedPage == 6` (`active: state.selectedPage == 2 || state.selectedPage == 6`) |
| 3 | As the authenticated user, navigate to Sites via the Home "Sites" card (which sets `selectedPage: 6`) | The Corporates/Sites bottom-nav tab shows as active, even though the specific page index is 6 not 2 |
| 4 | Tap each bottom-nav tab directly | The corresponding tab is highlighted active and its screen is rendered |
| 5 | Navigate to Sites (page 6) as a non-guest user | `CompanyListLoadEvent(onlyLoading: true)` is dispatched automatically on entering this tab |

---

## 🏁 Expected Results

- Correct reduced/full tab set per user type
- Corporates/Sites tab treats both page 2 and page 6 as "active" (documented source quirk, not a bug)
- Entering Sites (page 6) as a full user always triggers a background site-list load

---

## 🔍 Flutter Source Reference

```dart
// app.dart — build()
var isFreeUser = userInfoState.user?.email == guestUsername;
if (!isFreeUser && state.selectedPage == 6) {
  BlocProvider.of<CompanyListBloc>(context).add(const CompanyListLoadEvent(onlyLoading: true));
}
...
Scaffold(
  appBar: ContiAppBar(isFreeUser: isFreeUser),
  body: isFreeUser ? _getFreeUserScreen(state.selectedPage) : _getScreen(state),
  bottomNavigationBar: isFreeUser ? /* reduced set */ : /* full set */,
);

// full tab set (representative, from _getScreen's bottom nav)
active: state.selectedPage == 0,  // Home
active: state.selectedPage == 1,  // Conveyors
active: state.selectedPage == 2 || state.selectedPage == 6, // Corporates/Sites
active: state.selectedPage == 3,  // (reserved/other)
active: state.selectedPage == 4,  // Inspections
```

**Semantic labels / locators:**
- Bottom nav item locators are not shown in this excerpt — automation should inspect `src/pages/` for existing bottom-nav getters or add them; assert active state via style/selection indicator rather than raw index

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/dashboarddata.csv @Key:dashboard_bottom_nav_active_state @regression @both
Scenario: Bottom navigation highlights the Sites tab when navigating via the Sites card
  Given the user is logged in
  And the home screen finishes loading
  When the user taps the site card
  Then the corporates/sites bottom navigation tab should be highlighted as active
```

---

## 🔗 Related

- [TC-DASHBOARD-007 — Sites card](./tc-dashboard-007-sites-card-count-and-navigation.md)
- [TC-DASHBOARD-027 — Back button behavior](./tc-dashboard-027-back-button-behavior.md)
- [Suite index](./index.md)
