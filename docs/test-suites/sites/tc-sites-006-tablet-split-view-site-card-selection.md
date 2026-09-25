# TC-SITES-006 — Tablet layout — selecting Sites card renders inline split-view site list

> Suite: [Sites](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-SITES-006 |
| **Suite** | sites |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `tablet_site_card_selection` |
| **Feature File** | `features/regression/sites.feature` |
| **Page Objects** | `src/pages/dashboard.page.ts`, `src/pages/site-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iPad / Android Tablet (Landscape) |
| **Environments** | STG |

---

## 🎯 Objective

Verify that on a tablet in landscape orientation, selecting the Sites card highlights the card and renders the inline `siteList()` in the lower split-view container without full-screen navigation.

---

## ✅ Preconditions

- App is running on a Tablet device in Landscape orientation
- User is logged in with `BasicModule.customerSiteMap` / `Permission.view`

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Observe the tablet Home screen | Upper carousel displays module cards; lower area displays the active list container |
| 2 | Tap the "Sites" card (`siteCard`) | `selectedListType` updates to `ListType.site`; `siteCard` gets selected border/highlight |
| 3 | Observe the split-view list container | `getSelectedList(ListType.site)` returns `siteList()`, rendering customer sites inline |
| 4 | Tap a site row from the tablet list | Navigates to `CompanyResumeScreen` for that site |

---

## 🏁 Expected Results

- Tablet renders responsive split-view layout
- Selecting Sites card updates `selectedListType` and displays inline site rows

---

## 🔍 Flutter Source Reference

```dart
// home_screen.dart
Widget getSelectedList(ListType selectedListType) {
  widget.onCardSelected(selectedListType);
  switch (selectedListType) {
    case ListType.site:
      return siteList();
    ...
  }
}
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:tablet_site_card_selection @regression @both
Scenario: Tablet split view site selection
  Given the app is running on a tablet in landscape mode
  When the user taps the sites card in the top carousel
  Then the lower container should render the inline customer sites list
```

---

## 🔗 Related

- [TC-SITES-004 — Home dashboard Sites card](./tc-sites-004-home-site-card-count-and-navigation.md)
- [Suite index](./index.md)
