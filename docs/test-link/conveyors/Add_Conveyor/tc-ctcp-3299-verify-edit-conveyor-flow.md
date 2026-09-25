# CTCP-3299 — Verify Edit conveyor flow

| Field | Value |
|---|---|
| **TC ID** | CTCP-3299 |
| **Suite** | Conveyors → Add_Conveyor |
| **Name** | Verify Edit conveyor flow |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Precondition | User is on conveyor list page |
| 2 | Click on three dots of conveyor to be edited | Two options should display: Edit, Delete |
| 3 | Select Edit option | Should land to Edit conveyor page with heading: Edit- Conveyor Name |
| 4 | Update conveyor name & conveyor profile | User should able to update the data |
| 5 | Click on Save and close button | Conveyor information should get saved |
| 6 | Look for conveyor name in list table | Conveyor should display with updated name |
| 7 | Navigate to conveyor details page | Conveyor should display with updated name & profile |

**Requirements:** None

**Keywords:** Regression

---

*Exported from TestLink*
