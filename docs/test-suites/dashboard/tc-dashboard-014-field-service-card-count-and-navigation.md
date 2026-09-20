# TC-DASHBOARD-014 — Field Service card shows correct count and navigates correctly (no outer semantic label)

> Suite: [Dashboard](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-DASHBOARD-014 |
| **Suite** | dashboard |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `dashboard_field_service_card` |
| **Feature File** | `features/regression/dashboard.feature` |
| **Page Objects** | `src/pages/dashboard.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG / PRD |

---

## 🎯 Objective

Verify the Field Service card displays the correct device count and navigates to `FieldServiceListScreen(isHomeList: true)` on phone. This card is the sole exception with **no outer `SemanticsLabel` wrapper**, so it must be located via its inner title/count text only.

---

## ✅ Preconditions

- User has view permission for `InternalToolsModule.fieldService`

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Locate the card by its title text "Field Service" (no `fieldServiceCard` semantic wrapper exists — automation must use the inner title/count text) | Card is visible |
| 2 | Read the count value | Count equals `FieldServiceListState.allDeviceList.length` |
| 3 | Tap the card (phone) | `FieldServiceListScreen(isHomeList: true)` is pushed via named route `RouteNameKeys.fieldServiceListScreen` |
| 4 | Tap the card (tablet) | `selectedListType` is set to `ListType.fieldService` on **both** branches (phone and tablet) — note the `setState` call sits outside the `if/else`, unlike every other card |
| 5 | Verify (tablet, if inline list is rendered) | Inline list panel swaps to Field Service; card is highlighted |

---

## 🏁 Expected Results

- Displayed count matches `allDeviceList.length`
- Phone navigation pushes `FieldServiceListScreen(isHomeList: true)`
- `selectedListType` updates to `ListType.fieldService` regardless of device type (confirmed source quirk, not a bug to fix)

---

## 🔍 Flutter Source Reference

```dart
// home_screen.dart — _getHomeCards(), Field Service card
// NOTE: no SemanticsLabel wrapper here, unlike every other card
HomeCard(
  isSelected: !DeviceHelper.isPhone() && selectedListType == ListType.fieldService,
  callback: () {
    if (DeviceHelper.isPhone()) {
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (_) => const FieldServiceListScreen(isHomeList: true),
          settings: const RouteSettings(name: RouteNameKeys.fieldServiceListScreen),
        ),
      );
    } else {
      // analytics log only
    }
    setState(() { selectedListType = ListType.fieldService; }); // outside if/else
  },
  title: AppLocalizations.of(context)!.fieldService, // "Field Service"
  counter: state.allDeviceList.length.toString(),
),
```

**Semantic labels / locators:**
- **No `fieldServiceCard` outer wrapper exists** — locate via inner title text `'Field Service'` or count label `'Field Service-count'` (`exact: false` match required)
- Automation gap: consider requesting an outer `SemanticsLabel` be added to the Flutter source for parity with other cards

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/dashboarddata.csv @Key:dashboard_field_service_card @regression @both
Scenario: Field Service card shows correct count and navigates on tap
  Given the user is logged in
  And the home screen finishes loading
  Then the field service card count should match "td.ExpectedFieldServiceCount"
  When the user taps the field service card
  Then the field service list screen should be displayed
```

---

## 🔗 Related

- [TC-DASHBOARD-013 — Monitoring Device card](./tc-dashboard-013-monitoring-device-card-count-chips-and-navigation.md)
- [Suite index](./index.md)
