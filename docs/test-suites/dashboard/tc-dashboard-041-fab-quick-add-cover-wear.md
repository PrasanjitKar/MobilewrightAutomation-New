# TC-DASHBOARD-041: FAB Quick Add — Cover Wear Navigation

> **Suite**: `dashboard` | **Priority**: `High` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/app.dart` (`_getFloatingButton`, `addCoverWear`, `CoverWearAddScreen`)

---

## 🎯 Objective
Verify tapping the "Add Cover Wear" SpeedDial child option on the Dashboard FAB opens `CoverWearAddScreen` when the user has Cover Wear add permission (works both online and offline).

---

## 📋 Preconditions
- User is logged in with `BasicModule.coverWear` (`Permission.add`).

---

## 🧪 Test Steps
1. On `HomeScreen`, tap the primary yellow **Add (+)** floating action button.
2. Locate and tap **Add Cover Wear** in the speed-dial menu.
3. Verify Firebase analytics and LoggingService log: `'Clicked fab from home screen for add coverwear'`.
4. Verify navigation to `CoverWearAddScreen` (`RouteNameKeys.coverWearAddScreen`).
5. Verify the Cover Wear event creation form displays with Site, Conveyor, Belt Diagram, and Data Points fields.

---

## 🔍 Expected Results
- `CoverWearAddScreen` opens directly for creating a cover wear measurement event.

---

## 📱 Flutter Source Reference
- **FAB Implementation**: `lib/src/ui/app.dart` (`_getFloatingButton`)
- **Screen**: `lib/src/features/coverwear/presentation/pages/cover_wear_add_screen.dart`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/dashboarddata.csv @Key:dashboard_fab_add_coverwear @regression @both
Scenario: Open Add Cover Wear form via Dashboard FAB speed dial
  Given the user is on the Home dashboard with Cover Wear add permissions
  When the user opens the Add speed dial and selects "Add Cover Wear"
  Then the Add Cover Wear screen should be displayed
```
