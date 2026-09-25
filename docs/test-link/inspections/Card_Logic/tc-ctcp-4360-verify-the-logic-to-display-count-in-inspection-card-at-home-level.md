# CTCP-4360 — Verify the logic to display count in inspection card at home level

| Field | Value |
|---|---|
| **TC ID** | CTCP-4360 |
| **Suite** | Inspections → Card_Logic |
| **Name** | Verify the logic to display count in inspection card at home level |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify the logic to display count in inspection card at home level

**Preconditions:** User have logged in to Conti + application and landed to home page Add inspection data in Site S1 and Conveyor A1, A2, A3 & A4

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Look for inspection card | Inspection card will display existing count e.g. : Event count -100 To be completed -40 with Yellow, Orange & Red - 10 count each |
| 2 | Now add inspection event with status as  completed and condition Green for conveyor A1 | After adding the inspection event home card count will be : Event count -101 To be completed -40 with Yellow-10, Orange-10 & Red - 10 |
| 3 | Now add inspection event with status as To be completed and condition fault for A2 | After adding the inspection event home card count will be : Event count -102 To be completed -41 with Yellow-11, Orange-10 & Red - 10 |
| 5 | Now add inspection event with status as To be completed and condition Orange for conveyor A3 | After adding the inspection event home card count will be : Event count -103 To be completed -42 with Yellow-11, Orange-11 & Red - 10 |
| 6 | Now add inspection event with status as To be completed and condition Red for conveyor A4 | After adding the inspection event home card count will be : Event count -104 To be completed -43 with Yellow-11, Orange-11 & Red - 11 |

**Requirements:** None

**Keywords:** Regression

---

*Exported from TestLink*
