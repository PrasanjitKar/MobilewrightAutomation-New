# TC-DASHBOARD-046: E2E Multi-Module Dashboard Hub Journey (Login, Summary Counters, Quick Add, Multi-Tab Navigation)

> **Suite**: `dashboard` | **Priority**: `Critical` | **Type**: `E2E` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/screens/home/home_screen.dart` & `lib/src/ui/app.dart`

---

## 🎯 Objective
Execute the full end-to-end Dashboard Hub journey:
1. Land on Dashboard after login and verify all permission-permitted module cards and summary counters load.
2. Trigger the primary SpeedDial FAB to quickly add a new asset/event (e.g. Add Conveyor / Inspection).
3. Complete creation and return to Dashboard -> perform pull-to-refresh -> verify summary counters update dynamically.
4. Traverse through all 5 bottom navigation tabs (Home -> Conveyors -> Corporates -> Tools -> Inspections) and verify persistent active tab highlighting and smooth transitions.

---

## 📋 Preconditions
- Authenticated full user with broad module permissions.

---

## 🧪 Test Steps
1. Log in and arrive on the Dashboard `HomeScreen`.
2. Verify all permitted cards display with non-zero counters (Sites, Conveyors, Cover Wear, Inspections, Conveyor Inspect, Belt Scans, Monitoring Devices, Field Service, Heavy Equipment, Minuteman).
3. Note initial Conveyor and Inspection counts.
4. Tap the yellow **Add (+)** SpeedDial FAB -> select **Add Conveyor**.
5. Create and save a new conveyor asset -> return to Dashboard.
6. Pull down to refresh -> verify `LinearProgressIndicator` appears, `SummaryRefreshModulesEvent` completes, and Conveyors counter increments by +1.
7. Navigate through each bottom nav tab in order:
   - Tap **Conveyors** tab (`conveyorTab`) -> verify `ConveyorListScreen` opens and tab is highlighted gold.
   - Tap **Corporates** tab (`corporatesTab`) -> verify `CompaniesScreen` opens and tab is highlighted gold.
   - Tap **Tools** tab (`toolsTab`) -> verify `ToolsScreen` opens and engineering tools cards render.
   - Tap **Inspections** tab (`inspectionsTab`) -> verify `InspectionListScreen` opens.
   - Tap **Home** tab (`homeTab`) -> verify return to `HomeScreen` and Home icon is highlighted gold.

---

## 🔍 Expected Results
- Complete central hub experience functions smoothly with dynamic count synchronization and seamless multi-tab transitions.

---

## 📱 Flutter Source Reference
- `lib/src/ui/screens/home/home_screen.dart`
- `lib/src/ui/app.dart`
- `lib/src/ui/app/conti_app_bar.dart`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/dashboarddata.csv @Key:dashboard_e2e_hub_journey @e2e @both
Scenario: End-to-End Multi-Module Dashboard Hub Journey
  Given the user lands on the Home dashboard
  Then all permitted module cards and counts should be displayed
  When the user quick-adds a new asset via the SpeedDial FAB
  And refreshes the dashboard
  Then the corresponding summary counter should increment
  When the user traverses through all five bottom navigation tabs
  Then each screen should render correctly and highlight the active tab
```
