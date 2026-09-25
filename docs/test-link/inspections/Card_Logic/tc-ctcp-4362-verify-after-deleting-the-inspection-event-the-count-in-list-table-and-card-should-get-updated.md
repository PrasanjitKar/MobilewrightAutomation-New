# CTCP-4362 — Verify after deleting the inspection event the count in list table and card should get updated

| Field | Value |
|---|---|
| **TC ID** | CTCP-4362 |
| **Suite** | Inspections → Card_Logic |
| **Name** | Verify after deleting the inspection event the count in list table and card should get updated |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify after deleting the inspection event the count in list table and card should get updated

**Preconditions:** User have logged in to Conti + application and landed to home page Add inspection data in Site S1 and Conveyor A1

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Look for the inspection list table event count | Let suppose inspection list table event count is 105 |
| 2 | Now delete above added multi inspection event | Post deletion card should display following data : Event count -104 To be completed -43 with Yellow-11, Orange-11 & Red - 11 |
| 3 | Look for list table count | The list table count in footer should display -104 |

**Requirements:** None

**Keywords:** Regression

---

*Exported from TestLink*
