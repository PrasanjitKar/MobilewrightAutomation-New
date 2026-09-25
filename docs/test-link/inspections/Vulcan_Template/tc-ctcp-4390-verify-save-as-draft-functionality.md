# CTCP-4390 — Verify save as draft functionality

| Field | Value |
|---|---|
| **TC ID** | CTCP-4390 |
| **Suite** | Inspections → Vulcan_Template |
| **Name** | Verify save as draft functionality |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify save as draft functionality

**Preconditions:** Considering Site S1 having conveyor Cv1, CV2 & Cv3 with above inspection event precondition

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | User added inspection event | User should able to add event |
| 2 | Now add items in event | User should able to save items |
| 3 | Select save as draft option | ON click user should able to save the inspection in draft mode |
| 4 | Look for created inspection event in event list page | Event should display locally to device with label as draft |
| 5 | Now click on sync button | Post sync button click, inspection event should be in draft label only |
| 6 | Upload inspection in draft mode | User navigate to edit mode and click on save and close if inspection needs to uploaded to server |
| 7 | Verify post save and close click | Post saving the data draft inspection label should change to uploaded |

**Requirements:** None

**Keywords:** Regression

---

*Exported from TestLink*
