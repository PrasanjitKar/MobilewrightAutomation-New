# CTCP-4388 — Verify user is able to duplicate inspection event

| Field | Value |
|---|---|
| **TC ID** | CTCP-4388 |
| **Suite** | Inspections → Vulcan_Template |
| **Name** | Verify user is able to duplicate inspection event |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify user is able to duplicate inspection event

**Preconditions:** Considering Site S1 having conveyor Cv1, CV2 & Cv3 with above inspection event precondition

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Navigate to item list page of above inspection event | User should able to navigate to view page of item list page of above inspection |
| 2 | Long press the event to delete | ON long press following option should display in bottom :<br>Duplicate, Delete & Cancel |
| 3 | Click on duplicate option | Another inspection event should create with same name with Copy as suffix |
| 4 | Verify after creating duplicate inspection count should get updated | Post adding duplicate inspection, count should get updated in card and list |

**Requirements:** None

**Keywords:** Regression

---

*Exported from TestLink*
