# TC-DASHBOARD-025 — Profile icon navigates to the Profile screen

> Suite: [Dashboard](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-DASHBOARD-025 |
| **Suite** | dashboard |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `dashboard_profile_icon_navigation` |
| **Feature File** | `features/regression/dashboard.feature` |
| **Page Objects** | `src/pages/dashboard.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG / PRD |

---

## 🎯 Objective

Verify tapping `profileIcon` in the app bar pushes `ProfileScreen(isFreeUser: ...)`, and that its avatar background color reflects guest vs authenticated state.

---

## ✅ Preconditions

- One authenticated (full) user session and one guest/free-user session available for comparison

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | As an authenticated user, inspect the `profileIcon` avatar | Background color is `continentalWhite` (full user) |
| 2 | Tap `profileIcon` | `ProfileScreen(isFreeUser: false)` is pushed via named route `RouteNameKeys.profileScreen` |
| 3 | As a guest/free user, inspect the `profileIcon` avatar | Background color is `continentalBlack` (guest indicator) |
| 4 | Tap `profileIcon` as guest | `ProfileScreen(isFreeUser: true)` is pushed |

---

## 🏁 Expected Results

- Profile icon is always present in the app bar (no page/user-type visibility restriction, unlike search/filter/sync)
- Avatar background color correctly distinguishes guest vs authenticated user
- Correct `isFreeUser` flag is passed through to `ProfileScreen`

---

## 🔍 Flutter Source Reference

```dart
// conti_app_bar.dart — profile icon
SemanticsLabel(
  label: 'profileIcon',
  child: IconButton(
    onPressed: () {
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (_) => ProfileScreen(isFreeUser: isFreeUser),
          settings: const RouteSettings(name: RouteNameKeys.profileScreen),
        ),
      );
    },
    icon: CircleAvatar(
      backgroundColor: (isFreeUser ?? false)
          ? ContiplusColors.continentalBlack
          : ContiplusColors.continentalWhite,
      child: BlocBuilder<UserInfoCubit, UserInfoState>(/* renders initials/avatar */),
    ),
  ),
),
```

**Semantic labels / locators:**
- `profileIcon` — app bar profile/avatar button

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/dashboarddata.csv @Key:dashboard_profile_icon_navigation @regression @both
Scenario: Profile icon navigates to the profile screen
  Given the user is logged in
  And the home screen finishes loading
  When the user taps the profile icon
  Then the profile screen should be displayed
```

---

## 🔗 Related

- [TC-DASHBOARD-024 — Search icon navigation](./tc-dashboard-024-search-icon-navigation.md)
- [Suite index](./index.md)
