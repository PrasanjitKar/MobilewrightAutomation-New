# CTCP-4400 — Verify for condition Critical and Fault,  observation is mandatory field

| Field | Value |
|---|---|
| **TC ID** | CTCP-4400 |
| **Suite** | Inspections → Vulcan_Template |
| **Name** | Verify for condition Critical and Fault,  observation is mandatory field |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify for condition Good,  observation is non mandatory field

**Preconditions:** User is on add inspection item template

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Select any item in asset | User should able to select details in asset |
| 2 | Select condition as Critical and status as To be completed | User should be able to select the data |
| 3 | Do not fill any data in observation field and save the item | Error message should display and item should not get save as for critical condition observation is mandatory field |
| 4 | Now change the condition from critical to Fault and again save the item | Error message should display and item should not get save as for Fault condition observation is mandatory field |
| 5 | Now fill the observation field as save the item | Item should get save |

**Requirements:** None

**Keywords:** Regression

---

*Exported from TestLink*
