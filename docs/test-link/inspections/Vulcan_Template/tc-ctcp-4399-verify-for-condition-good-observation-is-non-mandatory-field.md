# CTCP-4399 — Verify for condition Good,  observation is non mandatory field

| Field | Value |
|---|---|
| **TC ID** | CTCP-4399 |
| **Suite** | Inspections → Vulcan_Template |
| **Name** | Verify for condition Good,  observation is non mandatory field |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify for condition Good,  observation is non mandatory field

**Preconditions:** User is on add inspection item template

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Select any item in asset | User should able to select details in asset |
| 2 | Select condition as Good and status as To be completed | User should be able to select the data |
| 3 | Do not fill any data in observation field and save the item | Item should get saved as observation is not mandatory when condition is good |

**Requirements:** None

**Keywords:** Regression

---

*Exported from TestLink*
