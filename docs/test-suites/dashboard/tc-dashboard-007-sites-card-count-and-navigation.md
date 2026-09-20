# TC-DASHBOARD-007 — Sites card shows correct count and navigates correctly

> Suite: [Dashboard](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-DASHBOARD-007 |
| **Suite** | dashboard |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `dashboard_sites_card` |
| **Feature File** | `features/regression/dashboard.feature` |
| **Page Objects** | `src/pages/dashboard.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG / PRD |

---

## 🎯 Objective

Verify the Sites card on the Home screen displays the correct site count and navigates to the correct destination for both guest and authenticated users.

---

## ✅ Preconditions

- User has view permission for the Sites module (`BasicModule.customerSiteMap`)
- The number of managed sites for the test account is known (via API/back-office) for count comparison

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Locate the `siteCard` on the Home screen | Card is visible with title "Sites" |
| 2 | Read the count value | Count equals `CompanyListState.customerSite.length` (matches known site count) |
| 3 | Tap the card (phone, authenticated user) | Bottom nav switches to Corporates/Sites tab (`AppLoadEvent(selectedPage: 6)`) |
| 4 | Tap the card (phone, guest/free user) | `SiteListScreen(isFreeUser: true)` is pushed |
| 5 | Tap the card (tablet) | Inline list panel swaps to the Sites list; card is highlighted (red border) |

---

## 🏁 Expected Results

- Displayed count matches the actual number of managed sites
- Navigation target differs correctly by device type and user type as described above
- No stale/zero count is shown once the summary has finished loading

---

## 🔍 Flutter Source Reference

```dart
// home_screen.dart — _getHomeCards(), Sites card
if (canViewSite)
  BlocBuilder<CompanyListBloc, CompanyListState>(
    builder: (context, state) {
      return SemanticsLabel(
        label: 'siteCard',
        child: HomeCard(
          isSelected: !DeviceHelper.isPhone() && selectedListType == ListType.site,
          callback: () => {
            if (DeviceHelper.isPhone())
              { if (widget.isFreeUser ?? false)
                  { Navigator.push(context, MaterialPageRoute(builder: (_) => const SiteListScreen(isFreeUser: true))) }
                else
                  { BlocProvider.of<AppBloc>(context).add(const AppLoadEvent(selectedPage: 6)) },
              }
            else
              { setState(() { selectedListType = ListType.site; }) },
          },
          title: AppLocalizations.of(context)!.managedsites, // "Sites"
          counter: state.customerSite.length.toString(),
        ),
      );
    },
  ),
```

**Semantic labels / locators:**
- `siteCard` — outer card wrapper
- `Sites` — inner title text (via `AppLocalizations.of(context)!.managedsites`)
- `Sites-count` — count text label (Android concatenates value+label; match with `exact: false`)

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/dashboarddata.csv @Key:dashboard_sites_card @regression @both
Scenario: Sites card shows correct count and navigates on tap
  Given the user is logged in
  And the home screen finishes loading
  Then the site card count should match "td.ExpectedSiteCount"
  When the user taps the site card
  Then the site list screen should be displayed
```

---

## 🔗 Related

- [TC-DASHBOARD-003 — Phone layout navigation](./tc-dashboard-003-phone-layout-two-column-grid-navigation.md)
- [TC-DASHBOARD-018 — Tablet card selection highlight](./tc-dashboard-018-tablet-card-selection-highlight-and-list-swap.md)
- [Suite index](./index.md)
