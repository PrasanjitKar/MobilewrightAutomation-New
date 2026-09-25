# CTCP-4364 — Verify after updating the status from To be completed to completed the count in

| Field | Value |
|---|---|
| **TC ID** | CTCP-4364 |
| **Suite** | Inspections → Card_Logic |
| **Name** | Verify after updating the status from To be completed to completed the count in |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** ---- Warning ---- TestLink Warning test case name is too long (103 chars) > 100 => has been truncated Original name Verify after updating the status from To be completed to completed the count in card should get update ---- *** ---- Navigation to inspection list page

**Preconditions:** User have logged in to Conti + application and landed to home page Add inspection data in Site S1 and Conveyor A1 with customer corporate as C1

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Update conveyor A1 inspection status from To be completed to completed | User should able to update the inspection details for conveyor A1 |
| 2 | Now observe the card count on home page | As per expected behavior Completed status condition count should display inspection card, therefore the card should display : Event count -104 To be completed -43 with Yellow-11, Orange-11 & Red - 11 |

**Requirements:** None

**Keywords:** Regression

---

*Exported from TestLink*
