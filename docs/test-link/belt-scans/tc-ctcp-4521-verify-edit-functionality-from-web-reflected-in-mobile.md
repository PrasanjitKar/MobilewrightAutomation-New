# CTCP-4521 — Verify the Edit functionality from web is reflected in mobile

| Field | Value |
|---|---|
| **TC ID** | CTCP-4521 |
| **Suite** | Belt Scan |
| **Name** | Verify the Edit functionality from web is refected in mobile |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify the Edit functionality from web is reflected in mobile

**Preconditions:** User should have the Belt Scan added in the listing screen

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Verify user login to Mobile application as Master user | Belt Scan card should be displayed on home level |
| 2 | Verify user Edit the Belt Scan by updating the site, conveyor and date of scan and click on save | Belt Scan should be updated |
| 3 | Verify user hard refresh the mobile application | Application should be updated with the records |
| 4 | Verify the Belt Scan is updated | Belt Scan should be updated and should display the updated site, conveyor and date of scan |
| 5 | Verify user download the Belt Scan from mobile and check the values | Download Belt Scan from mobile and web should have same values |
| 6 | Verify the downloaded report should have updated Belt Scan record | Downloaded report should have updated Belt Scan record |

**Requirements:** CTCP-13276, CTCP-13277: Belt Scan Home Level, Conveyor level, View and Download

**Keywords:** Regression

---

*Exported from TestLink*
