# TC-BELT-SCANS-005 — Dashboard Card — badge counter and navigation

> Suite: [Belt Scans](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-BELT-SCANS-005 |
| **Suite** | belt-scans |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `belt_scans_dashboard_card` |
| **Feature File** | `features/regression/belt_scans.feature` |
| **Page Objects** | `src/pages/dashboard.page.ts`, `src/pages/belt-scans-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that `HomeCard` for Belt Scans on the Dashboard displays the belt scan SVG icon (`assets/svg/ic_belt_scans.svg`), title "Belt Scans", dynamic total count counter matching `state.beltScans.length`, and routes to list on tap.

---

## ✅ Preconditions

- User is logged in on Dashboard

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Locate `beltScanCard` on Dashboard | `HomeCard` is rendered with black badge color |
| 2 | Verify card icon | Displays SVG `assets/svg/ic_belt_scans.svg` |
| 3 | Verify card title | Displays "Belt Scans" |
| 4 | Verify card badge counter | Number matches total belt scans loaded in `BeltScanListBloc` |
| 5 | Tap the card | Logs analytics event and routes to `BeltScanListScreen` |

---

## 🏁 Expected Results

- Dashboard card displays real-time counter and functions as standard module launcher

---

## 🔍 Flutter Source Reference

```dart
// home_screen.dart
SemanticsLabel(
  label: 'beltScanCard',
  child: HomeCard(
    isSelected: !DeviceHelper.isPhone() && selectedListType == ListType.beltScan,
    title: AppLocalizations.of(context)!.beltScans,
    counter: state.beltScans.length.toString(),
  ),
)
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:belt_scans_dashboard_card @regression @both
Scenario: Verify Dashboard Belt Scans card counter and navigation
  Given the user is on the Dashboard
  Then the Belt Scans card should display the total count badge
  When the user taps the Belt Scans card
  Then the Belt Scans list screen should open
```

---

## 🔗 Related

- [TC-BELT-SCANS-003 — Navigation](./tc-belt-scans-003-navigation-from-home-and-conveyor.md)
- [Suite index](./index.md)
