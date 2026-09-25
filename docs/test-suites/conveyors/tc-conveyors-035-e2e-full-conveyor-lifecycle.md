# TC-CONVEYORS-035: E2E Full Conveyor Lifecycle (Create, Hub Navigation, Edit, Delete)

> **Suite**: `conveyors` | **Priority**: `Critical` | **Type**: `E2E` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/screens/conveyors/` & `lib/src/blocs/conveyor/`

---

## 🎯 Objective
Execute the complete end-to-end lifecycle of a tracked conveyor asset:
1. Create a conveyor through all 3 stepper wizard steps (`Details` -> `Conveyor-Lite` -> `Installed Belt`).
2. Verify asset appears on the Dashboard with incremented count and in `ConveyorListScreen`.
3. Open `ConveyorInformationScreen` (Conveyor Hub) and navigate through sub-module cards.
4. Edit the conveyor technical parameters.
5. Delete the conveyor asset with modal confirmation and verify cascading removal.

---

## 📋 Preconditions
- User is logged in with full `BasicModule.conveyorsData` permissions (`view`, `add`, `edit`, `delete`).
- Customer Corporate and Site exist.

---

## 🧪 Test Steps
1. **Create Conveyor**:
   - On Dashboard, tap the SpeedDial FAB and select **Add Conveyor**.
   - **Step 1 (Details)**: Select Corporate, Site, enter Conveyor Name "E2E Overland Alpha", Code "CV-E2E-01", and Criticality switch. Tap Next.
   - **Step 2 (Conveyor-Lite)**: Select Belt Width (1200 mm), Belt Speed (4.5 m/s), Peak TPH (2500 t/h), Material (Copper Ore), Density, Idler Angle (35°), Drive Wrap (180°), and configure 2 Conveyor Stations (Drive on Station 1, Take-up on Station 2). Tap Next.
   - **Step 3 (Installed Belt)**: Enter Belt Manufacturer "Continental", Carcass "Steel Cord (ST)", Rating (ST-2500), Top Cover (15 mm, Compound DIN-X), Bottom Cover (8 mm, Compound DIN-X), and Installation Date.
   - Tap **Save**.
2. **Verify on Dashboard & List**:
   - Verify return to `ConveyorListScreen` with success toast.
   - Search for "E2E Overland Alpha" and verify row shows correct site, name, and cover wear initial indicator.
   - Navigate to Dashboard and verify Conveyors count incremented by 1.
3. **Conveyor Hub Verification**:
   - Tap the conveyor row in the list to open `ConveyorInformationScreen`.
   - Verify all permitted cards are visible: Technical Data, File Manager, Cover Wear, Inspections, Conveyor Inspect, Belt Scans, Monitoring Devices, Minuteman.
4. **Edit Conveyor**:
   - Tap "Technical Data" card -> tap Edit icon.
   - Update Belt Speed to "5.0 m/s" and tap Save.
   - Verify updated speed is persisted in Technical Data overview.
5. **Delete Conveyor**:
   - From Conveyor Hub options menu, select **Delete**.
   - Confirm deletion modal prompt.
   - Verify conveyor is removed from the database, disappears from `ConveyorListScreen`, and Dashboard counter decrements by 1.

---

## 🔍 Expected Results
- Complete conveyor CRUD and multi-screen lifecycle functions seamlessly end-to-end.

---

## 📱 Flutter Source Reference
- `lib/src/ui/screens/conveyors/conveyor_details_screen.dart`
- `lib/src/ui/screens/conveyors/conveyor_information_screen.dart`
- `lib/src/ui/screens/conveyors/conveyor_list_screen.dart`
- `lib/src/blocs/conveyor/`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/conveyordata.csv @Key:conveyor_e2e_lifecycle @e2e @both
Scenario: End-to-End Conveyor Asset Lifecycle (Create, Hub, Edit, Delete)
  Given the user creates a new conveyor "E2E Overland Alpha" through all 3 stepper steps
  Then the conveyor should appear in the Conveyor List and Dashboard count should increment
  When the user opens the Conveyor Hub and updates technical specifications
  Then the updated conveyor specifications should be saved
  When the user deletes the conveyor asset with confirmation
  Then the conveyor should be removed from the list and Dashboard counter should decrement
```
