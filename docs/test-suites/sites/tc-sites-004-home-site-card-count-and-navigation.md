# TC-SITES-004 — Home dashboard Sites card displays total managed sites count and navigates to Sites list

> Suite: [Sites](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-SITES-004 |
| **Suite** | sites |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `home_site_card_navigation` |
| **Feature File** | `features/regression/sites.feature` |
| **Page Objects** | `src/pages/dashboard.page.ts`, `src/pages/site-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that the Home dashboard renders the "Sites" card with the title "Managed Sites" (`managedsites`), the location icon, and a counter reflecting the total customer sites count (`state.customerSite.length`), and tapping it navigates to the Sites list.

---

## ✅ Preconditions

- User is logged in with `BasicModule.customerSiteMap` / `Permission.view`

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On the Home dashboard, observe the cards grid | `HomeCard` with semantics label `siteCard` is visible |
| 2 | Verify card content | Displays title "Managed Sites" and counter matching `state.customerSite.length` |
| 3 | Tap the "Sites" card | On phone: dispatches `AppLoadEvent(selectedPage: 6)` and navigates to `SiteListScreen`; on free user: pushes `SiteListScreen` route |
| 4 | Observe the screen | Sites list is presented with all customer sites |

---

## 🏁 Expected Results

- Sites card count matches total customer sites in cache/backend
- Tapping navigates seamlessly to the Sites list screen

---

## 🔍 Flutter Source Reference

```dart
// home_screen.dart
if (canViewSite)
  BlocBuilder<CompanyListBloc, CompanyListState>(
    builder: (context, state) {
      return SemanticsLabel(
        label: 'siteCard',
        child: HomeCard(
          title: AppLocalizations.of(context)!.managedsites,
          counter: state.customerSite.length.toString(),
          callback: () {
            BlocProvider.of<AppBloc>(context).add(const AppLoadEvent(selectedPage: 6));
          },
        ),
      );
    },
  ),
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:home_site_card_navigation @regression @both
Scenario: Home dashboard Sites card navigation
  Given the user is logged in
  Then the home screen should display the sites card with count "td.ExpectedCount"
  When the user taps the sites card
  Then the sites list screen should be displayed
```

---

## 🔗 Related

- [TC-SITES-001 — Sites list loads](./tc-sites-001-sites-list-loads-with-permitted-view.md)
- [Suite index](./index.md)
