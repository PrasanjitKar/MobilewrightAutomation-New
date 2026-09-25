# CTCP-3271 — Cancel button functionality for Delete conveyor pop-up

| Field | Value |
|---|---|
| **TC ID** | CTCP-3271 |
| **Suite** | Conveyors → Conveyor_List |
| **Name** | Cancel button functionality for Delete conveyor pop-up |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Precondition | User is on conveyor list page |
| 2 | Look for the conveyor which needs to be edited | The conveyor should display in list |
| 3 | Click on three dots displayed in conveyor entry | On click, two options should display: Edit, Delete |
| 4 | Click on Delete option | Pop-up should open with: Heading "Delete Conveyor name?", "Are you sure you want to delete this conveyor?", Cancel button, Delete button, Cross button |
| 5 | Click on Cancel or cross button of pop-up | The pop-up should get closed |
| 6 | Look for conveyor in Conveyor list page | The conveyor should get displayed |

**Requirements:** None

**Keywords:** Regression

---

*Exported from TestLink*
