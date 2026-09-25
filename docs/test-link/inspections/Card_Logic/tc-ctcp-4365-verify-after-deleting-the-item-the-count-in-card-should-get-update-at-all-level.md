# CTCP-4365 — Verify after deleting the item the count in card should get update at all level-

| Field | Value |
|---|---|
| **TC ID** | CTCP-4365 |
| **Suite** | Inspections → Card_Logic |
| **Name** | Verify after deleting the item the count in card should get update at all level- |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** ---- Warning ---- TestLink Warning test case name is too long (112 chars) > 100 => has been truncated Original name Verify after deleting the item the count in card should get update at all level- Home, Corporate, Site, Conveyor ---- *** ---- Navigation to inspection list page

**Preconditions:** User have logged in to Conti + application and landed to home page Add inspection data in Site A1 and Conveyor A1 with customer corporate as C1

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Look for the count displayed on home page, conveyor page | Home page count : 100 To be completed -40 with Yellow-10, Orange-10 & Red - 10<br>Conveyor event count : 1 To be completed -3 with Yellow-1, Orange-1 & Red - 1 |
| 2 | Delete inspection with critical item | User should able to delete item |
| 3 | Look for the count displayed on home page & conveyor page | Home page count : 100 To be completed -39 with Yellow-10, Orange-10 & Red - 9 |
| 4 | Look for the count on conveyor page | Conveyor page count : 1 To be completed -2  with Yellow-1, Orange-1 & Red - 0 |

**Requirements:** None

**Keywords:** Regression

---

*Exported from TestLink*
