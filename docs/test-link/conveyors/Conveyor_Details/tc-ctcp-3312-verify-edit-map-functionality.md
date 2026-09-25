# CTCP-3312 — Verify Edit map functionality

| Field | Value |
|---|---|
| **TC ID** | CTCP-3312 |
| **Suite** | Conveyors → Conveyor_Details |
| **Name** | Verify Edit map functionality |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Precondition | User is on conveyor details screen |
| 2 | Observe the map displayed in conveyor | The conveyor should have site location & head and tail position |
| 3 | Click on edit button in header | User should now able to edit fields |
| 4 | Select any other site from Site listing dropdown | The map location should get loaded with new Site location |
| 5 | Look for lat long position for Head and tail | The head and tail lat long text box should get reset |
| 6 | Enter new lat long coordinates for Head and tail | User should able to update the data in text box |
| 7 | Save the changes | The conveyor data should get saved with same details |

**Requirements:** None

**Keywords:** Regression

---

*Exported from TestLink*
