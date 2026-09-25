# CTCP-4432 — Verify inspection default template functionality for Customer corporate

| Field | Value |
|---|---|
| **TC ID** | CTCP-4432 |
| **Suite** | Inspections → Corporate_List |
| **Name** | Verify inspection default template functionality for Customer corporate |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify inspection default template functionality for Customer corporate

**Preconditions:** User is logged in to application

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Navigate to home page | User is on home page |
| 2 | Click on + button to add corporate | User lands to Add corporate page with Customer corporate as default selected |
| 3 | Observe option selected under Inspection template | Default should be selected as per filled value in template |
| 4 | Add address and save the corporate | User should able to save the corporate |
| 5 | Select the added corporate and click on edit button | User will navigate to edit corporate page |
| 6 | Click on inspection template dropdown to edit from default to VMC | User should not be able to edit the template selection, the dropdown field should be disabled |

**Requirements:** None

**Keywords:** Regression

---

*Exported from TestLink*
