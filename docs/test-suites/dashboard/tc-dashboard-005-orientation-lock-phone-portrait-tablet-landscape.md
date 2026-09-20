# TC-DASHBOARD-005 — Phone forces portrait / tablet forces landscape orientation on Home

> Suite: [Dashboard](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-DASHBOARD-005 |
| **Suite** | dashboard |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `dashboard_orientation` |
| **Feature File** | `features/regression/dashboard.feature` |
| **Page Objects** | `src/pages/dashboard.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG / PRD |

---

## 🎯 Objective

Verify that the Home screen's `build()` method locks device orientation based on form factor: portrait for phones, landscape for tablets, on every rebuild of the screen.

---

## ✅ Preconditions

- Physical rotation is possible on the test device (or the emulator/simulator supports orientation change)
- User is logged in and on the Home screen

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On a phone device, attempt to physically rotate to landscape while on the Home screen | Screen remains locked in portrait (`DeviceHelper.setPortrait()` is called on every `build()`) |
| 2 | On a tablet device, attempt to physically rotate to portrait while on the Home screen | Screen remains locked in landscape (`DeviceHelper.setLandscape()` is called on every `build()`) |
| 3 | Navigate away from Home to another tab/screen and back | Orientation lock re-applies consistently on return to Home |

---

## 🏁 Expected Results

- Phone form factor: Home screen orientation is always portrait, regardless of device rotation
- Tablet form factor: Home screen orientation is always landscape, regardless of device rotation
- No crash or layout break occurs when attempting to rotate against the lock

---

## 🔍 Flutter Source Reference

```dart
// home_screen.dart — build()
@override
Widget build(BuildContext context) {
  if (DeviceHelper.isPhone()) {
    DeviceHelper.setPortrait();
  } else {
    DeviceHelper.setLandscape();
  }
  return Material(
    child: UpgradeAlert(
      ...
```

**Semantic labels / locators:**
- N/A — this is a device-orientation assertion (via platform APIs or accessibility tree bounds), not a semantic label lookup

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/testdata.csv @Key:dashboard_orientation @regression @android
Scenario: Home screen enforces portrait orientation on phone
  Given the user is logged in on a phone device
  And the home screen finishes loading
  When the device attempts to rotate to landscape
  Then the home screen orientation should remain portrait
```

---

## 🔗 Related

- [TC-DASHBOARD-004 — Tablet layout split view](./tc-dashboard-004-tablet-layout-split-view.md)
- [Suite index](./index.md)
