# CTCP-4361 — Verify the logic to display count in inspection card at home level for multi inspection event

| Field | Value |
|---|---|
| **TC ID** | CTCP-4361 |
| **Suite** | Inspections → Card_Logic |
| **Name** | Verify the logic to display count in inspection card at home level for multi inspection event |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify the logic to display count in inspection card at home level for multi inspection event

**Preconditions:** User have logged in to Conti + application and landed to home page Add inspection data in Site A1 and Conveyor A1

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Look for inspection card | Inspection card will display existing count e.g. : Event count -104 To be completed -43 with Yellow-11, Orange-11 & Red - 11 |
| 2 | Now add inspection event with multi conveyor inspection | Add multi inspection event with to be completed status for all condition- Fault, Poor & critical |
| 3 | Verify the count post addition of event | The card should display following count Event count -105 To be completed -46 Yellow-12, Orange-12 & Red - 12 |

**Requirements:** None

**Keywords:** Regression

---

*Exported from TestLink*
