# CTCP-4567 — Site name should auto-populate in case inspection added from site screen

| Field | Value |
|---|---|
| **TC ID** | CTCP-4567 |
| **Suite** | Inspections → Vulcan_Template |
| **Name** | Site name should auto-populate in case inspection added from site screen |
| **Priority** | Medium |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Site name should auto-populate in case inspection added from site screen

**Preconditions:** User is on site detail screen having conveyor mapped

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Navigate to site details page having conveyor mapped | User should able to navigate |
| 2 | Click on conveyor | User will navigate to conveyor details screen |
| 3 | Click on inspection card | User will navigate to inspection list screen |
| 4 | Click on + button to add inspection | Add inspection page should display |
| 5 | Observe the vlaues prefilled | Following value should be prefilled :<br>Site name<br>Inspection template type<br>INspection date as current date<br>Inspection name : Site name + current date<br>Inspector name<br>Site location with user gps location if enabled in mobile as per permission |

**Requirements:** CTCP-13517:  CR: Add Inspection Event - Inspection mobile [Version : 1]

**Keywords:** Regression

---

*Exported from TestLink*
