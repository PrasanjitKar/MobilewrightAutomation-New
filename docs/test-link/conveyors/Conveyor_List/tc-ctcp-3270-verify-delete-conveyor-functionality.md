# CTCP-3270 — Verify delete conveyor functionality

| Field | Value |
|---|---|
| **TC ID** | CTCP-3270 |
| **Suite** | Conveyors → Conveyor_List |
| **Name** | Verify delete conveyor functionality |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Precondition | User is on conveyor list page |
| 2 | Look for the conveyor which needs to be deleted | The conveyor should display in list |
| 3 | Click on three dots displayed in conveyor entry | On click, two options should display: Edit, Delete |
| 4 | Click on Delete option | Pop-up should open with: Heading "Delete Conveyor name?", "Are you sure you want to delete this conveyor?", Cancel button, Delete button, Cross button |
| 5 | Click on Delete button | The conveyor should get deleted and user should land to conveyor list page |
| 6 | Verify deleted conveyor should not be visible | The deleted conveyor should not display in conveyor list; also should not be available in search |

**Requirements:** None

**Keywords:** Regression

---

*Exported from TestLink*
