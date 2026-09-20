# TC-DASHBOARD-024 — Search icon opens Search page with no preset tab from Home

> Suite: [Dashboard](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-DASHBOARD-024 |
| **Suite** | dashboard |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `dashboard_search_icon_navigation` |
| **Feature File** | `features/regression/dashboard.feature` |
| **Page Objects** | `src/pages/dashboard.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG / PRD |

---

## 🎯 Objective

Verify the app bar's `searchIcon` is visible on every tab for non-guest users (unlike the filter icon), and that navigating from Home opens `SearchPage` with `initialTab: null` (no preset tab), while navigating from Conveyors/Companies/Inspections/Sites opens it with the corresponding `SearchTab` preset.

---

## ✅ Preconditions

- User is logged in as a full (non-free) user

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On the Home tab (page 0), tap `searchIcon` | `SearchPage(initialTab: null)` is pushed — no tab is pre-selected/highlighted |
| 2 | Return to Home, navigate to Conveyors (page 1), tap `searchIcon` | `SearchPage(initialTab: SearchTab.conveyor)` opens with the Conveyors tab preset |
| 3 | Repeat from Companies (page 2) | Opens with `SearchTab.company` preset |
| 4 | Repeat from Inspections (page 4) | Opens with `SearchTab.inspection` preset |
| 5 | Repeat from Sites (page 6) | Opens with `SearchTab.site` preset |
| 6 | Log in as a guest/free user and inspect the app bar on any tab | `searchIcon` is not rendered (`isFreeUser` guard) |

---

## 🏁 Expected Results

- Search icon is present on every tab (unlike the filter icon's page-restricted visibility) for non-free users
- Tab preset mapping matches exactly: 1→conveyor, 2→company, 4→inspection, 6→site; Home (0) and any other page → no preset
- Search icon is absent entirely for guest/free users

---

## 🔍 Flutter Source Reference

```dart
// conti_app_bar.dart — search icon
if (isFreeUser == false)
  SemanticsLabel(
    label: 'searchIcon',
    child: IconButton(
      onPressed: () {
        Navigator.push(context, MaterialPageRoute(builder: (context) {
          int? tab;
          if (state.selectedPage == 1) tab = SearchTab.conveyor;
          if (state.selectedPage == 2) tab = SearchTab.company;
          if (state.selectedPage == 4) tab = SearchTab.inspection;
          if (state.selectedPage == 6) tab = SearchTab.site;
          return SearchPage(initialTab: tab);
        }));
      },
      icon: SvgPicture.asset(ContiPlusIcon.searchIcon_24x24),
    ),
  ),
```

**Semantic labels / locators:**
- `searchIcon` — app bar search button (hidden for guest/free users only; visible on all tabs otherwise)

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/dashboarddata.csv @Key:dashboard_search_icon_navigation @regression @both
Scenario: Search icon opens search page without a preset tab from Home
  Given the user is logged in
  And the home screen finishes loading
  When the user taps the search icon
  Then the search page should be displayed with no tab preselected
```

---

## 🔗 Related

- [TC-DASHBOARD-023 — Filter icon visibility](./tc-dashboard-023-filter-icon-visibility.md)
- [TC-DASHBOARD-025 — Profile icon navigation](./tc-dashboard-025-profile-icon-navigation.md)
- [Suite index](./index.md)
