# CTCP-4408 — Verify logo functionality in pdf report in case site & Dist corp  has profile image

| Field | Value |
|---|---|
| **TC ID** | CTCP-4408 |
| **Suite** | Inspections → Vulcan_Template |
| **Name** | Verify logo functionality in pdf report in case site & Dist corp  has profile image |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** ---- Warning ---- TestLink Warning test case name is too long (101 chars) > 100 => has been truncated Original name Verify logo functionality in pdf report in case site has profile image & site linked dist corp has profile image ---- *** ---- Verify logo functionality in pdf report in case site has profile image & site linked dist corp has profile image

**Preconditions:** Site already exist having profile image Dist Corp also has the profile image

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Login with Dist. user in mobile | User should able to login |
| 2 | Now in Site mentioned add conveyor | User should able to add conveyor |
| 3 | Now add inspection in that conveyor | Observe inspection profile logo screen should not display |
| 4 | Add inspection item | User should able to add items |
| 5 | Now save the inspection event and download the report | User should able to download the report |
| 6 | Now Observe the logo in pdf | Site logo should be displayed in right top corner of the page and dist corp logo should be displayed in left top corner of the page |

**Requirements:** CTCP-14115:  Mobile: Inspections - Remove "Add Custom Distributor Logo" (V.9) [Version : 1]

**Keywords:** Regression

---

*Exported from TestLink*
