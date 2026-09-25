# CTCP-4429 — Verify logo functionality in pdf report in case site has profile image & Inspect

| Field | Value |
|---|---|
| **TC ID** | CTCP-4429 |
| **Suite** | Inspections → Default_Template |
| **Name** | Verify logo functionality in pdf report in case site has profile image & Inspect |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** ---- Warning ---- TestLink Warning test case name is too long (101 chars) > 100 => has been truncated Original name Verify logo functionality in pdf report in case site has profile image & Inspection has profile image ---- *** ---- Verify logo functionality in pdf report in case site has profile image & Inspection has profile image

**Preconditions:** Site already exist having profile image

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Login with Dist. user in mobile | User should able to login |
| 2 | Now in Site mentioned add conveyor | User should able to add conveyor |
| 3 | Now add inspection in that conveyor | User should able to add inspection event |
| 4 | Add logo to inspection | User should able to add logo for inspection as dist. user |
| 5 | Now save the inspection event and download the report | User should able to download the report |
| 6 | Now Observe the logo in pdf | Site logo should be displayed in right top corner of the page and inspection logo should be displayed in left top corner of the page |

**Requirements:** None

**Keywords:** Regression

---

*Exported from TestLink*
