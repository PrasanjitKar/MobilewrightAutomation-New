# CTCP-4402 — Verify in case of items are completed then status column will reflect green color tick

| Field | Value |
|---|---|
| **TC ID** | CTCP-4402 |
| **Suite** | Inspections → Vulcan_Template |
| **Name** | Verify in case of items are completed then status column will reflect green color tick |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify in case of items are completed then status column will reflect green color tick

**Preconditions:** Considering Site S1 having conveyor Cv1, CV2 & Cv3 with above inspection event precondition

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Add multi conveyor inspection event | Add event with one item as completed and one item as To be completed |
| 2 | Now edit the inspection items in state to completed to completed | User should able to edit the status of item |
| 3 | Now save the changes | User should able to save the changes |
| 4 | Now navigate to inspection list | User should able to navigate |
| 5 | Now look for the updated event | Observe green ticket will be displayed as both the inspections are in completed state |

**Requirements:** None

**Keywords:** Regression

---

*Exported from TestLink*
