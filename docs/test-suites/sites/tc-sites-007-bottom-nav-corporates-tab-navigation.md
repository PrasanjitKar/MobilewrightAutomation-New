# TC-SITES-007 — Bottom navigation "Corporates" tab opens Companies list

> Suite: [Sites](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-SITES-007 |
| **Suite** | sites |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `bottom_nav_corporates_tab` |
| **Feature File** | `features/regression/sites.feature` |
| **Page Objects** | `src/pages/dashboard.page.ts`, `src/pages/companies-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that tapping the "Corporates" tab (`corporatesTab`, index 2) in the bottom navigation bar dispatches `AppLoadEvent(selectedPage: 2)` and renders the `CompaniesScreen` (listing Customer and Distributor Corporates).

---

## ✅ Preconditions

- User is logged in as a full user with `AdminModule.corporateManagement` view permission

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | From the Home screen, locate the bottom navigation bar | `corporatesTab` icon (`assets/svg/company.svg`) is visible |
| 2 | Tap the `corporatesTab` | `onScreenChange(index: 2)` is called; `AppLoadEvent(selectedPage: 2)` is dispatched |
| 3 | Observe the body screen | `CompaniesScreen` is displayed with app bar title "Companies" |
| 4 | Observe active state | `corporatesTab` is highlighted as active |

---

## 🏁 Expected Results

- Bottom nav index 2 switches to `CompaniesScreen`
- Active indicator highlights `corporatesTab`

---

## 🔍 Flutter Source Reference

```dart
// app.dart
SemanticsLabel(
  label: 'corporatesTab',
  child: buildNavItem(
    iconAsset: 'assets/svg/company.svg',
    index: 2,
    active: state.selectedPage == 2 || state.selectedPage == 6,
  ),
),
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:bottom_nav_corporates_tab @regression @both
Scenario: Navigate to companies list via bottom navigation tab
  Given the user is logged in
  When the user taps the corporates tab in the bottom navigation
  Then the companies list screen should be displayed
```

---

## 🔗 Related

- [TC-SITES-035 — Companies list loads corporates](./tc-sites-035-companies-list-loads-corporates.md)
- [Suite index](./index.md)
