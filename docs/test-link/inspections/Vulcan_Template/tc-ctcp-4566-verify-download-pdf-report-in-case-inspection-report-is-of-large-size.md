# CTCP-4566 — Verify download pdf report in case inspection report is of large size

| Field | Value |
|---|---|
| **TC ID** | CTCP-4566 |
| **Suite** | Inspections → Vulcan_Template |
| **Name** | Verify download pdf report in case inspection report is of large size |
| **Priority** | Medium |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify download pdf report in case inspection report is of large size

**Preconditions:** Inspection event with 100 items with each item having 3 images linked to each item exist

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Login in mobile with expected user | User should be able to login |
| 2 | Now download the event report having 100 items | Observe alert message should display :<br>"The inspection pdf is exceeding the supported file size. Please use Conti+ 2.0 web application to generate the report" with Ok button |
| 3 | If user click on Ok button | User should redirect to existing page |

**Requirements:** CTCP-13376:  Verify handling inspection report of large file size in mobile [Version : 1]

**Keywords:** Regression

---

*Exported from TestLink*
