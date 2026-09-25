# CTCP-4433 — Verify inspection VMC template functionality for Customer corporate

| Field | Value |
|---|---|
| **TC ID** | CTCP-4433 |
| **Suite** | Inspections → Corporate_List |
| **Name** | Verify inspection VMC template functionality for Customer corporate |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify inspection VMC template functionality for Customer corporate

**Preconditions:** User is logged in to application

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Navigate to home page | User is on home page |
| 2 | Click on + button to add corporate | User lands to Add corporate page with Customer corporate as default selected |
| 3 | Observe option selected under Inspection template | Default should be selected as per filled value in template |
| 4 | Click on template dropdown | VMC and default should be displayed as option |
| 5 | Select VMC as template | User should able to select the template |
| 6 | Add address and save the corporate | User should able to save the corporate |
| 7 | Select the added corporate and click on edit button | User will navigate to edit corporate page |
| 8 | Click on inspection template dropdown to edit from VMC to default | User should not be able to edit the template selection, the dropdown should be disabled with VMC option selected |

**Requirements:** None

**Keywords:** Regression

---

*Exported from TestLink*
