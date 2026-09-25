# CTCP-4643 — Verify good condition flag functionality with status field

| Field | Value |
|---|---|
| **TC ID** | CTCP-4643 |
| **Suite** | Inspections → Card_Logic |
| **Name** | Verify good condition flag functionality with status field |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify good condition flag functionality with status field

**Preconditions:** User is on inspection list screen

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Click on + button to add insepction event from home level | While adding in step 3 conveyor name should be default blank and user should able to select the conveyor from dropdown |
| 2 | Add inspection item with condition as Good | User shoudl abel to add inspection item with good condition |
| 3 | Look for status field | Completed should be selected as Status, Observe To be completed status radio button should be disabled |
| 4 | Save the item | User should able to save the item |
| 5 | Edit the same inspection item | User shoudl abel to edit |
| 6 | Now change the condition to critical | Observe user is able to change the status to To be completed & save the item |
| 7 | Verify above test case for vulcan and default | Above test case applicable for both vulcan and default |

**Requirements:** CTCP-13996:  CR : Inspection Add Items -web [Version : 1] CTCP-13995:  CR: Add Inspection item - Mobile [Version : 1]

**Keywords:** Regression

---

*Exported from TestLink*
