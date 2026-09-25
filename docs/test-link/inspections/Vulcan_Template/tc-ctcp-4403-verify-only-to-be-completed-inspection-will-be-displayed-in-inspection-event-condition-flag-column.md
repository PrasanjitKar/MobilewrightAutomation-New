# CTCP-4403 — Verify only to be completed inspection will be displayed in inspection event condition flag column

| Field | Value |
|---|---|
| **TC ID** | CTCP-4403 |
| **Suite** | Inspections → Vulcan_Template |
| **Name** | Verify only to be completed inspection will be displayed in inspection event condition flag column |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify only to be completed inspection will be displayed in inspection event condition flag column

**Preconditions:** Considering Site S1 having conveyor Cv1, CV2 & Cv3 with above inspection event precondition

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Add inspection event as :<br>Item 1 : Status To be completed and Flag critical<br>Item 2 : Status To be completed ad flag fault<br>Item 3 : Status Completed and Flag Good | User should able to create the event |
| 2 | Now navigate to inspection event list and observe the condition flag column for above added event | The condition column should display only two flags :<br>-Critical and Fault<br>Good flag should not display as its status is Completed |
| 3 | Now edit the inspection item :<br>Item 1 : Keep as it is<br>Item 2 : Change Status from To be completed to completed and flag fault<br>Item 3 : Change Status from completed to To be Completed and Flag Good | User should able to update the conditions and status |
| 4 | Now save the changes | User should able to save the changes |
| 5 | Now navigate to inspection event list and observe the condition flag column for above added event | The condition column should display only two flags :<br>-Critical and Good<br>Fault flag should not display as its status is Completed |
| 6 | Expand the inspection event | Critical, Good & Fault all flags should be displayed on expand |

**Requirements:** None

**Keywords:** Regression

---

*Exported from TestLink*
